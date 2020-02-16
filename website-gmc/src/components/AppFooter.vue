<template>
	<div class="AppFooter">

		<v-container class="AppFooter__inner">

			<v-layout class="w-100">
				<v-flex class="AppFooter__info" xs8>
					<h1 class="AppFooter__title">We are the Global Media Campaign to end FGM.</h1>

					<p class="AppFooter__charity">GMC Charity to End FGM is a Charity Registered by The Charity Commission for England and Wales. Reg No. 1176359</p>
				</v-flex>
				<v-flex class="AppFooter__contact" xs4>
					<h3 class="AppFooter__contact__title">Contact Us</h3>

					<span>T<a class="AppFooter__contact__link" href="tel:+4420769365334">+44 207 69365334</a></span>
					<span>E<a class="AppFooter__contact__link" href="mailto:info@globalmediacampaign.org">info@globalmediacampaign.org</a></span>

					<span class="my-3">12 The Dove Centre, 109 Bartholomew Rd, London NW5 2BJ</span>

					<section class="AppFooter__socials">
				<a href="https://www.instagram.com/globalmediacampaign/?hl=en" target="_blank" class="AppFooter__socials__link">
					<instagram :fill="theme.highlight" class="AppFooter__socials__icon" />
				</a>
				<a href="https://www.facebook.com/gmcendfgm/" target="_blank" class="AppFooter__socials__link">
					<facebook :fill="theme.highlight" class="AppFooter__socials__icon" />
				</a>
				<a href="https://twitter.com/GMCEndFGM" target="_blank" class="AppFooter__socials__link">
					<twitter :fill="theme.highlight" class="AppFooter__socials__icon" />
				</a>
				<a href="https://www.youtube.com/channel/UC2FZ-4nC1ytnC0DDGKNY-wQ" target="_blank" class="AppFooter__socials__link">
					<youtube :fill="theme.highlight" class="AppFooter__socials__icon" />
				</a>
			</section>

				</v-flex>
			</v-layout>

		</v-container>

	</div>
</template>

<script>
import logo from '../assets/icons/logo.svg';
import facebook from '../assets/icons/socials/facebook.svg';
import instagram from '../assets/icons/socials/instagram.svg';
import twitter from '../assets/icons/socials/twitter.svg';
import youtube from '../assets/icons/socials/youtube.svg';

import theme from '../styles/theme';

export default {
	components: {
		logo,
		facebook,
		instagram,
		twitter,
		youtube
	},
	data() {
		return {
			theme
		};
	}
};
</script>


<style lang="scss">
@import '../styles/colours';
@import '../styles/breakpoints';

.AppFooter {
	width: 100%;
	min-height: 30rem;
	background-color: $primary;
	color: $highlight;

	&__inner {
		justify-content: space-between;
		display: flex;
		flex-direction: row;
		padding-top: 5rem;
	}

	&__title {
		font-size: 3rem;
		color: $highlight;
		text-align: left;
		width: 80%;
	}

	&__info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	&__charity {
		font-size: 1rem;
		width: 80%;
		text-align: left;
	}

	&__contact {
		color: $highlight;
		display: flex;
		flex-direction: column;
		font-size: 1.1rem;
		text-align: left;

		&__title{
			text-transform: uppercase;
			font-size: 1.5rem;
			margin-bottom: 1.5rem;
			color: $highlight;
		}

		&__link {
			margin-left: 0.5rem;
			color: $highlight;

			&:hover {
				color: $highlight;
			}
		}
	}

	&__socials {
		display: flex;
		flex-direction: row;
		margin-right: 1rem;
		position: absolute;
  		bottom: 4rem;

		$size: 1.2rem;
		$margin: 0.5rem;

		@media all and (min-width: $mobile) {
			position: relative;
			bottom: unset;
		}

		&__icon{
			width: $size;
			height: $size;
			margin: $margin;
			margin-right: $margin * 2;
			margin-left: 0;
		}
}
}
</style>
