<template>
	<v-dialog
		content-class="SignIn"
		:value="visible"
		@input="close">

		<v-card>

			<v-card-title v-text="'Sign In'"/>

			<v-card-text @keyup.enter="login">

				<v-text-field label="Enter your email:" type="email" v-model.trim="email"/>
				<v-text-field label="Enter your password:" type="password" v-model.trim="password"/>

				<p class="text-danger" v-text="errorText"/>

			</v-card-text>

			<v-card-actions>
				<v-spacer/>
				<v-btn v-text="'Cancel'" @click="close" />
				<v-btn color="primary" v-text="'Login'" :disabled="!isFormValid" @click="login" />
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
			email: null,
			emailFeedback: null,
			password: null,
			passwordFeedback: null,
			errorText: null
		}
	},
	computed: {
		isFormValid() {
			return (
				this.email &&
				this.password
			);
		}
	},
	methods: {
		...mapActions({
			postLogin: 'account/logIn'
		}),
		async login() {
			try {
				await this.postLogin({
					username: this.email,
					password: this.password
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
			this.email = null;
			this.emailFeedback = null;
			this.password = null;
			this.passwordFeedback = null;
			this.errorText = null;
		}
	}
}
</script>

<style lang="scss">

.SignIn {
	width: 40rem;

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
