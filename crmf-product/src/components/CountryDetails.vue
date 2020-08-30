<template>
	<div>
		<h4>{{ countryName }}</h4>
		{{ sixData }}
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	data: function () {
		return {
			countryName: '',
			countriesData: []
		}
	},
	mounted () {
		this.countryName = this.$route.params.countryName
		this.axios.get('https://api.covid19api.com/summary', {
			headers: { 'x-access-token': `` }
		})
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
				if (this.$route.params.countryName === countryData.Country) {
					const results: resultsType = {
						NewConfirmed: countryData.NewConfirmed,
						TotalConfirmed: countryData.TotalConfirmed,
						NewDeaths: countryData.NewDeaths,
						TotalDeaths: countryData.TotalDeaths,
						NewRecovered: countryData.NewRecovered,
						TotalRecovered: countryData.TotalRecovered,
						Date: countryData.Date
					}
					sixData = results
				}
			}

			return sixData
		}
	}
})
</script>
