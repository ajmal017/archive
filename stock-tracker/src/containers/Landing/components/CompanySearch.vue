<template>
	<div class="CompanySearch">

		<b-input
			class="Home__search__term"
			v-model="searchTerm"
			ref="search"
			@keyup.enter.native="onEnterKeyUp"/>

		<b-button
			class="Home__search__button App--marginBottom"
			variant="primary"
			v-text="'Search'"
			@click.prevent="onButtonClicked"/>

		<object-card
			:object="company"
			v-if="companyLoaded"/>

		<app-loader v-else/>

	</div>
</template>

<script>
import { mapActions } from 'vuex';
import AppLoader from '../../../components/AppLoader';
import ObjectCard from '../../../components/ObjectCard';

export default {
	components: {
		AppLoader,
		ObjectCard
	},
	data() {
		return {
			company: null,
			companyLoaded: false,
			searchTerm: 'AAPL'
		};
	},
	methods: {
		...mapActions({
			getCompany: 'getCompany'
		}),
		async fetchSearchResult() {
			const result = await this.getCompany(this.searchTerm);
			this.company = result;
			this.companyLoaded = true;
		},
		onButtonClicked() {
			this.$nextTick();
			this.fetchSearchResult();
		},
		onEnterKeyUp() {
			this.$nextTick();
			this.fetchSearchResult();
		}
	},
	created() {
		this.fetchSearchResult();
	}
};
</script>
