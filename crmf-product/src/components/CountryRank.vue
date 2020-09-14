<template>
	<div class="topTen">
		<h2>Ranking by Genre</h2>
		<p>Select a genre you want to see.</p>
		<select v-model="genre" @click="showData">
			<option value="NewConfirmed" selected>NewConfirmed</option>
			<option value="NewDeaths">NewDeaths</option>
			<option value="NewRecovered">NewRecovered</option>
			<option value="TotalConfirmed">TotalConfirmed</option>
			<option value="TotalDeaths">TotalDeaths</option>
			<option value="TotalRecovered">TotalRecovered</option>
		</select>

		<div class="data-section" v-if="dataArray.length != 0">
			<transition-group name="list">
				<div class="data" v-for="data in dataArray" :key="data.slug">
					<router-link :to="{ path: '/country/' + data.slug }">
						<table>
							<tr>
								<td class="number">{{ data.rank }}</td>
								<td>{{ data.country }}</td>
								<td class="number">{{ data.value }}</td>
								<td>{{ data.date }}</td>
							</tr>
						</table>
					</router-link>
				</div>
			</transition-group>
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
			dataArray: [] as any
		}
	},
	mounted () {
		this.axios.get('https://api.covid19api.com/summary')
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
				interface resultType {
					rank: number;
					country: string;
					slug: string;
					value: number;
					date: string;
				}

				const copyData: any[] = this.CountryData.slice().sort((a: any, b: any) => {
					return a[key] - b[key]
				}).reverse()
				for (let i = 0; i < 10; i++) {
					const result: resultType = {
						rank: i + 1,
						country: copyData[i].Country,
						slug: copyData[i].Slug,
						value: copyData[i][key],
						date: copyData[i].Date.slice(0, 10)
					}
					this.dataArray[i] = result
				}
			}
			return genreData(this.genre)
		}
	}
})

</script>

<style scoped>
.topTen select {
	background: rgba(122, 185, 119);
	color: white;
	margin: 1.0rem 0;
	padding: 0.5rem;
	border-radius: 0.5rem;
}

.data-section {
	width: 70%;
	margin: 0 auto;
	padding: 1.0rem 0;
	text-align: left;
}
.data {
	margin: 1.0rem 0;
	background: rgba(199, 103, 129, 0.8);
	padding: 1.2rem;
	border-radius: 1.0rem;
}
.data:hover {
	background: rgba(199, 103, 129, 0.4);
}
.data a {
	color: white;
	text-decoration: none;
}
.data table {
	width: 100%;
}
.data td {
	width: 25%;
}
.data .number {
	width: 10%;
}

.list-enter-active {
	transition: all 3s;
}
.list-leave-active {
	transition: all 0s
}
.list-enter, .list-leave-to {
	opacity: 0;
	transform: translateX(5.0rem);
}
</style>
