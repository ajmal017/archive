<template>
	<b-modal
		title="Create Account"
		:visible="visible"
		class="App"
		@hidden="emitClose">

		<b-form-group
			id="fieldsetHorizontal"
			horizontal
			label="Email"
			label-for="createAccountUsername">
			<b-form-input
				id="createAccountUsername"
				type="email"
				v-model="email"
				:state="isEmailnameValid"/>
		</b-form-group>
		<b-form-group
			id="fieldsetHorizontal"
			horizontal
			label="Password"
			label-for="createAccountPassword">
			<b-form-input
				id="createAccountPassword"
				v-model="password"
				type="password"
				:state="isPasswordValid"/>
		</b-form-group>
		<b-form-group
			id="fieldsetHorizontal"
			horizontal
			label="Confirm Password"
			label-for="createAccountConfirmPassword">
			<b-form-input
				id="createAccountConfirmPassword"
				v-model="passwordConfirm"
				type="password"
				:state="isPasswordConfirmValid"/>
		</b-form-group>

		<p
			class="CreateAccount__invalidText"
			v-text="invalidText"/>

		<template slot="modal-footer">
			<b-button
				v-text="'Cancel'"
				@click="onCancelButtonClick"/>
			<b-button
				variant="primary"
				v-text="'Create Account'"
				:disabled="!isFormValid"
				@click="onCreateAccountButtonClick"/>
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
			password: null,
			passwordConfirm: null,
			invalidText: null
		};
	},
	computed: {
		isEmailnameValid() {
			return !!this.email;
		},
		isPasswordValid() {
			return !!this.password;
		},
		isPasswordConfirmValid() {
			if (!this.isPasswordValid) return false;
			return this.password === this.passwordConfirm;
		},
		isFormValid() {
			return this.isEmailnameValid && this.isPasswordValid && this.isPasswordConfirmValid;
		}
	},
	methods: {
		...mapActions({
			createAccount: 'auth/createUser',
			signIn: 'auth/signIn'
		}),
		async onCreateAccountButtonClick() {
			try {
				await this.createAccount({
					email: this.email,
					password: this.password
				});
				this.signIn({
					email: this.email,
					password: this.password
				});
				this.invalidText = null;
				this.emitClose();
			} catch (err) {
				this.invalidText = err.message;
			}
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

<style lang="scss">
@import '../settings';

$invalidColour: $Danger-Colour;
$textColour: $Text-Colour;

.CreateAccount {
	color: $textColour;

	&__invalidText {
		color: $invalidColour;
	}
}

</style>
