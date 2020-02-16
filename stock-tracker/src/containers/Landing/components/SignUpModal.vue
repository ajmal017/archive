<template>
	<b-modal
		ref="signUpModal"
		title="Be the first to hear..."
		@ok="onConfirm"
		ok-title="Sign Up!"
		:ok-disabled="isConfirmDisabled">

		<b-form-group
			id="emailInputField"
			label="Enter your email"
			label-for="emailInput"
			:invalid-feedback="invalidText"
			valid-feedback="Nice! Just click that button"
			:state="validState">

			<b-form-input
				id="emailInput"
				:state="validState"
				type="email"
				placeholder="smartInvestor@money.biz"
				v-model.trim="email"
				@keyup.enter.prevent="onConfirm"/>

		</b-form-group>

	</b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	data() {
		return {
			email: ''
		};
	},
	computed: {
		...mapGetters({
			submitted: 'submitted'
		}),
		invalidText() {
			if (this.submitted) return 'Don\'t worry, we already have your email!';
			return 'We can\'t reach you without a valid email address...';
		},
		validState() {
			// inspired by: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
			// eslint-disable-next-line max-len
			const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(this.email).toLowerCase());
		},
		isConfirmDisabled() {
			return this.submitted || !this.validState;
		}
	},
	methods: {
		...mapActions({
			pushEmail: 'pushEmail'
		}),
		async onConfirm() {
			if (this.isConfirmDisabled) return;
			await this.pushEmail(this.email);
			this.email = '';
			this.$refs.signUpModal.hide();
		},
		openModal() {
			this.$refs.signUpModal.show();
		}
	},
	mounted() {
		this.email = '';
	}
};
</script>
