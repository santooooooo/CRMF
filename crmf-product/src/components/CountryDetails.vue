<template>
	<div>
		<h4>Hello!</h4>
	</div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
	mounted () {
		console.log(this.$route.params.countryName)
	}
})
</script>
