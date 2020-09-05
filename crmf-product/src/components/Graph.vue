<template>
	<div class="graph">
	<form>
		<select v-model="genre" required>
				<option value="Confirmed" selected>Confirmed</option>
				<option value="Deaths">Deaths</option>
				<option value="Recovered">Recovered</option>
				<option value="Active">Active</option>
				<option value="AllStatus">All Status</option>
		</select>

		<input type="date" v-model="start" required>
		<input type="date" v-model="end" required>
		<button @click="showGraph">push</button>
	</form>
		<canvas id="graph"></canvas>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Chart from 'chart.js'

export default Vue.extend({
	data () {
		return {
			countryData: [] as any,
			genre: '',
			start: '',
			end: ''
		}
	},
	mounted () {
		const api: string = 'https://api.covid19api.com/total/dayone/country/' + this.$route.params.countryName
		this.axios.get(api, {
			headers: { 'x-access-token': `` }
		})
		.then((response) => {
			this.countryData = response.data
		})
		.catch((e) => {
			console.log(e)
		})
	},
	methods: {
		showGraph (): void {
			if (this.genre === '' || this.start === '' || this.end === '') {
				return alert('Please answer all questions(genre, start, end).')
			}

			const getData = (countryData: any[]): object => {
				let startNum: number = -1
				let endNum: number = -1
				let i: number = 0
				while (i < countryData.length) {
					if (countryData[i].Date.slice(0, 10) === this.start) {
						startNum = i //because get difference between the date users want to know and yesterday of it
						break
					}
					i++
				}
				i = 0
				while (i < countryData.length) {
					if (countryData[i].Date.slice(0, 10) === this.end) {
						endNum = i
						break
					}
					i++
				}
				interface DataSetType {
					dataArray: any[];
					start: number;
					end: number;
				}
				const dataSet: DataSetType = {
					dataArray: countryData,
					start: startNum,
					end: endNum
				}
				return dataSet
			}

			const outPutData = (countryData: any[], start: number, end: number, genre: string): object => {
				const dataInGenre = {
					value: [] as any,
					date: [] as any
				}
				interface dataSetType {
					value: number;
					date: string;
				}

				if (genre === 'Active') {
					for (let c = start; c <= end; c++) {
						const dataSet: dataSetType = {
							value: countryData[c][genre],
							date: countryData[c].Date
						}
						dataInGenre.value[c - start] = dataSet.value
						dataInGenre.date[c - start] = dataSet.date
					}
				} else {
					for (let c = start; c <= end; c++) {
						if (c === 0) {
							const dataSet: dataSetType = {
								value: countryData[c][genre],
								date: countryData[c].Date
							}
							dataInGenre.value[c - start] = dataSet.value
							dataInGenre.date[c - start] = dataSet.date
						} else {
							const dataSet: dataSetType = {
								value: countryData[c][genre] - countryData[c - 1][genre],
								date: countryData[c].Date
							}
							dataInGenre.value[c - start] = dataSet.value
							dataInGenre.date[c - start] = dataSet.date
						}
					}
				}

				return dataInGenre
			}

			const outPutDataForAll = (countryData: any[], start: number, end: number): object => {
				const dataInGenre = {
					confirmed: [] as any,
					deaths: [] as any,
					recovered: [] as any,
					date: [] as any
				}
				interface dataSetType {
					confirmed: number;
					deaths: number;
					recovered: number;
					date: string;
				}
				const confirmed: string = 'Confirmed'
				const deaths: string = 'Deaths'
				const recovered: string = 'Recovered'
				for (let c = start; c <= end; c++) {
					if (c === 0) {
							const dataSet: dataSetType = {
								confirmed: countryData[c][confirmed],
								deaths: countryData[c][deaths],
								recovered: countryData[c][recovered],
								date: countryData[c].Date
							}
							dataInGenre.confirmed[c - start] = dataSet.confirmed
							dataInGenre.deaths[c - start] = dataSet.deaths
							dataInGenre.recovered[c - start] = dataSet.recovered
							dataInGenre.date[c - start] = dataSet.date
						} else {
							const dataSet: dataSetType = {
								confirmed: countryData[c][confirmed] - countryData[c - 1][confirmed],
								deaths: countryData[c][deaths] - countryData[c - 1][deaths],
								recovered: countryData[c][recovered] - countryData[c - 1][recovered],
								date: countryData[c].Date
							}
							dataInGenre.confirmed[c - start] = dataSet.confirmed
							dataInGenre.deaths[c - start] = dataSet.deaths
							dataInGenre.recovered[c - start] = dataSet.recovered
							dataInGenre.date[c - start] = dataSet.date
						}
					}
					return dataInGenre
				}

			const graph = (genre: string, graphObject: any):void => {
				if (!graphObject.confirmed) {
					const graphDate: any[] = graphObject.date
					const graphValue: any[] = graphObject.value
					const ctx: any = document.getElementById('graph')
					const windowObject: any = window
					if (windowObject.myChart) {
						windowObject.myChart.destroy()
					}

					windowObject.myChart = new Chart(ctx, {
						type: 'line',
						data: {
							labels: graphDate,
							datasets: [{
								label: genre,
								data: graphValue,
								backgroundColor: 'rgba(255, 99, 132, 0.2)',
								borderColor: 'rgba(255, 99, 132, 1)',
								borderWidth: 1
							}]
						},
						options: {
							scales: {
								yAxes: [{
									ticks: {
										beginAtZero: true
									}
								}]
							}
						}
					})
				} else {
					const graphDate: any[] = graphObject.date
					const graphConfirmed: any[] = graphObject.confirmed
					const graphDeaths: any[] = graphObject.deaths
					const graphRecovered: any[] = graphObject.recovered
					const ctx: any = document.getElementById('graph')
					const windowObject: any = window
					if (windowObject.myChart) {
						windowObject.myChart.destroy()
					}

					windowObject.myChart = new Chart(ctx, {
						type: 'line',
						data: {
							labels: graphDate,
							datasets: [{
								label: 'Confirmed',
								data: graphConfirmed,
								backgroundColor: 'rgba(255, 99, 132, 0.2)',
								borderColor: 'rgba(255, 99, 132, 1)',
								borderWidth: 1
							}, {
								label: 'Deaths',
								data: graphDeaths,
								backgroundColor: 'rgba(200, 99, 100, 0.2)',
								borderColor: 'rgba(255, 99, 132, 1)',
								borderWidth: 1
							}, {
								label: 'Recovered',
								data: graphRecovered,
								backgroundColor: 'rgba(100, 99, 132, 0.2)',
								borderColor: 'rgba(255, 99, 132, 1)',
								borderWidth: 1
							}]
						},
						options: {
							scales: {
								yAxes: [{
									ticks: {
										beginAtZero: true
									}
								}]
							}
						}
					})
				}
			}

			const firstData: any = getData(this.countryData)

			if (firstData.start === -1 || firstData.end === -1) {
				const hasStart: string = firstData.dataArray[0].Date.slice(0, 10)
				const hasend: string = firstData.dataArray[firstData.dataArray.length - 1].Date.slice(0, 10)
				return alert('The term of ' + this.$route.params.countryName + '`s data is from ' + hasStart + ' to ' + hasend +
				' but the data you required is out of it.Please request data in it.')
			} else if (firstData.start >= firstData.end) {
				return alert('Cannot set start later than end.')
			}

			const secondData: any = this.genre !== 'AllStatus' ? outPutData(firstData.dataArray, firstData.start, firstData.end, this.genre)
			: outPutDataForAll(firstData.dataArray, firstData.start, firstData.end)

			return graph(this.genre, secondData)
		}
	}
})
</script>