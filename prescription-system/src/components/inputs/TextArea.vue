<template>

	<v-textarea
		class="TextareaInput"
		:class="{ 'TextareaInput--dark': isDarkTheme }"
		v-model="inputVal"
		:label="label"
		:disabled="disabled"
		:dark="isDarkTheme"
		:light="isLightTheme"
		:color="computedColor"
		solo
		auto-grow/>

</template>

<script>
export default {
	props: {
		value: {
			required: true
		},
		label: {
			type: String
		},
		disabled: {
			type: Boolean
		},
		theme: {
			type: String,
			default: 'light'
		},
		color: {
			type: String
		}
	},
	data() {
		return {
			inputVal: this.value
		}
	},
	computed: {
		computedColor() {
			if (this.color) return this.color;
			if (this.isDarkTheme) return 'white';
			if (this.isLightTheme) return 'grey';
		},
		isDarkTheme() {
			return this.theme === 'dark';
		},
		isLightTheme() {
			return this.theme ==='light';
		}
	},
	watch: {
		inputVal(v) {
			this.$emit('input', v);
		},
		value(v) {
			this.inputVal = v;
		}
	}
}
</script>

<style lang="scss">
@import "../../styles/index.scss";

.TextareaInput {

	label {
		color: $grey !important;
	}

	&--dark {

		label {
			color: $white !important;
		}

		.v-input__slot {
			background: darken($grey-dark, 17) !important;
		}
	}
}

</style>
