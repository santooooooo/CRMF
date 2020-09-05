<template>
	<div class="records">
		<h1>title</h1>
		<p>This is world record section.</p>

		<div class="worldRecord">
			<p>NewConfirmed {{ globalData.NewConfirmed }}</p>
			<p>TotalConfirmed {{ globalData.TotalConfirmed }}</p>
			<p>NewDeaths {{ globalData.NewDeaths }}</p>
			<p>TotalDeaths {{ globalData.TotalDeaths }}</p>
			<p>NewRecovered {{ globalData.NewRecovered }}</p>
			<p>TotalRecovered {{ globalData.TotalRecovered }}</p>
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
import CountryDetails from './CountryDetails.vue'

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
		},
		{
			path: '/country/:countryName',
			component: CountryDetails
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
			NewConfirmed: number;
			TotalConfirmed: number;
			NewDeaths: number;
			TotalDeaths: number;
			NewRecovered: number;
			TotalRecovered: number;
		}

		this.axios.get('https://api.covid19api.com/summary', {
			headers: { 'x-access-token': `` }
		})
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
		})
		.catch((e) => {
			console.log(e)
		})
	}

})

</script>

<style scoped>

</style>
