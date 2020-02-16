<template>
	<div class="AppHeader">
		<div class="AppHeader__outer" v-if="isVisible">
			<nav class="AppHeader__shadowBox">
				<v-container class="AppHeader__inner">
					<router-link class="AppHeader__GMC" :to="{ name: 'landing.page'}" @click.native="onItemClick">
						<logo class="AppHeader__logo" :fill="theme.primary"/>
					</router-link>
					<section class="AppHeader__menu">

						<router-link
							class="AppHeader__link"
							:to="{ name: 'landing.page' }"
							exact
							@click.native="onItemClick"
							v-text="'Home'"/>

						<router-link
							class="AppHeader__link"
							:to="{ name: 'strategy.page' }"
							exact
							@click.native="onItemClick"
							v-text="'Strategy'"/>

						<router-link
							class="AppHeader__link"
							:to="{ name: 'newsletter.page' }"
							exact
							@click.native="onItemClick"
							v-text="'News'"/>

						<router-link
							class="AppHeader__link"
							:to="{ name: 'about.page' }"
							exact
							@click.native="onItemClick"
							v-text="'About'"/>

					</section>

					<section class="AppHeader__socials">
						<a
							href="https://www.instagram.com/globalmediacampaign/?hl=en"
							target="_blank"
							class="AppHeader__socials__link"
							@mouseover="iconColours.instagram = theme.primary"
							@mouseleave="iconColours.instagram = theme.text">
							<instagram :fill="iconColours.instagram" class="AppHeader__socials__icon" />
						</a>
						<a
							href="https://www.facebook.com/gmcendfgm/"
							target="_blank"
							class="AppHeader__socials__link"
							@mouseover="iconColours.facebook = theme.primary"
							@mouseleave="iconColours.facebook = theme.text">
							<facebook :fill="iconColours.facebook" class="AppHeader__socials__icon" />
						</a>
						<a
							href="https://twitter.com/GMCEndFGM"
							target="_blank"
							class="AppHeader__socials__link"
							@mouseover="iconColours.twitter = theme.primary"
							@mouseleave="iconColours.twitter = theme.text">
							<twitter :fill="iconColours.twitter" class="AppHeader__socials__icon" />
						</a>
						<a
							href="https://www.youtube.com/channel/UC2FZ-4nC1ytnC0DDGKNY-wQ"
							target="_blank"
							class="AppHeader__socials__link"
							@mouseover="iconColours.youtube = theme.primary"
							@mouseleave="iconColours.youtube = theme.text">
							<youtube :fill="iconColours.youtube" class="AppHeader__socials__icon" />
						</a>
					</section>
				</v-container>

				<span
					class="AppHeader__donateButton"
					color="primary"
					v-text="'Make a difference'"
					target="_blank"
					@click="$emit('showModal')"/>

			</nav>
		</div>

		<v-icon
			v-if="isVisible"
			class="AppHeader__icon"
			color="primary"
			v-text="'close'"
			large
			@click="toggleMenu"/>
		<v-icon
			v-else
			class="AppHeader__icon"
			color="primary"
			v-text="'menu'"
			large
			@click="toggleMenu"/>

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
			theme,
			isVisible: false,
			iconColours: {
				instagram: theme.text,
				facebook: theme.text,
				twitter: theme.text,
				youtube: theme.text,
			}
		};
	},
	computed: {
		isMobile() {
			return !this.$vuetify.breakpoint.smAndUp;
		}
	},
	methods: {
		toggleMenu() {
			this.isVisible = !this.isVisible;
		},
		onItemClick() {
			document.documentElement.style.overflow = 'auto';
			if (this.isMobile) this.isVisible = false;
		}
	},
	created() {
		if (!this.isMobile) this.isVisible = true;
	},
	watch: {
		isVisible(isVisible) {
			if (isVisible) {
				if (this.isMobile) {
					document.documentElement.style.overflow = 'hidden';
				} else {
					document.documentElement.style.overflow = 'auto';
				}
			} else {
				document.documentElement.style.overflow = 'auto';
			}
		}
	}
};
</script>


<style lang="scss">
@import '../styles/colours';
@import '../styles/breakpoints';

.AppHeader {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 10;
	letter-spacing: 0.1rem;
	background: $background;
	font-size: 1rem;

	@media all and (min-width: $mobile) {
		border-bottom: none;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity .3s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}

	&__shadowBox {
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
		display: flex;
	}


	&__inner {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		padding-top: 0;
		padding-bottom: 0;
		height: 100vh;
		overflow: hidden;

		@media all and (min-width: $mobile) {
			height: auto;
			flex-direction: row;
			align-items: center;
		}
	}

	&__GMC {
		display: flex;
		flex-direction: row;
		margin-top: 2rem;

		@media all and (min-width: $mobile) {
			margin-top: 0;
		}
	}

	&__logo {
		width: 12rem;
		height: 3rem;
	}

	&__menu {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		padding: 0 1rem;
		max-width: 50%;

		@media all and (min-width: $mobile) {
			margin-top: 0;
			flex-direction: row;
		}

		@media all and (min-width: $desktop) {
			padding: 0 8rem;
		}
	}

	&__link {
		position: relative;
		width: fit-content;
		text-transform: uppercase;
		padding: 2rem 1rem;
		color: $text;
		flex: 1 1 0;
		text-align: center;

		&.router-link-active {
			color: $primary;

			@media all and (min-width: $mobile) {
				border-top: 0.3rem solid $primary;
				padding-top: 1.7rem;
			}
		}

		&:hover {
			color: $primary;
		}
	}

	&__icon {
		position: fixed;
		top: 1.5rem;
		right: 1.5rem;

		@media all and (min-width: $mobile) {
			display: none;
		}
	}

	&__donateButton {
		align-self: center;
		position: absolute;
		bottom: 0;
		width: 100%;
		cursor: pointer;
		background-color: $alt;
		color: $highlight;
		text-transform: uppercase;
		font-weight: bold;
		padding: 1rem 2rem;
		transition: background-color 300ms;

		&:hover {
			background-color: $primary;
		}

		&:active {
			transition: none;
			background-color: $alt;
		}

		@media all and (min-width: $mobile) {
			top: 0;
			right: 0;
			bottom: unset;
			width: auto;
			padding: 0 3rem;
			min-width: fit-content;
			height: 5.5rem;
			line-height: 5.5rem;
		}

		@media all and (min-width: $desktop) {
			padding: 0 6rem;
		}
	}

	&__socials {
		display: flex;
		flex-direction: row;
		margin-right: 1rem;
		position: absolute;
  		bottom: 4rem;
		$size: 1.2rem;
		$margin: 0.3rem;

		@media all and (min-width: $mobile) {
			display: none;
		}

		@media all and (min-width: $tablet) {
			display: flex;
			position: relative;
			bottom: unset;
		}

		&__icon{
			width: $size;
			height: $size;
			margin: $margin;
		}

		&__link {
			height: $size + $margin * 2;
			padding: 0 0.5rem;
		}
	}
}

</style>
