<template>
	<v-icon
		class="Loader"
		color="primary"
		v-text="'wifi_tethering'"
		large/>
</template>

<script>
import theme from '../styles/theme';
import Loader from './Loader';

export default {
	data() {
		return {
			theme
		};
	}
};
</script>

<style lang="scss">

.Loader {
	animation-name: spin;
	animation-duration: 5000ms;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
}

@keyframes spin {
	from {
		transform:rotate(0deg);
	}
	to {
		transform:rotate(360deg);
	}
}
</style>
