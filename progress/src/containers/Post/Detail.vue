<template>
	<v-card class="Post">
		<section class="App__inner pt-3">
			<div v-if="post">

				<section class="App__toolbar">

					<h1 class="App__toolbar__title display-3">{{post.title}}</h1>

					<v-btn
						class="App__toolbar__button"
						v-if="user"
						color="info"
						:to="`/posts/add?parentId=${post._id}`">
						<v-icon left>add</v-icon>Add Child Post
					</v-btn>

					<v-btn
						v-if="isCurrentUserAuthor"
						class="App__toolbar__button"
						color="amber"
						:to="`/posts/${post._id}/edit`">
						<v-icon left>edit</v-icon>Edit
					</v-btn>
				
				</section>

				<b-link :to="`/user/${post.authorId}`">
					<pre
						v-if="post.user"
						class="Post__author"
						v-text="post.user.username"/>
				</b-link>

				<section class="Post__content">
					<div v-html="postContent"/>
				</section>

				<section class="Post_Tags">
					<v-chip
						v-for="tag in post.tags"
						:key="tag"
						label>
						<v-icon left>label</v-icon>{{tag}}
					</v-chip>
				</section>

				<section
					class="Post__children"
					v-if="isChildrenSectionVisible">
					<h3>Child Posts:</h3>
					<!-- <post-preview
						class="Post__card"
						v-for="childPost in childPosts"
						:key="childPost._id"
						:post="childPost"/> -->
					<preview-list :posts="childPosts"/>
				</section>

				<!-- #Todo: abstract comments into their own component that takes a postId prop -->
				<section class="Post__comments">
					<h3>Comments</h3>
					<v-list
						v-if="!isCommentsEmpty"
						two-line>
						<v-list-tile
							class="Post__comments__single"
							v-for="(comment, index) in post.comments"
							:key="index"
							avatar>

							<v-list-tile-avatar>
								<img :src="comment.user.photoURL">
							</v-list-tile-avatar>

							<v-list-tile-content>
								<v-list-tile-title v-html="comment.content"/>
								<v-list-tile-sub-title v-html="comment.user.username"/>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>

					<v-textarea
						name="input-7-4"
						label="Leave a comment..."
						v-model="editedComment"
						solo/>
					<v-btn
						color="info"
						v-text="'Post Comment'"
						:disabled="isPostCommentButtonDisabled"
						@click="submitComment"/>
				</section>

			</div>
		</section>
	</v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import marked from 'marked';
import PreviewList from './components/PreviewList';

export default {
	components: {
		PreviewList
	},
	data() {
		return {
			childPosts: [],
			editedComment: null
		};
	},
	computed: {
		...mapGetters({
			user: 'account/user',
			post: 'post/post'
		}),
		isChildrenSectionVisible() {
			if (!this.childPosts) return false;
			return this.childPosts.length !== 0;
		},
		isCurrentUserAuthor() {
			// return posts as editable if we are the user who created them
			if (!this.user) return false;
			return this.post.authorId === this.user._id;
		},
		postContent() {
			if (!this.post.content) return '';
			return marked(this.post.content, { sanitize: true });
		},
		isCommentsEmpty() {
			if (!this.post.comments) return false;
			return this.post.comments.length === 0;
		},
		isPostCommentButtonDisabled() {
			return !this.editedComment;
		}
	},
	methods: {
		...mapActions({
			fetchPost: 'post/fetchDetail', 	// get the function to load a post from the database
			fetchList: 'post/fetchPosts',
			postComment: 'comment/submitComment'
		}),
		async fetch() {
			await this.$nextTick();
			const id = this.$route.params.id;
			await this.fetchPost(id);
			if (!this.post) this.$router.push('/posts');
			// fetch child posts
			this.childPosts = await this.fetchList({ parentId: this.post._id });
		},
		async submitComment() {
			await this.postComment({ postId: this.post._id, content: this.editedComment });
			this.editedComment = null;
			// #Todo: use a more efficient means of refreshing comments here than reloading all post data
			this.fetch();
		},
	},
	watch: {
		$route() {
			this.fetch();
		}
	},
	created() {
		this.fetch();
	}
};
</script>

<style lang="scss">
@import '../../settings';

.Post {

	&__content {
		margin-bottom: 3rem;
	}

	&__children {
		float: left;
		width: 100%;
		margin-bottom: 3rem;
	}

	&__comments{
		margin-top: 2rem;

		&__single {
			border-bottom: 1px solid #ccc;
		}
	}

}

</style>

