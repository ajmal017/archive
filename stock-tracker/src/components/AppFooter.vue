<template>
    <div class="Footer">
        <div class="App__inner Footer__inner">
            <p> Andrew, Alex and Mike Ltd. Corp</p>
        </div>
    </div>
</template>


<style lang="scss">
@import '../settings';

$backgroundColour: $Theme-Colour;
$textColour: $Text-Colour;
$height: $Footer-Height;

.Footer{
	height: $height;
	background: $backgroundColour;
	color: $textColour;

	&__inner {
		padding-top: 0.8em;
	}
}

</style>
