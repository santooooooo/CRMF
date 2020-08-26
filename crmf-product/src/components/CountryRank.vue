<template>
	<div class="topTen">

		<select v-model="genre" @click="showData">
			<option value="NewConfirmed" selected>NewConfirmed</option>
			<option value="NewDeaths">NewDeaths</option>
			<option value="NewRecovered">NewRecovered</option>
			<option value="TotalConfirmed">TotalConfirmed</option>
			<option value="TotalDeaths">TotalDeaths</option>
			<option value="TotalRecovered">TotalRecovered</option>
		</select>

		<div v-if="dataArray.length != 0">
			{{ dataArray }}
		</div>

	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	data () {
		return {
			CountryData: [],
			genre: String,
			dataArray: []
		}
	},
	mounted () {
		this.axios.get('https://api.covid19api.com/summary', {
		headers: { 'x-access-token': `fe31d8e4-04d5-4c22-bbc8-05ac57330264` }
		})
		.then((response) => {
			this.CountryData = response.data.Countries
		})
		.catch((e) => {
			console.log(e)
		})
	},
	methods: {
		showData (): void {
			const genreData = (key: any): void => {
				const copyData: any[] = this.CountryData.slice().sort((a: any, b: any) => {
					return a[key] - b[key]
				}).reverse()
				for (let i = 0; i < 10; i++) {
					this.dataArray[i] = {
						country: copyData[i].Country,
						value: copyData[i][key],
						date: copyData[i].Date.slice(0, 10)
					}
				}
			}
			return genreData(this.genre)
		}
	}
})

</script>

<style>
</style>
