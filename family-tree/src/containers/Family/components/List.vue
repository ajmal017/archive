<template>
	<section>

		<b-table
			:items="members"
			:fields="fields"
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			striped>

			<template slot="actions" slot-scope="data">
				<b-button
					:href="getLinkForMember(data)"
					variant="outline-primary"
					v-text="'Tree View'"/>
			</template>

		</b-table>

	</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	props: {
		doFetch: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			selectedId: null,
			sortBy: 'fname',
			sortDesc: false,
			fields: [
				{ key: 'fname', label: 'First Name', sortable: true },
				{ key: 'lname', label: 'Last Name', sortable: true },
				{ key: 'sex', label: 'Sex', sortable: true },
				{ key: 'actions', label: 'Actions' }
			]
		};
	},
	computed: {
		...mapGetters({
			members: 'family/members'
		})
	},
	methods: {
		...mapActions({
			fetchMembers: 'family/fetchMembers'
		}),
		getLinkForMember(data) {
			const id = data.item._id;
			return `/#/tree/${id}`;
		}
	},
	created() {
		if (this.doFetch) this.fetchMembers();
	}
};
</script>
