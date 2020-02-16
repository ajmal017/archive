<template>
<div class="Header">

	<div class="Header__topBar">
		<section class="App__inner App__title">
			<span class="float-left">
				Zimzams
			</span>
			<span>
				Coming Soon!
			</span>
		</section>
	</div>

	<div class="App__inner Header__content">

		<b-link to="/">
			<h1 class="Header__title App__title">Stock Tracker</h1>
		</b-link>

		<!-- <app-menu
			class="Header__menu App--center"
			:auto="true"/> -->

	</div>
</div>
</template>

<script>
import AppMenu from './AppMenu';

export default {
	components: {
		AppMenu
	}
};

</script>

<style lang="scss">
@import '../settings';

$textColour: $Text-Colour;
$topBarBackground: $Theme-Colour;
$topBarTextColour: white;
$height: $Header-Height;

.Header{
	height: $height;
	background: $topBarTextColour;
	position: fixed;
	width: 100%;
	z-index: 1;

	&__topBar {
		background: $topBarBackground;
		color: $topBarTextColour;
		text-align: right;
		font-size: 16px;
		padding: 4px 0;
	}

	&__content {
		height: calc(100% - 24px);
	}

	&__title{
		color: $textColour !important;
		height: $height / 2;
		margin: auto;
		display: block;
		display: inline-block;
		left: 0;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	&__menu{
		color: $textColour !important;
		display: inline-block;
		right: 0;
	}
}

</style>
