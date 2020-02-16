<template>
	<div class="TextTemplate">

		<section
			class="App__inner"
			v-if="isContentVisible">

			<h2 v-text="content.title"/>

			<div v-html="content.html"/>

		</section>

	</div>
</template>

<script>
import LoadContent from './LoadContent';

export default {
	mixins: [LoadContent],
	computed: {
		content() {
			const id = this.$route.params.id;
			const currentRoute = this.routes.find(r => r.path === '/:id');
			const allTextContent = this.getContentsByType(currentRoute.contentType);
			const currentContent = allTextContent.find(c => c.url === id || c['.key'] === id);
			return currentContent;
		},
		isContentVisible() {
			return !!this.content;
		}
	}
};
</script>

<style lang="scss">
</style>
