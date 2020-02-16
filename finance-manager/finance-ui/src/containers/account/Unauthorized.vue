<template>
	<section class="Unauthorized">

		<b-container class="Unauthorized__inner">

			<b-btn
				class="Unauthorized__button"
				variant="outline-info"
				size="lg"
				v-text="'Sign Up'"
				@click="onSignUpClick"/>

			<b-btn
				class="Unauthorized__button"
				variant="info"
				size="lg"
				v-text="'Log In'"
				@click="onLogInClick"/>

			<a
				class="p-3"
				href="https://github.com/holistic-web/finance-manager"
				v-text="'https://github.com/holistic-web/finance-manager'"/>

		</b-container>

	</section>
</template>

<script>
import { mapActions } from 'vuex';
import toastService from '../../lib/toastService';

export default {
	methods: {
		...mapActions({
			logIn: 'account/logIn',
			createAccount: 'account/createAccount',
		}),
		async onLogInClick() {
			try {
				await this.logIn();
				this.$router.push('/');
			} catch (err) {
				toastService.toast(`Error logging in: ${err}`);
			}
		},
		async onSignUpClick() {
			try {
				await this.createAccount();
				this.$router.push('/');
			} catch (err) {
				toastService.toast(`Error signing up : ${err}`);
			}
		},
	},
};
</script>


<style lang="scss">
.Unauthorized {

	&__inner {
		height: -webkit-fill-available;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
	}

	&__button {
		padding: 1rem 3rem;
		width: 100%;
		margin-bottom: 1rem;
	}
}

</style>
