<template>
	<div class="Sidebar">

		<v-icon
			class="Sidebar__closeIcon"
			@click="emitClose">
			close
		</v-icon>

		<section
			v-if="$mq === 'mobile'"
			class="Sidebar__githubLinks">
			<b-badge
				href="https://github.com/holistic-web/progress"
				target="_blank"
				class="float-left"
				variant="dark">
				Github Repo
			</b-badge>
			<b-badge
				href="https://github.com/holistic-web/progress/issues/new"
				target="_blank"
				class="float-right"
				variant="warning">
				Submit a Bug / Improvement
			</b-badge>
		</section>

		<v-text-field
			class="Sidebar__search"
			label="Search"
			v-model.trim="searchTerm"
			prepend-inner-icon="search"
			hide-details
			solo-inverted
			flat
			@keydown.native.enter="redirectWithSearchTerm"/>

		<tag-filter
			class="Sidebar__tagFilter"
			v-if="user"
			@tagSelect="onTagSelection"/>

	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import TagFilter from './TagFilter';


export default {
	components: {
		TagFilter
	},
	data() {
		return {
			searchTerm: null
		};
	},
	computed: {
		...mapGetters({
			user: 'account/user'
		})
	},
	methods: {
		onTagSelection(tags) {
			this.$router.push({ name: 'post.list', query: { tags } });
		},
		redirectWithSearchTerm() {
			if (!this.searchTerm) {
				this.$router.replace('/posts');
			} else {
				this.$router.replace(`/posts?searchTerm=${this.searchTerm}`);
			}
		},
		emitClose() {
			this.$emit('close');
		}
	}
};
</script>

<style lang="scss">
@import '../settings';

.Sidebar {
	padding: 1rem;
	padding-top: 4rem;
	align-items: center;
	float: left;
	position: relative;

	&__closeIcon {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}

	&__githubLinks {
		float: left;
		width: 100%;
		margin-bottom: 2rem;

		.badge {
			padding: 0.5rem;
		}
	}

	&__search {
		float: left;
		width: 100%;
		clear: both;
		margin-bottom: 2rem !important;
	}

	&__tagFilter {
		float: left;
		width: 100%;
		clear: both;
	}

}

</style>
