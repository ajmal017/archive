<template>
	<div class="Footer">

		<div class="App__inner Footer__inner">
			<p>
				Holistics
			</p>
		</div>

	</div>
</template>

<style lang="scss">
@import '../settings';

$footerHeight: $Footer-Height;
$backgroundColour: $Highlight-Colour;

.Footer{
	$height: $footerHeight;
	background: $backgroundColour;

	&__inner {
		padding-top: 0.8em;
	}

}

</style>
