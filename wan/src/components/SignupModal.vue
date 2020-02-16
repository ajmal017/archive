<template>
	<v-dialog
		content-class="CreateAccount"
		:value="visible"
		@input="close">

		<v-card>

			<v-card-title v-text="'Create Account'"/>

			<v-card-text @keyup.enter="createAccount">

				<v-text-field label="First Name:" v-model.trim="firstName"/>

				<v-text-field label="Last Name:" v-model.trim="lastName"/>

				<v-text-field label="Email:" type="email" v-model.trim="email"/>

				<v-text-field label="Password:" type="password" v-model="password"/>

				<v-text-field
					label="Confirm
					Password:"
					type="password"
					:error="!!confirmPasswordFeedback"
					:success="!confirmPasswordFeedback
					&&
					!!confirmPassword"
					v-model="confirmPassword"/>
				<span class="text-red" v-text="confirmPasswordFeedback"/>

			</v-card-text>

			<v-card-actions>
				<v-spacer/>
				<span class="text-red mr-3" v-text="errorText"/>
				<v-btn v-text="'Cancel'" @click="close" />
				<v-btn color="primary" v-text="'Create Account'" :disabled="!isFormValid" @click="createAccount" />
			</v-card-actions>

		</v-card>

	</v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	props: {
		visible: {
			type: Boolean
		}
	},
	data() {
		return {
			firstName: null,
			lastName: null,
			email: null,
			password: null,
			confirmPassword: null,
			errorText: null
		};
	},
	computed: {
		isFormValid() {
			return (
				this.email
				&& this.firstName
				&& this.lastName
				&& this.password
				&& this.password === this.confirmPassword
			);
		},
		confirmPasswordFeedback() {
			if (
				!this.confirmPassword
				|| this.password === this.confirmPassword
			) return null;
			return 'Passwords must match.';
		}
	},
	methods: {
		...mapActions({
			postNewAccount: 'account/signUp'
		}),
		async createAccount() {
			try {
				await this.postNewAccount({
					email: this.email,
					password: this.password,
					firstName: this.firstName,
					lastName: this.lastName
				});
				this.close();
			} catch (err) {
				this.errorText = err.message;
			}
		},
		close() {
			this.$emit('close');
			this.clearData();
		},
		clearData() {
			this.firstName = null;
			this.lastName = null;
			this.email = null;
			this.password = null;
			this.confirmPassword = null;
			this.errorText = null;
		}
	}
};
</script>

<style lang="scss">

.CreateAccount {
	width: 60rem;

	&__formGroup {
		padding-bottom: 2rem;

		.invalid-feedback {
			position: absolute;
		}

		.col-form-label {
			text-align: left;
		}
	}
}

</style>
