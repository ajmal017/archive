<template>
	<div class="Landing">

		<div
			class="App__inner"
			v-if="isLanding && isReady">

			<h2>Home Page</h2>


			<h5>Text Pages</h5>
			<b-link
				class="Landing__link"
				v-for="textPage in textPages"
				:key="textPage.title"
				:to="getLinkForTextPage(textPage)"
				v-text="textPage.title">
			</b-link>

		</div>

		<text-page v-if="!isLanding"/>

	</div>
</template>

<script>
import { contentsRef, routesRef } from '../../tamiat/admin/firebase_config';
import TextPage from '../../tamiat/app/templates/Text';

export default {
	components: {
		TextPage
	},
	firebase: {
		routes: routesRef,
		contents: contentsRef
	},
	computed: {
		isReady() {
			if (!this.contents) return false;
			return true;
		},
		isLanding() {
			return this.$route.path === '/';
		},
		textPages() {
			if (!this.contents[0]) return null;
			return Object.values(this.contents[0].data);
		}
	},
	methods: {
		getLinkForTextPage(textPage) {
			const name = textPage.title.toLowerCase();
			return `/${name}`;
		}
	}
};
</script>

<style lang="scss">
.Landing {

	&__link {
		display: block;
	}
}
</style>
