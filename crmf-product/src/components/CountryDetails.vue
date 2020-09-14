<template>
	<div class="country">
		<h3>{{ sixData.CountryName }}</h3>
		<table>
			<tr>
				<td>NewCounfirmed</td>
				<td>{{ sixData.NewConfirmed }}</td>
			</tr>
			<tr>
				<td>TotalCounfirmed</td>
				<td>{{ sixData.TotalConfirmed }}</td>
			</tr>
			<tr>
				<td>NewDeaths</td>
				<td>{{ sixData.NewDeaths }}</td>
			</tr>
			<tr>
				<td>TotalDeaths</td>
				<td>{{ sixData.TotalDeaths }}</td>
			</tr>
			<tr>
				<td>NewRecovered</td>
				<td>{{ sixData.NewRecovered }}</td>
			</tr>
			<tr>
				<td>TotalRecovered</td>
				<td>{{ sixData.TotalRecovered }}</td>
			</tr>
			<tr>
				<td>Date</td>
				<td>{{ sixData.Date }}</td>
			</tr>
		</table>
		<Graph />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Graph from './Graph.vue'

export default Vue.extend({
	data: function () {
		return {
			countriesData: []
		}
	},
	components: {
		Graph
	},
	mounted () {
		this.axios.get('https://api.covid19api.com/summary')
		.then((response) => {
			this.countriesData = response.data.Countries
		})
		.catch((e) => {
			console.log(e)
		})
	},
	computed: {
		sixData (): Object {
			interface resultsType {
				CountryName: string;
				NewConfirmed: number;
				TotalConfirmed: number;
				NewDeaths: number;
				TotalDeaths: number;
				NewRecovered: number;
				TotalRecovered: number;
				Date: String;
			}

			let sixData: Object = {}
			for (let i = 0; i < this.countriesData.length; i++) {
				const countryData: any = this.countriesData[i]
				if (this.$route.params.countryName === countryData.Slug) {
					const results: resultsType = {
						CountryName: countryData.Country,
						NewConfirmed: countryData.NewConfirmed,
						TotalConfirmed: countryData.TotalConfirmed,
						NewDeaths: countryData.NewDeaths,
						TotalDeaths: countryData.TotalDeaths,
						NewRecovered: countryData.NewRecovered,
						TotalRecovered: countryData.TotalRecovered,
						Date: countryData.Date.slice(0, 10)
					}
					sixData = results
				}
			}

			return sixData
		}
	}
})
</script>

<style scoped>
.country {
	width: 100%;
	margin: 20px 0;
}
.country h3 {
	color: rgba(243, 112, 83);
}
.country table {
	width: 30%;
	margin: 0 auto;
	text-align: left;
	background: rgba(243, 112, 83);
	color: white;
	border-radius: 1.0rem;
	padding: 1.2rem;
}
</style>
