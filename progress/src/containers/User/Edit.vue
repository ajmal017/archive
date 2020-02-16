<template>
	<v-card class="EditUser">
		<section class="App__inner mt-3">

			<section class="App__toolbar">

				<v-btn
					v-if="inCreateAccountMode"
					class="App__toolbar__button"
					color="success"
					:disabled="!isUsernameValid"
					@click="onCreateAccountButtonClick">
						<v-icon left>create</v-icon>Create Account
				</v-btn>

				<template v-else>
					<v-btn
						class="App__toolbar__button"
						color="info"
						:disabled="!isUsernameValid"
						@click="onUpdateButtonClick">
						<v-icon left>create</v-icon>Update Account
					</v-btn>
					<v-btn
						class="App__toolbar__button"
						color="error"
						:to="`/user/${user._id}`">
						<v-icon left>keyboard_backspace</v-icon>Back to Profile
					</v-btn>
				</template>

				<div v-if="user">
					<h1
						class="App__toolbar__title display-3"
						v-text="titleText"/>
					<v-avatar
							class="ml-3 float-left"
							:size="75"
							:src="user.photoURL"/>
				</div>

			</section>

			<section>
				<b-form-group
					label="username"
					label-for="username">
					<b-form-input
						id="username"
						:state="isUsernameValid"
						v-model.trim="editedUsername"/>
				</b-form-group>
			</section>

			<v-card-title
				v-if="!inCreateAccountMode"
				class="EditUser__properties"
				primary-title>

				<v-list
					class="w-100"
					dense>
					<v-list-tile>
						<v-list-tile-content>
							<span class="EditUser__properties__key">Email:</span>
							<p v-text="user.email"/>
						</v-list-tile-content>
					</v-list-tile>
					<v-list-tile>
						<v-list-tile-content>
							<span class="EditUser__properties__key">_id:</span>
							<p v-text="user._id"/>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>

			</v-card-title>

		</section>
	</v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	data() {
		return {
			editedUsername: null
		};
	},
	computed: {
		...mapGetters({
			user: 'account/user'
		}),
		inCreateAccountMode() {
			return !this.user;
		},
		isUsernameValid() {
			return !!this.editedUsername;
		},
		titleText() {
			if (this.inCreateAccountMode) return 'Welcome to Progress!';
			return this.user.username;
		}
	},
	methods: {
		...mapActions({
			postCreateAccount: 'account/createAccount',
			postUpdateUser: 'account/updateUser'
		}),
		async loadData() {
			this.editedUsername = this.user.username;
		},
		async createAccount() {
			if (!this.editedUsername) return false;
			const account = {
				username: this.editedUsername
			};
			const result = await this.postCreateAccount(account);
			return result;
		},
		onCreateAccountButtonClick() {
			this.createAccount();
		},
		async onUpdateButtonClick() {
			if (!this.editedUsername) return false;
			try {
				const result = await this.postUpdateUser({
					...this.user,
					username: this.editedUsername
				});
				this.$notify('Details updated succesfully');
				return result;
			} catch (err) {
				this.$notify(`There was a problem updating your details: ${err}`);
				console.error(err); // eslint-disable-line no-console
				return false;
			}
		},
		async handleErrorParams() {
			// wait for rendering to be ready to display notifications
			await this.$nextTick();
			if (this.$route.query.notRegistered === null) this.$notify('No registered account found...');
		},
		handleRedirect() {
			if (this.$route.name === 'account.create' && this.user) {
				this.$router.push('/account/edit');
			}
		}
	},
	mounted() {
		this.handleErrorParams();
	},
	created() {
		this.handleRedirect();
		if (!this.inCreateAccountMode) this.loadData();
	}
};
</script>

<style lang="scss">
@import '../../settings';

$tabletWidth: $Tablet-Width;

.EditUser {

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

