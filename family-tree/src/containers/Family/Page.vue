<template>
	<div class="Family">

		<router-view
			class="App__inner pt-3"
			v-if="user"/>

	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppLoader from '../../components/AppLoader';
import List from './components/List';

export default {
	components: {
		AppLoader,
		List
	},
	computed: {
		...mapGetters({
			user: 'auth/user'
		})
	},
	methods: {
		...mapActions({
			fetchMembers: 'family/fetchMembers'
		}),
		async fetch() {
			if (!this.user) return;
			await this.fetchMembers();
		}
	},
	created() {
		this.fetch();
	}
};
</script>

