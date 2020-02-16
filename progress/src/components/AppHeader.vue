<template>
	<v-toolbar
		class="Header"
		app
		fixed
		clipped-left>

		<section class="App__inner">

			<v-toolbar-side-icon
				class="Header__sidebarIcon"
				@click="onToolbarButtonClick"/>

			<span
				class="Header__title title"
				@click="goToHome">
				Holistic&nbsp;
				<span class="font-weight-light">Progress</span>
			</span>

			<section
				v-if="$mq !== 'mobile'"
				class="Header__githubLinks">
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

			<!-- Dropdown component that either manages sign in/up or user account details -->
			<b-dropdown
				class="Header__account"
				variant="outline-primary"
				:offset="AccountDropdownOffset"
				@click="onAccountButtonClick">

				<template slot="button-content">
					<v-icon
						v-if="!user"
						color="info"
						v-text="'account_box'"/>
					<v-avatar
						v-else
						:size="25">
						<img
							:src="user.photoURL"
							alt="Profile Photo">
					</v-avatar>
					<span
						class="ml-2"
						v-if="isAccountDropdownUsernameVisible"
						v-text="user.username"/>
				</template>

				<template v-if="!user">
					<b-dropdown-item
						@click="logIn"
						v-text="'Sign In'"/>
					<b-dropdown-item
						to="/account/create"
						v-text="'Sign Up'"/>
				</template>

				<template v-else>
					<b-dropdown-item
						v-text="'My Profile'"
						:to="`/user/${user._id}`"/>
					<b-dropdown-item
						v-text="'Edit Account'"
						:to="`/account/edit`"/>
					<b-dropdown-divider/>
					<b-dropdown-item
						v-text="'Log Out'"
						@click="logOut"/>
				</template>

			</b-dropdown>

		</section>
	</v-toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	data() {
		return {
			searchTerm: null
		};
	},
	computed: {
		...mapGetters({
			user: 'account/user'
		}),
		AccountDropdownOffset() {
			// ensure dropdown contents are visible on a mobile screen
			if (this.$mq === 'mobile') return '-100%';
			return 0;
		},
		isAccountDropdownUsernameVisible() {
			if (this.$mq === 'mobile') return false;
			if (!this.user) return false;
			return true;
		}
	},
	methods: {
		...mapActions({
			logOut: 'account/logOut',
			logIn: 'account/logIn'
		}),
		onToolbarButtonClick() {
			this.$emit('toolbarClick');
		},
		goToHome() {
			this.$router.push('/');
		},
		onAccountButtonClick() {
			if (this.$mq === 'mobile') return;
			if (!this.user) this.logIn();
		}
	}

};
</script>


<style lang="scss">
@import '../settings';

$themeColour: $Theme-Colour;

.Header{
	width: 100%;
	height: 100%;
	background-color: $themeColour !important;

	.v-toolbar__content {
		padding: 0;
	}

	&__sidebarIcon {
		position: absolute !important;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		margin: 0 !important;
	}

	&__title{
		position: absolute;
		left: 40px;	// places title right of menu icon
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;
		padding: 20px 0;	// makes click target area larger
	}

	&__account {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	&__githubLinks {
		position: absolute;
		right: 150px;
		top: 50%;
		transform: translateY(-50%);

		.badge {
			margin-left: 1rem;
			padding: 0.5rem;
			display: block;
		}
	}

}

</style>
