<template>
	<div>
		<div v-for="country in CountryData.Countries" v-bind:key="country.Country">
		{{ country.Country}}
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	props: {
		CountryData: {
			type: Object
		}
	},
	mounted () {
		console.log(this.CountryData)
	}
})

</script>

<style>
</style>
