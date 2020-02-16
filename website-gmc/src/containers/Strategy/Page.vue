<template>
	<div class="Strategy">
		<app-header @showModal="$emit('showModal')"/>

		<div class="Strategy__content">

			<v-container class="Strategy__intro">
				<h1 class="Strategy__intro__title">Our Strategy</h1>
				<p class="Strategy__intro__text">
					The Global Media Campaign to End FGM (GMC)  is working across Africa  creating a web of over 375 African media activists. Together, we are bringing religious and traditional leaders on air to relentlessly call  for an end to FGM.
				</p>
			</v-container>

			<section class="Strategy__banner"/>

			<v-container class="Strategy__bannerText">
				<div class="Strategy__bannerText__inner">
					<p class="Strategy__bannerText__text Strategy__bannerText__text--red">
						By reaching over 820 million in the next three years  we aim to help safeguard at least 2.12 million girls and women from mutilation  by the end of 2022.
					</p>
				</div>
			</v-container>

			<v-container class="Strategy__quote">
				<quote/>
			</v-container>

			<stats class="Strategy__stats"/>

			<section class="Strategy__stages">
				<stages/>
			</section>

			<app-footer/>

		</div>

	</div>
</template>

<script>
import AppHeader from '../../components/AppHeader';
import Quote from './components/Quote';
import Stats from './components/Stats';
import Stages from './components/Stages';
import AppFooter from '../../components/AppFooter';


export default {
	components: {
		AppHeader,
		Quote,
		Stats,
		Stages,
		AppFooter
	}
};
</script>

<style lang="scss">
@import '../../styles/colours';
@import '../../styles/breakpoints';

.Strategy {
	margin-top: 5.5rem;
	background-color: $background;

	&__intro {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0;
		padding-top: 4rem;
		font-size: 1.7rem;
		margin-bottom: 3rem;

		&__title {
			color: $primary;
		}

		&__text {
			width: 60%;
			font-weight: bold;
			line-height: 1.9rem;
			text-align: left;
			line-height: 2.2rem;
		}
	}

	&__banner {
		width: 100%;
		height: 35rem;
		background-size: cover;
		background-position: center;
		background-image: url('../../assets/images/radio-hosts.png');
	}

	&__bannerText {
		margin-top: -3rem;
		display: flex;
		flex-direction: column;
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 1.5rem;

		&__inner {
			background-color: $background;
			width: 60%;
			padding: 2rem 3rem;
			padding-bottom: 0;
		}

		&__text {
			line-height: 2rem;

			&--red {
				color: $primary;
			}
		}
	}

	&__quote {
		margin-bottom: 3rem;
	}

	&__stats {
		margin-bottom: 3rem;
	}

	&__stages {
		padding: 0;
	}

}

</style>
