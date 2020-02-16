<template>
	<v-card class="PostList">
		<section class="App__inner mt-3">

			<section class="App__toolbar">
				<h1 class="App__toolbar__title display-3">All Posts</h1>
				<v-btn
					class="App__toolbar__button"
					color="info"
					to="posts/add"
					v-if="user">
					<v-icon left>add</v-icon>Add Post
				</v-btn>
			</section>

			<section class="PostList__info mb-3">
				<p v-html="infoText"/>
			</section>

			<preview-list :posts="displayedPosts"/>

		</section>
	</v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { doArraysHaveMatchingElement } from '../../lib/common';
import PreviewList from './components/PreviewList';

export default {
	components: {
		PreviewList
	},
	data() {
		return {
			searchTerm: null,
			error: false
		};
	},
	computed: {
		...mapGetters({
			posts: 'post/posts',	// map to list of posts from vuex,
			user: 'account/user'
		}),
		displayedPosts() {
			// #Todo: search with options passed to fetch list to only load required data from db
			// #Todo: search should do more than filter titles
			let filteredPosts = this.posts;
			if (this.searchTerm) {
				const searchTerm = this.searchTerm.toLowerCase();
				filteredPosts = filteredPosts.filter(p => p.title.toLowerCase().includes(searchTerm));
			}
			// #Todo: fix tag logic
			if (this.selectedTags.length !== 0) {
				filteredPosts = filteredPosts.filter(p => doArraysHaveMatchingElement(p.tags, this.selectedTags));
			}
			return filteredPosts;
		},
		infoText() {
			let info = 'Welcome to progress. This is a platform to track and share your thoughts!<br>';
			if (this.searchTerm) info += `Displaying search results for: <b>${this.searchTerm}</b><br>`;
			return info;
		},
		selectedTags() {
			const tags = this.$route.query.tags;
			if (!tags) return [];
			if (typeof tags === 'string') return [tags];
			return tags;
		},
		isPostListPage() {
			const route = this.$route;
			return route.name === 'post.list';
		}
	},
	methods: {
		...mapActions({
			fetchList: 'post/fetchPosts'
		}),
		async handleSearchQuery() {
			await this.$nextTick();
			this.searchTerm = this.$route.query.searchTerm;
		},
		async fetch() {
			this.handleSearchQuery();
			try {
				await this.fetchList();
			} catch (err) {
				this.$notify(err);
			}
		}
	},
	watch: {
		$route() {
			this.handleSearchQuery();
		}
	},
	created() {
		this.fetch();
	}
};
</script>

