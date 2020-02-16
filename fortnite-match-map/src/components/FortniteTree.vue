
<template>

	<tree-component
		v-if="match"
		class="FortniteTree"
		:data="match"
		node-text="name"
		layoutType="euclidean"
		type="tree"
		:radius="2"
		:zoomable="true"/>

</template>

<script>
import { tree as TreeComponent } from 'vued3tree';

export default {
	components: {
		TreeComponent
	},
	props: {
		kills: {
			type: Array,
			required: true
		},
		players: {
			type: Array,
			required: true
		}
	},
	computed: {
		match() {
			return this.buildTreeForData();
		},
		otherCausesOfDeath() {
			const extraKills = this.kills.filter(k => typeof k[1] !== 'number');
			const otherCausesOfDeath = Array.from(new Set(extraKills.map(k => k[1])));
			return otherCausesOfDeath;
		}
	},
	methods: {
		/**
		 * Function to build tree data for Fortnite Match
		 * - takes in a range from https://docs.google.com/spreadsheets/d/1PbaDtpUbvGf8zI2yySUF9nOq5LakPdVkryrxScW9diQ/edit#gid=0
		 * - returns tree object
		 */
		buildTreeForData() {
			const winningKill = this.kills.find(k => k[1] === null);
			if (!winningKill) return false;
			const winnerId = winningKill[0];
			const winner = this.players.find(p => p._id === winnerId);
			if (!winner) return false;
			const treeForWinner = this.buildTreeRecursive(winner);
			const extraTrees = [];
			this.otherCausesOfDeath.forEach(CoD => {
				if (CoD === null) return;
				const tree = this.buildTreeRecursive({ _id: CoD, name: CoD });
				extraTrees.push(tree);
			});
			// here
			return {
				name: treeForWinner.name,
				children: [
					...treeForWinner.children,
					...extraTrees
				]
			};
		},
		buildTreeRecursive(winner) {
			const childrenIds = this.kills.filter(k => (k[1] === winner._id)).map(k => k[0]);
			const children = childrenIds.map(c => this.players.find(p => p._id === c));
			const tree = {
				name: winner.name,
				children: [],
				id: winner._id
			};
			tree.children = children.map(c => this.buildTreeRecursive(c));
			return tree;
		}
	}
};
</script>

<style lang="scss">

.FortniteTree {
	width: 100%;
	height: 500px;

}

</style>

