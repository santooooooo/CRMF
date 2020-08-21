<template>
	<div class="records">
		<h1>title</h1>
		<p>This is world record section.</p>

		<div v-for="data in globalData" :key="data.key">
			{{ data.key }}
			{{ data.value }}
		</div>

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
mounted: function (): void {
		interface GlobalData {
			one: {
				key: string;
				value: number;
			},
			two: {
				key: string;
				value: number;
			},
			three: {
				key: string;
				value: number;
			},
			four: {
				key: string;
				value: number;
			},
			five: {
				key: string;
				value: number;
			},
			six: {
				key: string;
				value: number;
			}
		}
		interface CountryData {
			Countries: Array<string>;
		}

		this.axios.get('https://api.covid19api.com/summary', {
			headers: { 'x-access-token': `fe31d8e4-04d5-4c22-bbc8-05ac57330264` }
		})
		.then((response) => {
			const mainData = {
				one: {
					key: 'NewConfirmed',
					value: response.data.Global.NewConfirmed
				},
				two: {
					key: 'TotalConfirmed',
					value: response.data.Global.TotalConfirmed
				},
				three: {
					key: 'NewDeaths',
					value: response.data.Global.NewDeaths
				},
				four: {
					key: 'TotalDeaths',
					value: response.data.Global.TotalDeaths
				},
				five: {
					key: 'NewRecovered',
					value: response.data.Global.NewRecovered
				},
				six: {
					key: 'TotalRecovered',
					value: response.data.Global.TotalRecovered
				}
			}

			this.globalData = mainData
			console.log(this.globalData)

			const propsData: CountryData = {
				Countries: response.data.Countries
			}
			this.CountryData = propsData
		})
		.catch((e) => {
			console.log(e)
		})
	}

})

</script>

<style scoped>

</style>
