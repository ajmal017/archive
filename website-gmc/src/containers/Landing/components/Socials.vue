<template>
	<div class="Socials">
		<Tweet
			v-if="showFeatured"
			class="Socials__pinned Socials__component"
			:id="pinnedTweetId"/>
		<timeline
			class="Socials__list Socials__component"
			id= "GMCEndFGM"
			sourceType= "profile"
			:options="options"/>

	</div>
</template>

<script>
import { Timeline, Tweet } from 'vue-tweet-embed';

export default {
	components: {
		Timeline,
		Tweet
	},
	props: {
		tweetLimit: {
			type: Number,
			default: 3
		},
		width: {
			type: String,
			default: 'auto'
		},
		height: {
			type: String,
			default: 'auto'
		},
		showFeatured: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			pinnedTweetId: '1106223462656458754'
		};
	},
	computed: {
		options() {
			return {
				tweetLimit: `${this.tweetLimit}`,
				width: this.width,
				height: this.height
			};
		}
	}
};
</script>

<style lang="scss">

.Socials {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;

	&__list {
		height: 39rem;
		overflow-y: auto;
	}

}

</style>
