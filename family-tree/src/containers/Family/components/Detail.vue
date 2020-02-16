<template>
	<section>

		<b-button
			variant="primary"
			class="mb-3"
			v-text="'Edit Member'"
			@click="onEditMemberButtonClick"/>

		<object-card
			class="mb-3"
			:object="member"/>

		<member-modal
			:visible="isMemberModalVisible"
			mode="edit"
			:id="id"
			@close="onMemberModalClose"
			@submit="fetch"/>

	</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MemberModal from './Member.modal';
import ObjectCard from './ObjectCard';

export default {
	components: {
		MemberModal,
		ObjectCard
	},
	props: {
		doFetch: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			id: null,
			isMemberModalVisible: false
		};
	},
	computed: {
		...mapGetters({
			member: 'family/member'
		})
	},
	methods: {
		...mapActions({
			fetchMember: 'family/fetchMember'
		}),
		async fetch() {
			await this.fetchMember({ id: this.id });
		},
		onEditMemberButtonClick() {
			this.isMemberModalVisible = true;
		},
		onMemberModalClose() {
			this.isMemberModalVisible = false;
		}
	},
	created() {
		this.id = this.$route.params.id;
		if (this.doFetch) this.fetch();
	}
};
</script>
