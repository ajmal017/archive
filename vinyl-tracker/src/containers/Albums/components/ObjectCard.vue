<template>
	<b-card class="ObjectCard"
		no-body>

		<b-list-group flush>

			<b-list-group-item
				v-for="fact in facts"
				:key="fact.property">

				<b class="ObjectCard__item"
					v-text="fact.property"/>

				<span
					class="ObjectCard__item"
					v-text="fact.value"/>

			</b-list-group-item>

		</b-list-group>

	</b-card>
</template>

<script>
export default {
	props: {
		object: {
			type: Object,
			required: true
		}
	},
	computed: {
		facts() {
			const properties = Object.keys(this.object);
			const facts = properties.map(property => ({
				property,
				value: this.object[property]
			}));
			return facts;
		}
	}
};
</script>

<style lang="scss">
.ObjectCard {
	position: relative;

	&__item {
		clear: both;
		display: block;
	}
}
</style>
