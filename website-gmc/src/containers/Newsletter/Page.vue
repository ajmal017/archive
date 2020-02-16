<template>
	<section class="NewsletterPage">
		<app-header @showModal="$emit('showModal')"/>

		<v-container class="NewsletterPage__intro">
				<h1 class="NewsletterPage__intro__title">Our Newsletter</h1>
				<div class="NewsletterPage__intro__button">
					<span
						class="NewsletterPage__button"
						color="primary"
						v-text="'Join our mailing list'"
						@click="$emit('showModal')"/>
				</div>
		</v-container>


		<v-container class="NewsletterPage__content">
			<template v-if="isReady">

				<newsletter
					class="NewsletterPage__featured"
					:newsletter="newsletters[selectedIndex]"
					@showModal="$emit('showModal')"/>

				<v-card class="NewsletterPage__list">
					<h3 class="headline NewsletterPage__list__title">Other Articles:</h3>
					<template v-for="(newsletter, i) in newsletters">
						<section class="NewsletterPage__preview" v-if="i !== selectedIndex" :key="newsletter.id" @click="selectedIndex = i">
							<span class="NewsletterPage__preview__title" v-text="newsletter.title"/>
							<pre class="NewsletterPage__preview__date" v-text="toDate(newsletter.sentAt)"/>
						</section>
					</template>
				</v-card>

			</template>

			<loader class="NewsletterPage__loader" v-else/>
		</v-container>
		<app-footer/>
	</section>
</template>

<script>
import axios from 'axios';
import config from '../../config';
import AppHeader from '../../components/AppHeader';
import AppFooter from '../../components/AppFooter';
import Loader from '../../components/Loader';
import Newsletter from './components/Newsletter';

export default {
	components: {
		AppHeader,
		AppFooter,
		Loader,
		Newsletter
	},
	data() {
		return {
			isReady: false,
			newsletters: [],
			selectedIndex: 0
		};
	},
	methods: {
		toDate(dateString) {
			const date = new Date(dateString);
			return date.toLocaleDateString();
		}
	},
	async created() {
		const url = `${config.apiBase}/newsletters`;
		const { data: newsletters } = await axios.get(url);
		this.newsletters = newsletters;
		this.isReady = true;
	},
};
</script>

<style lang="scss">
@import '../../styles/colours';
@import '../../styles/breakpoints';

.NewsletterPage {
	height: calc(100vh - 5.5rem);
	margin-top: 5.5rem;
	background-color: $background;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;

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

		&__button {
			width: 60%;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
		}
	}

	&__button {
		border-radius: 2rem;
		text-transform: uppercase;
		padding: 1rem 3rem;
		background: $primary;
		color: $highlight;
		transition: background-color 0.3s;
		cursor: pointer;
		width: fit-content;
		font-size: 1.2rem;
		margin-top: 2rem;
		height: fit-content;

		&:hover {
			background: $alt;
		}

		&:active {
			background: $primary;
		}

	}

	&__content {
		display: flex;
		padding: 0;
	}

	&__list {
		margin-left: 2rem;
		padding: 1rem 0;
		height: 70vh;
		overflow-y: auto;
		width: 30%;

		&__title {
			padding: 0 1rem;
			padding-bottom: 0.5rem;
			border-bottom: 0.1rem solid $alt;
		}
	}

	&__preview {
		text-align: left;
		cursor: pointer;
		padding: 0.5rem 1rem;

		&:hover {
			background-color: lighten($text, 70%);
		}
	}

	&__letters {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}

	&__letter {
		margin: 3rem;
		margin-top: 0;
		height: fit-content;
	}

	&__loader {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	// Mailchimp styles
	.display_archive {font-family: arial,verdana; font-size: 12px;}
	.campaign {line-height: 125%; margin: 5px;}

}

</style>
