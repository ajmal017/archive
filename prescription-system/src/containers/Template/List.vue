<template>
	<div class="TemplateList">

		<section class="App__info mb-3">

			<v-btn
				class="m-0"
				:to="{ query: { create: null } }">
				<v-icon small class="mr-1">add</v-icon>
				New Template App
			</v-btn>

		</section>

		<v-tabs
			color="secondary"
			slider-color="primary"
			class="w-100"
			v-model="currentTab">

			<v-tab v-for="n in 2" :key="n" ripple>
				<h4 v-if="n === 1">My Templates</h4>
				<h4 v-if="n === 2">All Templates</h4>
			</v-tab>

			<v-tab-item v-for="n in 2" :key="n">
				<list
					name="Templates"
					:items="templateItems"
					:total="templatesCount"
					:options="{ currentPage, perPage }"
					:isLoading="isLoading"
					@table-change="onListTableChange"
					@item-click="goToDetail"/>
			</v-tab-item>

		</v-tabs>

		<edit-modal
			:visible="isEditModalVisible"
			@close="onEditModalClose"
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
import List from '../../components/List';
import EditModal from './EditModal';
import DetailModal from './DetailModal';

export default {
	components: {
		List,
		EditModal,
		DetailModal
	},
	data() {
		return {
			isLoading: false,
			perPage: 5,
			selectedTemplate: null,
			currentPage: 1,
			currentTab: 0
		}
	},
	computed: {
		...mapGetters({
			templates: 'template/templates',
			templatesCount: 'template/count',
			account: 'account/account'
		}),
		templateItems() {
			return this.templates.map(t => {
				const dateText = `Created - ${formatDate(t.createdAt)}`;
				return {
					_id: t._id,
					createdAt: t.createdAt,
					title: t.name,
					subTitle: t.author.name,
					text: t.description,
					chips: [{ text: dateText }]
				}
			});
		},
		isEditModalVisible() {
			return (
				this.$route.query.create === null ||
				this.$route.query.editId !== undefined
			);
		},
		isDetailModalVisible() {
			return this.$route.query.id !== undefined;
		}
	},
	methods: {
		...mapActions({
			fetchTemplates: 'template/find'
		}),
		formatDate: formatDate,
		async fetch() {
			this.isLoading = true;
			const options = {
				limit: this.perPage,
				skip: this.perPage * (this.currentPage - 1)
			};
			if (this.currentTab === 0) options.query = { authorId: this.account._id };
			await this.fetchTemplates(options);
			this.isLoading = false;
		},
		goToDetail(item) {
			this.$router.push({ query: { id: item._id, } });
		},
		goToEdit(item) {
			this.$router.push({ query: { editId: item._id, } });
		},
		onListTableChange({ currentPage, perPage }) {
			this.currentPage = currentPage;
			this.perPage = perPage;
		},
		onEditModalClose() {
			this.$router.push({ query: { create: undefined, editId: undefined } });
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
		perPage: 'fetch',
		currentTab() {
			this.perPage = 5;
			this.currentPage = 1;
			this.fetch();
		}
	}
}
</script>


<style lang="scss">
@import '../../styles/index.scss';

.TemplateList {
	@extend .flexbox;
	padding: 1rem;

	&__table {
		tbody {
			cursor: pointer;
		}
	}
}

</style>

