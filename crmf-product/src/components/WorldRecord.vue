<template>
	<div class="records">
		<h1>title</h1>
		<p>This is world record section.</p>
		<CountryRank v-bind:country-data="CountryData" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import CountryRank from './CountryRank.vue'

export default Vue.extend({
data: function () {
	return {
		globalData: {},
		CountryData: {}
	}
},
components: {
	CountryRank
},
mounted: function () {
		interface GlobalData {
			NewConfirmed: number;
			TotalConfirmed: number;
			NewDeaths: number;
			TotalDeaths: number;
			NewRecovered: number;
			TotalRecovered: number;
		}
		interface CountryData {
			Countries: Array<string>;
		}
		this.axios.get('https://api.covid19api.com/summary')
		.then((response) => {
			const mainData: GlobalData = {
			NewConfirmed: response.data.Global.NewConfirmed,
			TotalConfirmed: response.data.Global.TotalConfirmed,
			NewDeaths: response.data.Global.NewDeaths,
			TotalDeaths: response.data.Global.TotalDeaths,
			NewRecovered: response.data.Global.NewRecovered,
			TotalRecovered: response.data.Global.TotalRecovered
			}

			this.globalData = mainData
			console.log(this.globalData)

			const propsData: CountryData = {
				Countries: response.data.Countries
			}
			this.CountryData = propsData
			console.log(this.CountryData)
		})
		.catch((e) => {
			console.log(e)
		})
	}
})

</script>

<style scoped>

</style>
