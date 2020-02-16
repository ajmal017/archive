<template>
	<section class="ModuleList">

		<v-list v-if="modules.length > 0" class="ModuleList__list">
			<v-list-tile
				class="ModuleList__module"
				:class="{ 'ModuleList__module--selected': selectedIndex === i }"
				v-for="(m, i) in modules"
				:key="i"
				@click="onItemClick(i)">

				<v-list-tile-content class="ModuleList__module__inner">

					<span class="ModuleList__module__type" v-text="getModuleLabel(m)"/>

					<v-list-tile-title class="ModuleList__module__title" v-text="m.name"/>

					<span v-if="editable" @click="$emit('deleteIndex', i)">
						<icon class="cursor-pointer" name="trash-alt" />
					</span>
				</v-list-tile-content>

			</v-list-tile>
		</v-list>

	</section>
</template>

<script>
import ModuleTypes from '../../../../lib/ModuleTypes.js';

export default {
	props: {
		modules: {
			type: Array,
			required: true
		},
		editable: {
			type: Boolean
		},
		selectable: {
			type: Boolean
		},
		selectedIndex: {
			required: false
		}
	},
	data() {
		return {
			moduleTypeOptions: ModuleTypes
		}
	},
	methods: {
		onItemClick(i) {
			if (!this.selectable) return;
			this.$emit('select', i);
		},
		getModuleLabel(m) {
			return this.moduleTypeOptions.find(mt => mt.value === m.type).text
		}
	}
}
</script>

<style lang="scss">
@import "../../../styles/index.scss";

.ModuleList {

	&__list {
		padding: 0;
		border-radius: 0.2rem;
		background: transparent !important;
	}

	&__module {
		height: fit-content;
		flex-direction: row;
		margin-bottom: 0.5rem;
		background: $white;

		&--selected {
			background-color: $blue-dark;
			color: $blue-light;

			* { transition: 0s !important; }
		}

		.v-list__tile {
			padding: 1rem;
			height: fit-content;
		}

		&__inner {
			display: flex;
			flex-direction: row;
			height: fit-content;
			padding-top: 2rem;
		}

		&__type {
			position: absolute;
			top: 1rem;
			left: 1rem;
			text-transform: uppercase;
			letter-spacing: 0.1rem;
			font-size: 0.8rem;
		}
	}
}
</style>

