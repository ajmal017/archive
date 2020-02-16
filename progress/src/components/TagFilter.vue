<template>
	<div class="TagFilter">

		<v-list-tile
			class="Sidebar__allPosts"
			@click="onAllPostsButtonClick">
			<v-list-tile-action>
				<v-icon>list</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
				<v-list-tile-title class="grey--text">
					<!-- #Todo: link to all posts page -->
					All Posts
				</v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>

		<v-divider
			class="my-3"
			dark/>

		<v-layout
			align-center
			row>
			<v-flex xs6>
				<v-subheader>
				Tags
				</v-subheader>
			</v-flex>
			<v-flex
				class="text-xs-right"
				xs6>
				<v-btn
					small
					flat
					@click="toggleEditMode"
					v-text="editButtonText"/>
			</v-flex>
		</v-layout>

		<v-list-tile
			v-for="tag in tags"
			:key="tag"
			:class="{ 'inEditMode': isInEditMode }">
			<v-list-tile-content @click="onSelection(tag)">
				<v-list-tile-title
					class="grey--text"
					:class="{ 'selected': selected.includes(tag) }"
					v-text="tag"/>

				<v-icon
					v-if="isInEditMode"
					class="TagFilter__removeTag"
					@click.prevent="deleteTag(tag)">close</v-icon>
			</v-list-tile-content>
		</v-list-tile>

		<v-text-field
			class="TagFilter__newTag"
			v-if="isInEditMode"
			v-model.trim="newTag"
			placeholder="New Tag - [enter] to add"
			@keydown.native.enter="addUserTag"/>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	data() {
		return {
			selected: [],
			newTag: null,
			isInEditMode: false
		};
	},
	computed: {
		...mapGetters({
			tagsData: 'tag/tags'
		}),
		tags() {
			if (!this.tagsData) return [];
			return Object.values(this.tagsData);
		},
		editButtonText() {
			if (this.isInEditMode) return 'cancel';
			return 'edit';
		}
	},
	methods: {
		...mapActions({
			fetchTags: 'tag/fetchTags',
			addTag: 'tag/addTag',
			removeTag: 'tag/removeTag'
		}),
		onSelection(tag) {
			if (this.isInEditMode) return;
			if (this.selected.includes(tag)) {
				const index = this.selected.indexOf(tag);
				this.selected.splice(index, 1);
			} else {
				this.selected.push(tag);
			}
			this.$emit('tagSelect', this.selected);
		},
		async addUserTag() {
			await this.addTag(this.newTag);
			this.newTag = null;
		},
		async deleteTag(tag) {
			await this.removeTag(tag);
		},
		toggleEditMode() {
			this.isInEditMode = !this.isInEditMode;
		},
		onAllPostsButtonClick() {
			this.selected = [];
			this.$router.push({ name: 'post.list' });
		}
	},
	created() {
		this.fetchTags();
	}
};
</script>

<style lang="scss">

.TagFilter {
	overflow-x: hidden;


	.selected {
		text-decoration: underline;
		font-weight: bold;
	}

	.v-list__tile {
		height: 30px;
		cursor: pointer;
		transition: background 200ms;

		&:hover {
			background: #ccc;
			color: white !important;
		}

	}

	.inEditMode {
		.v-list__tile {
			background: transparent !important;
			cursor: default !important;
		}
	}

	&__newTag {
		padding: 0 16px;
	}

	&__removeTag {
		position: absolute;
		right: 2rem;
		cursor: pointer;
	}
}

</style>
