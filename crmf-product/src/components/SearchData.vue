<template>
	<div class="search">
		<h3>Country's Name</h3>
		<input type="text" v-model="keyword" @keyup.enter ="result">

		<div v-if="resultData.length != 0">
			<div v-for="result in resultData" :key="result">
				<router-link :to="{ path: '/country/' + result }">
					{{ result }}
				</router-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	data () {
		return {
			countryData: [],
			keyword: null,
			resultData: []
		}
	},
	mounted () {
		this.axios.get('https://api.covid19api.com/countries')
		.then((response) => {
			this.countryData = response.data
		})
		.catch((e) => {
			console.log(e)
		})
	},
	methods: {
		result (): void {
			this.resultData = []
			let c: number = 0
			for (let i = 0; i < this.countryData.length; i++) {
				const country: String = this.countryData[i].Country.toLowerCase()
				const key: String = this.keyword.toLowerCase()
				if (country.indexOf(key) > -1) {
					this.resultData[c] = this.countryData[i].Country
					c++
				}
			}
		}
	}
})
</script>
