<template>
	<div class="PrescriptionList">

		<list
			name="Prescriptions"
			:items="prescriptionItems"
			:total="prescriptionsCount"
			:options="{ currentPage, perPage }"
			:isLoading="isLoading"
			@table-change="onListTableChange"
			@item-click="goToDetail"/>

		<create-modal
			:visible="isCreateModalVisible"
			@close="onCreateModalClose"
			@submit="fetch"/>

		<detail-modal
			:visible="isDetailModalVisible"
			@close="onDetailModalClose"/>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { throttle as _throttle } from 'lodash';
import { formatDate } from '../../../lib/common';
import Clients from '../../../lib/Clients';
import List from '../../components/List';
import CreateModal from './CreateModal';
import DetailModal from './DetailModal';

export default {
	components: {
		List,
		CreateModal,
		DetailModal
	},
	data() {
		return {
			isLoading: false,
			perPage: 5,
			currentPage: 1,
			clientOptions: Clients
		}
	},
	computed: {
		...mapGetters({
			prescriptions: 'prescription/prescriptions',
			prescriptionsCount: 'prescription/count',
			account: 'account/account'
		}),
		prescriptionItems() {
			return this.prescriptions.map(p => {
				const dateText = `Started - ${formatDate(p.startDate)}`;
				let startedText = 'Upcoming';
				let startedColour = 'yellow';
				if (new Date(p.startDate) < new Date()) {
					startedText = 'Started';
					startedColour = 'green';
				}
				if (new Date(p.endDate) < new Date()) {
					startedText = 'Finished';
					startedColour = 'red';
				}
				const clientName = this.clientOptions.find(c => c.value === p.clientId).text;
				const subtitle = `
					<p>${p.author.name}</p>
					<p>Client: ${clientName}</p>
				`
				return {
					_id: p._id,
					createdAt: p.createdAt,
					title: p.name,
					subTitle: subtitle,
					text: p.description,
					chips: [
						{ text: startedText, colour: startedColour },
						{ text: dateText }
					]
				}
			});
		},
		isCreateModalVisible() {
			return this.$route.query.create === null;
		},
		isDetailModalVisible() {
			return this.$route.query.id != null;
		}
	},
	methods: {
		...mapActions({
			fetchPrescriptions: 'prescription/find'
		}),
		formatDate: formatDate,
		async fetch() {
			this.isLoading = true;
			await this.fetchPrescriptions({
				limit: this.perPage,
				skip: this.perPage * (this.currentPage - 1),
				query: { authorId: this.account._id }
			});
			this.isLoading = false;
		},
		goToDetail(item) {
			this.$router.push({ query: { id: item._id, } });
		},
		onListTableChange({ currentPage, perPage }) {
			this.currentPage = currentPage;
			this.perPage = perPage;
		},
		onCreateModalClose() {
			this.$router.push({ query: { create: undefined } });
		},
		onDetailModalClose() {
			this.$router.push({ query: { id: undefined } });
		}
	},
	created() {
		this.fetch();
	},
	watch: {
		currentPage: 'fetch',
		perPage: 'fetch'
	}
}
</script>


<style lang="scss">
@import '../../styles/index.scss';

.PrescriptionList {
	@extend .flexbox;
	padding: 1rem;

	&__table {
		tbody {
			cursor: pointer;
		}
	}
}

</style>
