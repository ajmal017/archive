<template>
	<section class="Landing">
		<app-header @showModal="$emit('showModal')"/>

		<landing-image class="Landing__image"/>

		<div class="Landing__content">

			<v-container>
				<section id="Landing__content" class="Landing__intro">
					The Global Media Campaign to End FGM trains, supports and funds anti-FGM activists across Africa to put the influential voices of religious and traditional leaders on local radio, TV and social media to accelerate the end of FGM.
				</section>
			</v-container>

			<reach class="Landing__content__block Landing__reach"/>

			<v-container class="Landing__content__block">

				<videos/>

				<v-divider class="mb-4"/>

				<v-layout>
					<v-flex xs8>
						<section class="Landing__socials__image"/>
					</v-flex>
					<v-flex xs4>
						<socials class="Landing__socials" :tweetLimit="5"/>
					</v-flex>
				</v-layout>


			</v-container>

			<quotes class="Landing__quotes"/>

			<v-container class="Landing__content__block">
				<value @showModal="$emit('showModal')"/>
			</v-container>

			<app-footer class="Footer" />

		</div>

	</section>
</template>

<script>
import AppHeader from '../../components/AppHeader';
import LandingImage from './components/LandingImage';
import Reach from './components/Reach';
import Videos from './components/Videos';
import Socials from './components/Socials';
import Quotes from './components/Quotes';
import Value from './components/Value';
import AppFooter from '../../components/AppFooter';

export default {
	components: {
		AppHeader,
		LandingImage,
		Reach,
		Videos,
		Socials,
		Quotes,
		Value,
		AppFooter
	},
	computed: {
		isMobile() {
			return this.$vuetify.breakpoint.smAndDown;
		},
		isTablet() {
			return this.$vuetify.breakpoint.mdAndDown;
		},
		responsiveBinding() {
			const binding = {};
			if (this.isTablet) binding.column = true;
			return binding;
		}
	}
};
</script>

<style lang="scss">
@import '../../styles/colours';
@import '../../styles/breakpoints';

.Landing {
	text-align: left;
	font-size: 1.5rem;
	margin-top: 5.5rem;

	&__image {
		width: 100%;
		height: calc(100vh - 5.5rem);
		margin-bottom: 1rem;
	}

	&__intro {
		width: 80%;
		margin: -4rem 10% 2rem 10%;
		text-align: center;
		background-color: $background;
		color: $primary;
		padding: 2rem 3rem;
	}

	&__content {
		position: relative;
		z-index: 1;
		background-color: $background;

		@media all and (min-width: $mobile) {
			padding-top: 1rem;
		}

		&__block {
			width: 100%;
			padding: 0;
			margin-bottom: 3rem;
		}
	}

	&__reach {
		box-shadow: 0 0 1rem lighten($text, 50%);
	}

	&__quotes {
		margin-bottom: 3rem;
	}

	&__socials {
		margin-left: 3rem;

		&__image {
			display: flex;
			width: 100%;
			height: 100%;
			background-image: url('../../assets/images/religious-interview.jpg');
			background-size: cover;
			background-position: center;
		}
	}

}

</style>
