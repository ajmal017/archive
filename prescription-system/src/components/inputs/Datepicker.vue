<template>
	<section class="DatepickerInput" :class="{ 'TextInput--dark': theme === 'dark' }">

		<datetime :type="type" v-model="inputVal" class="theme-primary">
			<label slot="before" v-text="label"/>
		</datetime>

	</section>
</template>

<script>
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';


export default {
	components: {
		Datetime
	},
	props: {
		value: {
			required: true
		},
		label: {
			type: String,
			default: 'Select a date'
		},
		theme: {
			type: String
		},
		datetime: {
			type: Boolean
		}
	},
	data() {
		return {
			inputVal: this.value
		}
	},
	computed: {
		type() {
			if (this.datetime) return 'datetime';
			return '';
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

.DatepickerInput {
	width: max-content;
	margin: 0;

	label, input {
		cursor: pointer;
	}

	label {
		color: $grey;
		display: block;
	}

	&--dark {

		label { color: $white; }

	}

	.theme-primary .vdatetime-popup__header{
		background: $blue-dark;
	}

	.theme-primary .vdatetime-calendar__month__day--selected > span > span,
	.theme-primary .vdatetime-calendar__month__day--selected:hover > span > span
	{
		background: $blue-light;
	}

	.theme-primary .vdatetime-year-picker__item--selected,
	.theme-primary .vdatetime-time-picker__item--selected,
	.theme-primary .vdatetime-popup__actions__button {
		color: $blue-light;
	}

}

</style>
