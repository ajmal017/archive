<template>
	<v-card class="PostEdit">
		<section class="App__inner mt-3">

			<section class="App__toolbar">

				<v-btn
					class="App__toolbar__button App__toolbar__button--iconOnly"
					color="red"
					@click="onDeleteButtonClick">
					<v-icon>delete</v-icon>
				</v-btn>

				<v-btn
					class="App__toolbar__button"
					color="info"
					:disabled="!isPostValid"
					@click="onPublishButtonClick">
					<v-icon left>publish</v-icon>Publish
				</v-btn>

				<v-btn
					class="App__toolbar__button"
					v-if="!inNewPostMode"
					color="amber"
					:to="`/posts/${post._id}`">
					<v-icon left>keyboard_backspace</v-icon>Back to Post
				</v-btn>
			</section>

			<b-form-group
				label="Post Title"
				label-for="postTitle">
				<b-form-input
					id="postTitle"
					placeholder="Something smart..."
					:state="isTitleValid"
					v-model.trim="editedTitle"/>
			</b-form-group>

			<b-form-group
				label="Post Content"
				label-for="postContent">
				<markdown-editor
					id="postContent"
					class="PostEdit__content"
					:value="editedContent"
					@update="updateEditedContent"/>
			</b-form-group>

			<!-- #Todo: replace this with a searchable multiselect to make selecting parent post easier (or a tree view?) -->
			<b-form-group
				label="Parent Post"
				label-for="postParent">
				<b-form-select
					id="postParent"
					class="PostEdit__parent"
					v-model="editedParentId"
					:options="editedParentIdOptions"/>
			</b-form-group>

			<v-combobox
				v-model="editedTags"
				label="Post tags"
				chips
				clearable
				solo
				multiple>
				<template slot="selection" slot-scope="data">
					<v-chip
						:selected="data.selected"
						close
						@input="removeTag(data.item)">
						<strong>{{ data.item }}</strong>
					</v-chip>
				</template>
			</v-combobox>

		</section>
	</v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MarkdownEditor from '../../components/MarkdownEditor';

export default {
	components: {
		MarkdownEditor
	},
	data() {
		return {
			// initialise some values to store edited data
			editedTitle: null,
			editedContent: null,
			editedParentId: null,
			editedTags: []
		};
	},
	computed: {
		...mapGetters({
			user: 'account/user',	// get the user object from vuex,
			post: 'post/post',	// get the currently loaded post from vuex
			posts: 'post/posts'
		}),
		editId() {
			// attempts to load a post from the value in the url
			const id = this.$route.params.id;
			return id;
		},
		inNewPostMode() {
			// we are in new post mode if no post if no edit id is given
			return !this.editId;
		},
		editedParentIdOptions() {
			const parentOptions = this.posts.map(p => ({ text: p.title, value: p._id }));
			return [
				{ text: 'None', value: null },
				...parentOptions
			];
		},
		finalPost() {
			// builds the new post to be published with updated / new information
			const finalPost = {
				authorId: this.user._id,
				title: this.editedTitle,
				content: this.editedContent || '',
				parentId: this.editedParentId,
				tags: this.editedTags
			};
			if (!this.inNewPostMode) finalPost._id = this.post._id;
			return finalPost;
		},
		isTitleValid() {
			// returns true if this.editedTitle !== null
			return !!this.editedTitle;
		},
		isPostValid() {
			// currently the only required fields on our posts is the title
			return this.isTitleValid;
		}
	},
	methods: {
		...mapActions({
			submit: 'post/submitPost',	// get the function to submit data to the database,
			update: 'post/updatePost',	// get the function to update existing posts
			fetchDetail: 'post/fetchDetail', // get the function to load a post from the database
			deletePost: 'post/deletePost', 	
			fetchList: 'post/fetchPosts' // #Todo: since this is only used to select post parent we don't need to load all post Data, fix this
		}),
		async fetch() {
			if (!this.inNewPostMode) {
				await Promise.all([
					this.fetchDetail(this.editId),
					this.fetchList()
				]);
				if (!this.post) await this.$router.push('/');
				this.editedTitle = this.post.title;
				if (this.post.content) {
					this.editedContent = this.post.content;
					this.updateEditedContent(this.editedContent);
				}
				if (this.post.tags) this.editedTags = this.post.tags;
				if (this.post.parentId) this.editedParentId = this.post.parentId;
			} else {
				await this.fetchList();
				this.handleURLParams();
			}
		},
		async onDeleteButtonClick() {
			await this.deletePost({id: this.post._id});
			this.$router.push({ name: 'post.list' });
		},
		async onPublishButtonClick() {
			try {
				if (this.inNewPostMode) {
					const id = await this.submit(this.finalPost);
					this.$notify('Published succesfully.');
					this.$router.push(`/posts/${id}`);
				} else {
					await this.update(this.finalPost);
					this.$notify('Updated succesfully.');
					this.$router.push(`/posts/${this.post._id}`);
				}
			} catch (err) {
				this.$notify(`There was an error publishing: ${err}`);
				console.error(err); // eslint-disable-line no-console
			}
		},
		handleURLParams() {
			const query = this.$route.query;
			if (query.parentId) this.editedParentId = query.parentId;
		},
		updateEditedContent(newVal) {
			this.editedContent = newVal;
		},
		removeTag(tag) {
			this.editedTags.splice(this.editedTags.indexOf(tag), 1);
			this.editedTags = [...this.editedTags];
		}
	},
	created() {
		this.fetch();
	}
};
</script>

<style lang="scss">
@import '../../settings';

.PostEdit {

	&__content {
		min-height: 300px;
		max-height: 800px;
	}

	&__publish {
		float: right;
	}

}

</style>

