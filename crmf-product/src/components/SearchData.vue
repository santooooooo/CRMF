<template>
	<div class="index">
		<h2>Country's Name</h2>
		<input type="text" v-model="keyword" @keyup.enter ="result" placeholder="Type country's name and press Enter">

		<div class="data-section" v-if="resultData.length != 0">
			<transition-group name="list">
				<div v-for="result in resultData" :key="result.slug">
					<router-link :to="{ path: '/country/' + result.slug }">
						<div class="data">
							{{ result.name }}
						</div>
					</router-link>
				</div>
			</transition-group>
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
					const countrySlug: string = country.Slug
					this.resultData[c] = {
						name: countryName,
						slug: countrySlug
					}
					c++
				}
			}
		}
	}
})
</script>

<style>
.index {
}
.index input {
	width: 30%;
	background: rgba(98, 137, 164, 0.6);
	color: white;
	margin: 1.0rem 0;
	padding: 0.5rem;
	border-radius: 0.5rem;
}
.data-section {
	width: 50%;
	margin: 0 auto;
	padding: 1.0rem 0;
	text-align: left;
}
.data-section a {
	text-decoration: none;
}
.data {
	margin: 1.0rem 0;
	background: rgba(110, 167, 161, 0.8);
	padding: 1.2rem;
	border-radius: 1.0rem;
	color: white;
}
.data:hover {
	background: rgba(110, 167, 161, 0.4);
}

.list-enter-active {
	transition: all 3s;
}
.list-leave-active {
	transition: all 0s
}
.list-enter, .list-leave-to {
	opacity: 0;
	transform: translateX(5.0rem);
}
</style>
