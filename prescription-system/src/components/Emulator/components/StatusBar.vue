<template>
	<section class="StatusBar">
		<span class="StatusBar__clock" v-text="clockText"/>
		<div class="StatusBar__icons">
			<v-icon v-text="'signal_cellular_alt'" color="black" small/>
			<v-icon v-text="'signal_wifi_4_bar'" color="black" small/>
			<v-icon class="StatusBar__icons--rotate" v-text="'battery_full'" color="black" small/>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			clockText: null
		}
	},
	methods: {
		startClock() {
			const component = this
			setInterval(function() {
				const clockText = new Date().toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric'});
				component.clockText = clockText;
			}, 1000);
		}
	},
	mounted() {
		this.startClock();
	}
}
</script>

<style lang="scss">
@import "../../../styles/index.scss";

.StatusBar {
	width: 100%;
	display: flex;
	height: fit-content;
	justify-content: space-between;
	margin-top: 0.3rem;


	&__clock {
		padding: 0 1.4rem;
		font-size: 0.9rem;
		font-weight: bold;
	}

	&__icons {
		margin-right: 0.4rem;
		&--rotate {
			transform: rotate(90deg);
		}
	}

}
</style>
