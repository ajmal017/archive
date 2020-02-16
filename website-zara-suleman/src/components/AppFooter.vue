<template>
	<div class="Footer">
		<div class="App__inner App__inner--noPadding Footer__inner">
			<p>
				© Chazza & Mike aka DevOpsX 2018
			</p>
		</div>
	</div>
</template>


<style lang="scss">
@import '../settings';

$textColour: $Highlight-Colour;
$backgroundColour: $Background-Colour;
$height: $Footer-Height;

.Footer{
	width: 100%;
	height: $height;
	background: $Theme-Colour;
	color: $textColour;

	&__inner {
		position: relative;
		top: 0.8em;
	}
}
</style>
