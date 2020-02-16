<template>
	<div :class="`Counter Counter--${size}`"/>
</template>

<script>
import FlipCounterJS from 'flip-counter-js';
import 'flip-counter-js/dist/css/style.min.css';

export default {
	props: {
		value: {
			type: Number,
			required: true,
		},
		size: {
			type: String,
			default: 'normal'
		},
	},
	data() {
		return {
			counter: null
		};
	},
	computed: {
		flipCounterSize() {
			let size = 'md';
			switch (this.size) {
			case 'small':
				size = 'sm';
				break;
			}
			return size;
		}
	},
	mounted() {
		this.counter = new FlipCounterJS(this.$el, {
			start: this.value,
			size: this.flipCounterSize,
			speed: 0
		});
	}
};
</script>

<style lang="scss">

.Counter {

	.fc-size-md.fc .dcc .back .digit {
		padding-bottom: 3.4rem;
	}

	&--small {

		.fc-size-sm.fc .dcc .back .digit {
			padding-bottom: 1.65rem;
		}
	}
}

</style>

