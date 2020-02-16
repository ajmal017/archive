<template>
	<div class="Landing">

		<section class="Filters App__inner">

			<b-form-group
				class="Filters__filter"
				label="Filter by Week"
				label-for="filterWeek">
				<b-form-select
					id="filterWeek"
					v-model="filterWeek"
					:options="weekFilterOptions"/>
			</b-form-group>

			<b-form-group
				class="Filters__filter"
				label="Filter by Match"
				label-for="filterMatch">
				<b-form-select
					id="filterMatch"
					v-model="filterMatch"
					:options="matchFilterOptions"/>
			</b-form-group>

		</section>


		<b-card
			v-for="match in matches"
			:key="match.match"
			class="Tree__card"
			:title="`Week: ${match.week}`"
			:sub-title="`Match: ${match.match}`">

			<fortnite-tree
				:kills="match.kills"
				:players="match.players"/>

		</b-card>

	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import FortniteTree from '../../components/FortniteTree';

export default {
	components: {
		FortniteTree
	},
	data() {
		return {
			filterWeek: null,
			filterMatch: null,
			weekFilterOptions: [
				{ text: 'All Weeks', value: null },
				{ text: 'Week 4', value: 4 }
			],
			matchFilterOptions: [
				{ text: 'All Matches', value: null },
				{ text: 'Match 1', value: 1 },
				{ text: 'Match 2', value: 2 },
				{ text: 'Match 3', value: 3 },
				{ text: 'Match 4', value: 4 },
				{ text: 'Match 5', value: 5 },
				{ text: 'Match 6', value: 6 }
			]
		};
	},
	computed: {
		...mapGetters({
			matchesData: 'match/matchesData'
		}),
		matches() {
			let matches = this.matchesData[0].matches;
			if (this.filterWeek !== null) {
				matches = matches.filter(m => m.week === this.filterWeek);
			}
			if (this.filterMatch !== null) {
				matches = matches.filter(m => m.match === this.filterMatch);
			}
			return matches;
		}
	}
};
</script>

<style lang="scss">

.Filters {
	margin-top: 2rem;

	&__filter {
		width: 25%;
		margin-right: 1rem;
		display: inline-block;

		&:last-of-type {
			margin-right: 0;
		}
	}
}

.Tree {

	&__card {
		width: 100%;
	}

}

</style>

