<template>
	<div class="HeroImage">

		<div class="HeroImage__image"/>

		<div
			class="HeroImage__button App__title"
			variant="outline-success"
			size="lg"
			@click="onButtonClicked">
			Sign me up!
		</div>

	</div>
</template>

<script>

export default {
	methods: {
		onButtonClicked() {
			this.$emit('signUp');
		}
	}
};
</script>

<style lang="scss">
@import '../../../settings.scss';


$headerHeight: $Header-Height;
$marqueeHeight: 32px;
$buttonColour: $Theme-Colour;
$buttonTextColour: $Text-Colour;

.HeroImage {
	position: relative;

	&__image {
		min-width: 100%;
		width: auto !important;
		height: calc(100vh - #{$headerHeight});
		background-image: url('https://images-ext-2.discordapp.net/external/Cos7yjdHwYr12ypkKZqaBxEkbpN6t4p2jIcI4m-hCOM/%3Fixlib%3Drb-0.3.5%26q%3D80%26fm%3Djpg%26crop%3Dentropy%26cs%3Dtinysrgb%26w%3D1080%26fit%3Dmax%26s%3Da658bc46a5e81891bfc253ab8d9f79d4/https/images.unsplash.com/photo-1518600506278-4e8ef466b810?width=936&height=676');
		background-size: cover;
		background-position: center;
	}

	&__button {
		position: absolute;
		text-align: center;
		padding: 1rem 2rem;
		font-size: 2rem;
		background: $buttonColour;
		color: $buttonTextColour;
		top: calc((100% - #{$headerHeight}) / 2);
		left: 50%;
		transform: translateX(-50%);
		cursor: pointer;
		transition: 0.3s background, 0.3s color;

		&:hover {
			color: $buttonColour;
			background: $buttonTextColour;
		}

		@media all and (max-width: $Mobile-Width) {
			width: 90%;
		}
	}

}

</style>
