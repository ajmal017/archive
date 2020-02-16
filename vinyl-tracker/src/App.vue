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

$invalidColour: $Danger-Colour;
$backgroundColour: $Background-Colour;
$fontFamily: $Font-Family;
$frameWidth: $Frame-Width;
$footerHeight: $Footer-Height;

.App {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background: $backgroundColour;
	font-family: $fontFamily;
	float: left;
	width: 100%;

	&__inner {
		width:  $frameWidth;
		margin: auto;
		position: relative;

		&--fullHeight {
			height: 100%;
		}

		@media all and (max-width: $frameWidth) {
			width: 90%;
			margin-left: 5%;
			margin-right: 5%;
		}

	}

	&__wrapper {
		min-height: calc(100vh - #{$footerHeight});
		background: $backgroundColour;
	}

	&--center {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

}

.Form {

	&__invalidText {
		color: $invalidColour;
	}
}

// vue-multiselect override to ensure options are only as wide as their container
.multiselect__content {
	width: 100%;
	overflow: ellipse;
}

// Fullpage.js override to ensure content can be scrolled if section is marked as a normalScrollElement
.fp-tableCell {
	overflow: auto;
}

</style>
