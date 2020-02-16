<template>
	<v-app id="app" class="App">
		<div class="App__inner">
			<router-view @showModal="showModal"/>
		</div>

		<modal
			:visible="isModalVisible"
			@close="onModalClose"/>

	</v-app>
</template>

<script>
import Modal from './components/Modal';

export default {
	components: {
		Modal
	},
	data() {
		return {
			isModalVisible: false
		};
	},
	methods: {
		showModal() {
			this.isModalVisible = true;
		},
		onModalClose() {
			this.isModalVisible = false;
		}
	}
};
</script>


<style lang="scss">
@import './styles/index';

.App {
	font-family: 'Roboto`', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: $text !important;
	background: $background !important;
	font-size: 1rem;
	letter-spacing: 0.05rem;

	@media all and (min-width: $mobile) {
		font-size: 1.3rem;
	}

	&__inner {
		height: 100%;
		width: 100%;
	}
}


.container {
	min-width: 95%;
	margin: 0 2.5%;
	padding: 0;

	@media all and (min-width: $mobile) {
		min-width: 90%;
		margin: 0 5%;
	}

	@media all and (min-width: $desktop) {
		min-width: 1140px;
		margin: 0 calc((100% - 1140px) / 2);
	}
}

</style>
