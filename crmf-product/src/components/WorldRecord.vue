<template>
	<div class="records">
		<h1>title</h1>
		<p>This is world record section.</p>

		<div v-for="data in globalData" :key="data.key">
			{{ data.key }}
			{{ data.value }}
		</div>

		<router-link to="/rank">Rank</router-link>
		<router-link to="/search">Search</router-link>

		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueRouter from 'vue-router'
import CountryRank from './CountryRank.vue'
import SearchData from './SearchData.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
		{
			path: '/rank',
			component: CountryRank
		},
		{
			path: '/search',
			component: SearchData
		}
	]
})

export default Vue.extend({
data: function () {
	return {
		globalData: {}
	}
},
router: router,
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

		this.axios.get('https://api.covid19api.com/summary', {
			headers: { 'x-access-token': `fe31d8e4-04d5-4c22-bbc8-05ac57330264` }
		})
		.then((response) => {
			const mainData: GlobalData = {
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
		})
		.catch((e) => {
			console.log(e)
		})
	}

})

</script>

<style scoped>

</style>
