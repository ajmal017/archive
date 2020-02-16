<template>
	<div class="App">

		<app-header v-if="!isAdminPage"/>

		<router-view
			class="App__wrapper"
			:class="{ 'App__wrapper--admin': isAdminPage }"/>

		<app-footer v-if="!isAdminPage"/>

	</div>
</template>

<script>
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

export default {
	name: 'App',
	components: {
		AppHeader,
		AppFooter
	},
	computed: {
		isAdminPage() {
			// #Todo: handle cases such as page: /loginButANonAdminCustomPage
			if (this.$route.path.includes('/login')) return true;
			if (this.$route.path.includes('/admin')) return true;
			return false;
		}
	}
};
</script>

<style lang="scss">
@import './settings';
@import './tamiat/app/styles/index';

$footerPadding: 60px;

.App {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background: $Background-Colour;
	font-family: $Font-Family;

	&__inner {
		width:  $Frame-Width;
		margin: auto;
		position: relative;
		padding-top: 60px;

		&--noPadding {
			padding: 0;
		}

		&--fullHeight {
			height: 100%;
		}

		@media all and (max-width: $Frame-Width) {
			width: 90%;
			margin-left: 5%;
			margin-right: 5%;
		}

	}

	&__wrapper {
		padding-top: $Header-Height;
		min-height: calc(100vh - #{$Footer-Height});
		background: $Background-Colour;
		padding-bottom: $footerPadding;

		&--admin {
			padding-top: 0;
		}
	}

	&--center {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

}

</style>
