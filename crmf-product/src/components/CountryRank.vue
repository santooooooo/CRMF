<template>
	<div class="topTen">
		<div v-for="category in categories" :key="category">
			<input type="radio" :value="category" v-model="genre">{{ category }}
		</div>
		{{ showData }}
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	props: {
		CountryData: {
		required: true
		}
	},
	data () {
		return {
			categories: ['NewConfirmed', 'NewDeaths', 'NewRecovered', 'TotalConfirmed', 'TotalDeaths',
			'TotalRecovered'],
			genre: String
		}
	},
	computed: {
		showData (): any[] {
			const genreData = (key: any): any[] => {
				const dataArray: any[] = []
				const copyData: any[] = this.CountryData.slice().sort((a: any, b: any) => {
					return a[key] - b[key]
				}).reverse()
				for (let i = 0; i < 10; i++) {
					dataArray[i] = {
						country: copyData[i].Country,
						value: copyData[i][key],
						date: copyData[i].Date.slice(0, 10)
					}
				}
				return dataArray
			}
			if (this.genre == null) return []
			return genreData(this.genre)
		}
	}
})

</script>

<style>
</style>
