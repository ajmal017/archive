<template>
	<div class="PaymentList">

		<section class="App__info mb-3">

			<v-btn
				class="m-0"
				:to="{ query: { create: null } }">
				<v-icon small class="mr-1">add</v-icon>
				New Payment
			</v-btn>

		</section>

		<list
			name="Payments"
			:items="paymentItems"
			:total="paymentCount"
			:options="{ currentPage, perPage }"
			:isLoading="isLoading"
			@table-change="onListTableChange"
			@item-click="goToDetail"/>

		<detail-modal
			:visible="isDetailModalVisible"
			@close="onDetailModalClose"
			@submit="fetch"/>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import List from '../../components/List.vue';
import DetailModal from './DetailModal.vue';


const formatDate = (dateString) => {
	const formatString = 'MMM DD, YYYY';
	return moment(dateString).format(formatString);
};

export default {
	components: {
		List,
		DetailModal
	},
	data() {
		return {
			isLoading: false,
			perPage: 5,
			currentPage: 1
		};
	},
	computed: {
		...mapGetters({
			payments: 'payment/payments',
			paymentCount: 'payment/count'
		}),
		paymentItems() {
			return this.payments.map((p) => {
				const chipText = `Created - ${formatDate(p.createdAt)}`;
				return {
					...p,
					title: `Amount: £${p.amount}`,
					subTitle: p.authorName,
					text: p.description,
					chipText
				};
			});
		},
		isDetailModalVisible() {
			return (
				this.$route.query.create === null
				|| this.$route.query.id !== undefined
			);
		}
	},
	methods: {
		...mapActions({
			fetchDocumentTypeB: 'payment/find'
		}),
		async fetch() {
			this.isLoading = true;
			await this.fetchDocumentTypeB({
				limit: this.perPage,
				skip: this.perPage * (this.currentPage - 1)
			});
			this.isLoading = false;
		},
		goToDetail(item) {
			this.$router.push({ query: { id: item.id } });
		},
		onListTableChange({ currentPage, perPage }) {
			this.currentPage = currentPage;
			this.perPage = perPage;
		},
		onDetailModalClose() {
			this.$router.push({ query: { create: undefined, id: undefined } });
		}
	},
	created() {
		this.fetch();
	},
	watch: {
		currentPage: 'fetch',
		perPage: 'fetch'
	}
};
</script>


<style lang="scss">
@import '../../styles/index.scss';

.PaymentList {
	display: flex;
	padding: 1rem;

	&__table {
		tbody {
			cursor: pointer;
		}
	}
}

</style>
