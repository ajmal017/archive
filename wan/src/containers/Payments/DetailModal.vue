<template>

	<modal-layout :visible="visible" @close="$emit('close')">

		<template v-if="isLoading" slot="sidebar" >
			<v-progress-circular indeterminate/>
		</template>

		<template v-else>

			<v-card-title primary-title>
				<div class="headline">New Payment</div>
			</v-card-title>

			<v-card-text class="CreateModal__input" @keyup.enter="submit">
				<v-text-field
					label="Amount (£)"
					v-model="amount"
					:disabled="!!editPaymentId"/>
			</v-card-text>

			<v-card-actions>
				<v-spacer/>
				<v-btn v-text="'Cancel'" @click="$emit('close')" />
				<v-btn v-if="!editPaymentId" color="primary" v-text="'Add'" :disabled="!isPaymentValid || isSubmitting" @click="submit" />
			</v-card-actions>

		</template>

	</modal-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ModalLayout from '../../components/ModalLayout.vue';


export default {
	components: {
		ModalLayout
	},
	props: {
		visible: {
			type: Boolean
		}
	},
	data() {
		return {
			isLoading: false,
			isSubmitting: false,
			errorText: null,
			amount: null
		};
	},
	computed: {
		...mapGetters({
			account: 'account/account',
			payment: 'payment/payment'
		}),
		isPaymentValid() {
			return (!!this.amount);
		},
		editPaymentId() {
			return this.$route.query.id;
		}
	},
	methods: {
		...mapActions({
			submitPayment: 'payment/submit',
			fetchPayment: 'payment/get'
		}),
		async submit() {
			this.isSubmitting = true;
			const data = {
				amount: parseInt(this.amount, 10)
			};
			try {
				const result = await this.submitPayment(data);
				this.$emit('submit');
				this.$router.push({
					query: {
						id: result.data
					}
				});
			} catch (err) {
				this.errorText = err.message;
			} finally {
				this.isSubmitting = false;
			}
		},
		async fetch() {
			if (!this.editPaymentId) return;
			this.isLoading = true;
			try {
				await this.fetchPayment(this.editPaymentId);
				this.amount = this.payment.amount;
			} catch (e) {
				this.$router.push({ query: { id: undefined } });
			} finally {
				this.isLoading = false;
			}
		},
		clearData() {
			this.amount = null;
		}
	},
	watch: {
		visible: ['clearData', 'fetch']
	}
};
</script>

<style lang="scss">

.CreateModal {

	&__input {
		height: 100%;
	}

}

</style>
