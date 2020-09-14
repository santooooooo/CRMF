<template>
	<div class="records">
		<div class="top-text">
			<p>This website give you data about corona virus of countries around the world.</p>
			<p>The API I uses in it is <a href="https://covid19api.com" target=_blank>COVID 19 API</a>.</p>
			<p>Data from the API are not always true so I hope that you use it with other data or website.</p>
			<p>They sometimes don't reach it so please reload it after minutes when you can't see them.</p>
		</div>

		<div class="main">
			<div class="router">
				<p>Let's click these buttons!</p>
				<router-link to="/ranking">Ranking</router-link>
				<router-link to="/index">Index</router-link>
			</div>

			<div class="worldRecord">
				<b>This is today's data of the world.</b>
				<div class="record">
					<p>NewConfirmed: {{ globalData.NewConfirmed }}</p>
					<p>TotalConfirmed: {{ globalData.TotalConfirmed }}</p>
					<p>NewDeaths: {{ globalData.NewDeaths }}</p>
					<p>TotalDeaths: {{ globalData.TotalDeaths }}</p>
					<p>NewRecovered: {{ globalData.NewRecovered }}</p>
					<p>TotalRecovered: {{ globalData.TotalRecovered }}</p>
				</div>
			</div>
		</div>

		<div class="router-view">
			<transition>
				<router-view></router-view>
			</transition>
		</div>
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
			path: '/ranking',
			component: CountryRank
		},
		{
			path: '/index',
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
		})
		.catch((e) => {
			console.log(e)
		})
	}

})

</script>

<style scoped>
.top-text {
	width: 70%;
	margin: 20px 0;
	background: rgba(92, 115, 183);
	color: white;
	border-radius: 1.0rem;
	padding: 20px 2%;
	font-size: 1.2rem;
	box-shadow:30px 20px rgba(92, 115, 183, 0.5);
}
.top-text a {
	color: orange;
	text-decoration: none;
}

.main {
	display: flex;
	font-size: 1.2rem;
}

.worldRecord {
	width: 35%;
	margin: 40px 0 0 20%;
	background: rgba(249, 169, 128);
	color: white;
	padding: 20px 2%;
	border-radius: 1.0rem;
	box-shadow:30px 20px rgba(249, 169, 128, 0.5);
}
.record {
	margin: 10px;
}

.router {
	width: 25%;
	margin: 190px 0 0 10%;
}
.router p {
	padding: 0 0 20px 0;
}
.router a {
	width: 40%;
	margin: 20px 10% 0 0;
	padding: 10px 20%;
	text-decoration: none;
	color: white;
	background: rgba(122, 185, 119);
	border-radius: 1.0rem;
}
.router a:hover {
	background: rgba(192, 219, 117);
}

.router-view {
	margin: 50px 0;
	text-align: center;
	font-size: 1.2rem;
}

.v-enter-active {
	transition: opacity 1s ease;
}
.v-leave-active {
	transition: opacity 0ms ease;
}
.v-enter, .v-leave-to {
	opacity: 0;
}
.v-enter-to, .v-leave {
	opacity: 1;
}
</style>
