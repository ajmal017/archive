<template>
	<div class="GeoChart">
		<GChart
			v-show="isReady"
			type="GeoChart"
			:data="data"
			:options="chartOptions"
			:settings="chartSettings"
			@ready="onChartReady"/>
		<loader v-if="!isReady"/>
	</div>
</template>

<script>
import config from '../config';
import theme from '../styles/theme';
import { GChart } from 'vue-google-charts';
import Loader from './Loader';

export default {
	components: {
		GChart,
		Loader
	},
	props: {
		data: {
			type: Array,
			required: true
		},
		region: {
			type: String
		},
		title: {
			type: String
		},
		subttitle: {
			type: String
		}
	},
	data() {
		return {
			isReady: false,
			chartSettings: {
				packages: [ 'geochart'],
				mapsApiKey: config.google.mapsKey
			},
			defaultOptions: {
				displayMode: 'region',
				legend: false,
				sizeAxis: {
					minValue: 0
				},
				colorAxis: {
					colors: [theme.primary]
				},
				backgroundColor: {
					fill: theme.blue,
					stroke: theme.primary,
					strokeWidth: 2
				}
			}
		};
	},
	computed: {
		width() {
			if (this.$vuetify.breakpoint.mdAndUp) return 500;
			return 200;
		},
		chartOptions() {
			return {
				...this.defaultOptions,
				width: this.width,
				region: this.region,
				chart: {
					title: this.title,
					subtitle: this.subttitle
				}
			};
		}
	},
	methods: {
		onChartReady() {
			this.isReady = true;
		}
	}
};
</script>

<style lang="scss">

.GeoChart {
	width: 100%;
	display: flex;
	align-items: center;
	display: flex;
	justify-content: center;
}
</style>

