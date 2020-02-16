<template>
	<section class="Quotes">

		<carousel
			:autoplay="true"
			:autoplay-timeout="4000"
			:autoplay-hover-pause="true"
			:loop="true"
			:per-page="1"
			:pagination-color="theme.highlight"
			:pagination-active-color="theme.alt">

			<slide
				v-for="quote in quotes"
				:key="quote.quote">

				<v-container class="Quotes__inner">
					<p class="Quotes__quote" v-text="quote.quote"/>
					<span class="Quotes__author" v-text="quote.author"/>
				</v-container>

			</slide>

		</carousel>

	</section>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import theme from '../../../styles/theme';

export default {
	components: {
		Carousel,
		Slide
	},
	data() {
		return {
			quotes: [
				{
					quote: `“In 40 years working against FGM, the Global Media Campaign’s work is the most effective anti-FGM campaign I’ve ever come across"`,
					author: `Tobe Levin, Associate of the Hutchins Center for African and African American Research at Harvard University`
				},
				{
					quote: `“Religious leaders using the media to End FGM is a ‘golden ticket’ to speeding an end to FGM.”`,
					author: `Dr Azza Karam, UN Inter-Agency Task Force on Religion and Development,  November, 2018`
				},
				{
					quote: `"Media  broke the taboo. Now I hear religious leaders speaking on the radio and on social media all the time  about FGM"`,
					author: `Imam Mamadou Traore, religious leader and Vice-President of the High Islamic Council in Mali`
				}
			],
			theme
		}
	}
}
</script>


<style lang="scss">
@import '../../../styles/colours';

.Quotes {
	width: 100%;
	background-color: $primary;
	color: $highlight;
	padding-bottom: 2rem;

	&__inner {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-bottom: 0;
	}

	&__quote {
		font-weight: bold;
		text-align: center;
		font-size: 1.7rem;
		line-height: 2rem;
	}

	&__author {
		font-weight: bold;
		font-size: 1rem;
		text-align: center;
	}

	.VueCarousel-dot {
		margin-top: 0 !important;
	}
}
</style>
