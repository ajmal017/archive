<template>
	<div class="App">

		<app-header/>

		<router-view class="App__wrapper"/>

		<app-footer/>

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
	}
};
</script>

<style lang="scss">
@import './settings';

.App {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background: $Background-Colour;
	font-family: $Font-Family;

	&__inner {
		width:  $Frame-Width;
		margin: auto;
		position: relative;

		&--fullHeight {
			height: 100%;
		}

		@media all and (max-width: $Frame-Width) {
			width: 90%;
			margin-left: 5%;
			margin-right: 5%;
		}

	}

	&__title {
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	&__wrapper {
		padding-top: $Header-Height;
		min-height: calc(100vh - #{$Footer-Height});
		background: $Background-Colour;
	}

	&--padding {
		padding-top: 60px;
		padding-bottom: 60px;

		&Top {
			padding-top: 60px;
		}

		&Bottom {
			padding-bottom: 60px;
		}
	}

	&--margin {
		margin-top: 60px;
		margin-bottom: 60px;

		&Top {
			margin-top: 60px;
		}

		&Bottom {
			margin-bottom: 60px;
		}
	}

	&--center {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

}

</style>
