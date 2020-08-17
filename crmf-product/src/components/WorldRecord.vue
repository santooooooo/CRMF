<template>
	<div class="records">
		<h1>title</h1>
		<p>This is world record section.</p>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
mounted: function () {
		this.axios.get('https://api.covid19api.com/summary')
		.then((response) => {
			const data = response.data
			console.log(data)
		})
		.catch((e) => {
			console.log(e)
		})
	}
})

</script>

<style scoped>

</style>
