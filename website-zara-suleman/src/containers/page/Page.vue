<template>
	<div class="Page">
		<div
			class="App__inner"
			v-html="page.content">

		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	data() {
		return {
			pageId: null
		};
	},
	computed: {
		...mapGetters({
			page: 'page/page'
		})
	},
	methods: {
		...mapActions({
			fetchPage: 'page/fetchDetail'
		}),
		async fetch() {
			await this.fetchPage({ id: this.pageId });
		}
	},
	async created() {
		this.pageId = this.$route.params.id;
		this.fetch();
	}
};
</script>

<style lang="scss">
.Landing {

	&__card {
		margin-bottom: 2rem;
	}
}
</style>
