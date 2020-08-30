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
			keyword: '',
			resultData: [] as any
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
				const country: any = this.countryData[i]
				const key: string = this.keyword.toLowerCase()
				if (country.Country.toLowerCase().indexOf(key) > -1) {
					const countryName: string = country.Country
					this.resultData[c] = countryName
					c++
				}
			}
		}
	}
})
</script>
