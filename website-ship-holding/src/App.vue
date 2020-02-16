<template>
	<div id="App">
		<router-view/>
	</div>
</template>

<script>

export default {
	name: 'App'
};
</script>

<style lang="scss">

// Title fonts:
h1, h2, h3, h4, h5 {
	font-family: "Poiret One", cursive;
}

#App {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	display: block;
	float: left;
	width: 100%;
}
</style>
