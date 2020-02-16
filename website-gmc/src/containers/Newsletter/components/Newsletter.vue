<template>
	<section class="Newsletter">

		<div class="Newsletter__meta">
			<h1 class="Newsletter__meta__title headline" v-text="newsletter.title"/>
			<pre v-text="toDate(newsletter.sentAt)"/>
		</div>

		<v-card
			class="Newsletter__letter"
			:key="newsletter.id">
			<v-card-title primary-title v-html="newsletter.html"/>
		</v-card>

	</section>
</template>

<script>
export default {
	props: {
		newsletter: {
			type: Object,
			required: true
		}
	},
	methods: {
		toDate(dateString) {
			const date = new Date(dateString);
			return date.toLocaleDateString();
		}
	}
}
</script>

<style lang="scss">
@import '../../../styles/colours';

.Newsletter {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	&__meta {
		width: 20%;
		text-align: left;

		&__title {
			text-align: left;
		}
	}

	&__letter {
		margin-bottom: 3rem;
		height: 70vh;
		overflow-y: auto;
	}

}
</style>

