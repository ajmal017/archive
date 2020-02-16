<template>
	<section class="LandingImage">
		<v-container class="LandingImage__inner">

			<h1 class="LandingImage__text">Supporting Frontline Media Activists To<span class="LandingImage__text--alt">End FGM.</span></h1>

			<section v-scroll-to="'#Landing__content'" class="LandingImage__readMore">
				<span>Discover <span class="LandingImage--altColour">More</span></span>
				<v-icon v-text="'arrow_downwards'" color="highlight" large/>
			</section>
		</v-container>
	</section>
</template>

<style lang="scss">
@import '../../../styles/colours';
@import '../../../styles/breakpoints';

.LandingImage {
	width: 100%;
	margin-top: 5.5rem;
	height: 95vh;
	background-image: url('../../../assets/images/ifrah.jpg');
	background-size: cover;
	background-position: center;
	display: flex;
	flex-direction: column;
	justify-content: center;

	&--altColour {
		color: $alt;
	}

	&__inner {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	&__text {
		font-size: 3rem;
		font-weight: normal;
		letter-spacing: 0.1rem;
		line-height: 4rem;
		color: $highlight;
		font-size: 5rem;
		line-height: 6rem;
		font-weight: bold;

		&--alt {
			color: $alt;
		}
	}

	&__readMore {
		justify-self: center;
		color: $highlight;
		margin-top: 10vh;
		margin-bottom: 3vh;
		display: flex;
		flex-direction: column;
		text-align: center;
		font-weight: bold;
		letter-spacing: 0.1rem;
		text-transform: uppercase;
		cursor: pointer;
	}
}

</style>

