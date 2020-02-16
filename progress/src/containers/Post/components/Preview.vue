<template>
	<v-card class="PostPreview">
		<div>
			<v-card-title
				class="PostPreview__inner"
				primary-title>

				<h3
					class="PostPreview__title headline mb-0"
					v-text="post.title"/>

				<b-link
					v-if="post.user"
					:to="`/user/${post.authorId}`">
					<pre
						class="PostPreview__author"
						v-text="post.user.username"/>
				</b-link>

				<div
					class="PostPreview__previewText"
					v-html="previewText"/>

				<section class="PostPreview__Tags">
					<v-chip
						v-for="tag in post.tags"
						small
						:key="tag"
						label>
						<v-icon left>label</v-icon>{{tag}}
					</v-chip>
				</section>

			</v-card-title>

			<v-card-actions>
				<v-btn
					color="orange"
					v-text="'Open Post'"
					:to="`/posts/${post._id}`"
					flat/>
			</v-card-actions>
		</div>
	</v-card>
</template>

<script>
import marked from 'marked';

export default {
	props: {
		post: {
			type: Object,
			required: true
		}
	},
	computed: {
		previewText() {
			// #Todo: only load post preview from database to save db usage
			if (!this.post.content) return '';
			const NUM_WORDS = 12;
			let cutOff = false;
			let words = this.post.content.split(' ');
			if (words.length > NUM_WORDS) {
				words = words.splice(0, NUM_WORDS);
				cutOff = true;
			}
			let previewText = words.join(' ');
			previewText = `${marked(previewText, { sanitize: true })}`;
			if (cutOff) previewText += '...';
			return previewText;
		}
	}
};
</script>

<style lang="scss">
@import '../../../settings';

$themeColour: $Theme-Colour;

.PostPreview {
	position: relative;

	&__inner {
		height: 140px;
		overflow-y: auto;
	}

	&__author {
		position: absolute;
		right: 1rem;
		top: 1rem;
	}

	&__previewText {
		display: block;
		width: 100%;
		margin-top: 1rem;
		margin-bottom: 0;

		img {
			max-width: 100%;
		}
	}

}

</style>

