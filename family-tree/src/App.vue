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

$textColour: $Text-Colour;
$backgroundColour: $Background-Colour;
$dangerColour: $Danger-Colour;
$fontFamily: $Font-Family;
$frameWidth: $Frame-Width;
$headerHeight: $Header-Height;
$footerHeight: $Footer-Height;

.App {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background: $Background-Colour;
	font-family: $Font-Family;
	color: $textColour;

	&__inner {
		width: $Frame-Width;
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

	&__wrapper {
		padding-top: $Header-Height;
		min-height: calc(100vh - #{$Footer-Height});
		background: $Background-Colour;
		float: left;
		width: 100%;
	}

	&--center {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	&--invalid {
		color: $dangerColour;
	}

}

</style>
