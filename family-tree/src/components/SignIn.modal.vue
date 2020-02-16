<template>
	<b-modal
		title="Sign In"
		:visible="visible"
		class="App"
		@hidden="emitClose">

		<b-form-group
			id="fieldsetHorizontal"
			horizontal
			label="Email"
			label-for="signInEmail">
			<b-form-input
				id="signInEmail"
				v-model="email"
				:state="isEmailValid"/>
		</b-form-group>
		<b-form-group
			id="fieldsetHorizontal"
			horizontal
			label="Password"
			label-for="signInPassword">
			<b-form-input
				id="signInPassword"
				v-model="password"
				type="password"
				:state="isPasswordValid"/>
		</b-form-group>

		<template slot="modal-footer">
			<b-button
				v-text="'Cancel'"
				@click="onCancelButtonClick"/>
			<b-button
				variant="primary"
				v-text="'Sign In'"
				:disabled="!isFormValid"
				@click="onSignInButtonClick"/>
		</template>
	</b-modal>
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
			password: null
		};
	},
	computed: {
		isEmailValid() {
			return !!this.email;
		},
		isPasswordValid() {
			return !!this.password;
		},
		isFormValid() {
			return this.isEmailValid && this.isPasswordValid;
		}
	},
	methods: {
		...mapActions({
			signIn: 'auth/signIn'
		}),
		async onSignInButtonClick() {
			await this.signIn({
				email: this.email,
				password: this.password
			});
			this.emitClose();
		},
		onCancelButtonClick() {
			this.emitClose();
		},
		emitClose() {
			this.$emit('close');
		}
	}
};
</script>
