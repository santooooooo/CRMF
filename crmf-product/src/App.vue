<template>
  <div id="app">
		<div class="header">
			<img alt="Vue logo" src="./assets/CRMFLogo.png">
			<h1>Corona Report Made by a Failure</h1>
		</div>
    <WorldRecord />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import WorldRecord from './components/WorldRecord.vue'

export default Vue.extend({
  name: 'App',
  components: {
    WorldRecord
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  padding: 5%;
}

.header {
	display: flex;
}
.header img {
	width: 10%;
}
.header h1 {
	margin: 40px 0 0 2%;
	color: pink;
}
</style>
