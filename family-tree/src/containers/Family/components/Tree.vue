<template>
	<section class="Tree">

		<div class="App__inner">
			<b-button
				variant="primary"
				class="mb-3"
				v-text="'Add Relative'"
				disabled/>
			<b-button
				variant="secondary"
				class="mb-3"
				v-text="'Member Details'"
				:href="detailPageHref"/>
		</div>

		<tree
			class="Tree__tree"
			:data="memberTree"
			node-text="fullName"
			layoutType="euclidean"/>

	</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { clone } from 'lodash';
import { tree } from 'vued3tree';


export default {
	components: {
		tree
	},
	data() {
		return {
			id: null
		};
	},
	computed: {
		...mapGetters({
			member: 'family/member',
			members: 'family/members'
		}),
		detailPageHref() {
			return `/#/detail/${this.id}`;
		},
		memberTree() {
			// #Todo: make work for more than one layer
			const memberTree = clone(this.member);
			memberTree.children = this.members.filter(m => m.motherId === this.member._id || m.fatherId === this.member._id);
			return memberTree;
		}
	},
	methods: {
		...mapActions({
			fetchMember: 'family/fetchMember',
			fetchMembers: 'family/fetchMembers'
		}),
		async fetch() {
			this.fetchMembers();
			await this.fetchMember({ id: this.id });
		}
	},
	created() {
		this.id = this.$route.params.id;
		this.fetch();
	}
};
</script>

<style lang="scss">

.Tree {

	&__tree {
		width: 100%;
		height: 800px;
	}
}
</style>
