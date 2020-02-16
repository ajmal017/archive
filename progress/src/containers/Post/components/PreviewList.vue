<template>
	<section class="PreviewList">

			<pre v-text="postCount"/>

			<preview
				class="PreviewList__card"
				v-for="post in posts"
				:key="post._id"
				:post="post"/>

		</section>
</template>

<script>
import Preview from './Preview';

export default {
	components: {
		Preview
	},
	props: {
		posts: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		postCount() {
			const count = this.posts.length;
			if (count === 1) return '1 post';
			return `${count} posts`;
		}
	}
};
</script>

<style lang="scss">
@import '../../../settings';

$tabletWidth: $Tablet-Width;

.PreviewList{
	width: 100%;
	float: left;

	&__card {
		width: 100%;
		margin-bottom: 1rem;

		@media all and (min-width: $tabletWidth) {
			width: calc(50% - 1rem);
			margin-bottom: 2rem;
			float: left;
			margin-right: 1rem;

			&:nth-of-type(even) {
				float: right;
				margin-right: 0;
				margin-left: 1rem;
			}
		}
	}

}

</style>

