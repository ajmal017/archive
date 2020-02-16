<template>
	<v-dialog
		content-class="CreateAccount"
		:value="visible"
		@input="close">

		<v-card>

			<v-card-title v-text="'Create Account'" @keyup.enter="createAccount"/>

			<v-card-text>

				<v-select label="Title:" v-model="title" :items="titleOptions"/>

				<v-text-field label="First Name:" v-model.trim="firstName"/>

				<v-text-field label="Last Name:" v-model.trim="lastName"/>

				<v-text-field label="Occupation:" v-model.trim="occupation"/>

				<v-text-field label="Email:" type="email" v-model.trim="email"/>

				<v-text-field label="Password:" type="password" v-model="password"/>

				<v-text-field label="Confirm Password:" type="password" :error="!!confirmPasswordFeedback" :success="!confirmPasswordFeedback && !!confirmPassword" v-model="confirmPassword"/>
				<span class="text-danger" v-text="confirmPasswordFeedback"/>

			</v-card-text>

			<v-card-actions>
				<v-spacer/>
				<v-btn v-text="'Cancel'" @click="close" />
				<v-btn color="primary" v-text="'Create Account'" :disabled="!isFormValid" @click="createAccount" />
			</v-card-actions>

		</v-card>

		<p class="text-danger" v-text="errorText"/>

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
			titleOptions: [
				"Dr", "Mr", "Ms", "Mrs"
			],
			title: null,
			firstName: null,
			lastName: null,
			occupation: null,
			email: null,
			password: null,
			confirmPassword: null,
			errorText: null
		}
	},
	computed: {
		isFormValid() {
			return (
				this.email &&
				this.title &&
				this.firstName &&
				this.lastName &&
				this.occupation &&
				this.password &&
				this.password === this.confirmPassword

			)
		},
		confirmPasswordFeedback() {
			if (
				!this.confirmPassword ||
				this.password === this.confirmPassword
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
					username: this.email,
					password: this.password,
					title: this.title,
					occupation: this.occupation,
					firstName: this.firstName,
					lastName: this.lastName
				});
				this.$router.push('/');
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
			this.title = null;
			this.firstName = null;
			this.lastName = null;
			this.occupation = null;
			this.email = null;
			this.password = null;
			this.confirmPassword = null;
			this.errorText = null;
		}
	},
}
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
