<template>
	<div class="User">
		<v-card
			class="mb-3 App__card">

			<section
				v-if="!user"
				class="App__inner mt-3">
				<!-- #Todo: replace with an error card component -->
				<p>Error: Failed to load details for user with id: {{userId}}</p>
			</section>

			<section
				v-else
				class="App__inner mt-3">

				<section class="App__toolbar">

					<h1
						v-if="!inEditMode"
						class="App__toolbar__title display-3"
						v-text="user.username"/>

					<v-avatar
						class="App__toolbar__avatar"
						:size="75">
						<img
							:src="user.photoURL"
							alt="Profile Photo">

					</v-avatar>

					<v-btn
						class="App__toolbar__button"
						v-if="isEditButtonVisible"
						color="amber"
						:to="`/account/edit`">
						<v-icon left>edit</v-icon>Edit
					</v-btn>

				</section>

				<v-card-title
					class="User__properties"
					primary-title>

					<v-list
						class="w-100"
						dense>
						<v-list-tile>
							<v-list-tile-content>
								<span class="User__properties__key">Email:</span>
								<p v-text="user.email"/>
							</v-list-tile-content>
						</v-list-tile>
						<v-list-tile>
							<v-list-tile-content>
								<span class="User__properties__key">_id:</span>
								<p v-text="user._id"/>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>

				</v-card-title>

			</section>
		</v-card>

		<v-card
			class="mb-3"
			v-if="hasUserPosts">
			<v-card-title class="App__inner mt-2 p-0">

				<section class="App__toolbar">
					<h3 class="App__toolbar__title display-2 mt-2">User Posts</h3>
				</section>

				<preview-list :posts="userPosts"/>

			</v-card-title>
		</v-card>

	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PreviewList from '../Post/components/PreviewList';


export default {
	components: {
		PreviewList
	},
	data() {
		return {
			user: null,
			userPosts: []
		};
	},
	computed: {
		...mapGetters({
			account: 'account/user'
		}),
		userId() {
			const id = this.$route.params.id;
			return id;
		},
		hasUserPosts() {
			return this.userPosts.length !== 0;
		},
		isEditButtonVisible() {
			if (!this.account) return false;
			return this.user._id === this.account._id;
		},
		inEditMode() {
			// #Todo: implement this so detail and edit can be managed with the same component.
			return false;
		}
	},
	methods: {
		...mapActions({
			fetchUserById: 'account/fetchUserById',
			fetchPosts: 'post/fetchPosts'
		}),
		redirectWithMessage(message) {
			this.$notify(message);
			this.$router.push('/');
		},
		async fetch() {
			if (!this.userId) this.redirectWithMessage('No valid userId found on url.');
			const [user, userPosts] = await Promise.all([
				this.fetchUserById(this.userId),
				this.fetchPosts({ authorId: this.userId, preview: true })
			]);
			if (!user) this.redirectWithMessage(`Could not load user with id: ${this.userId}`);
			this.user = user;
			this.userPosts = userPosts;
		}
	},
	watch: {
		userId() {
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

$mobileWidth: $Mobile-Width;
$tabletWidth: $Mobile-Width;

.User {

	&__properties {
		clear: both;
		width: 100%;
		padding: 8px 0;
		padding-left: 0;
		padding-right: 0;
		border-top: 1px solid #ccc;

		.v-list__tile {
			padding: 0;
			margin-bottom: 1rem;
		}

		&__key {
			float: left;
			display: block;
			margin-top: 1rem;
			font-weight: bold;

			@media all and (min-width: $tabletWidth) {
				display: inline-block;
			}
		}
	}

}


</style>

