<template>
	<section class="Reach">

		<div class="Reach__row">
			<geo-chart
				class="Reach__geoChart"
				:data="geoChartData"
				:region="geoChartRegion"/>
			<div class="Reach__counters">
				<div
					class="Reach__counter"
					v-for="counter in counters"
					:key="counter.country">
					<label class="Reach__counter__label" v-text="counter.country"/>
					<pre class="Reach__counter__value" v-text="formatCount(counter.value)"/>
				</div>
			</div>
			<div class="Reach__total">
				<p>Total reach from TV and Radio</p>
				<span class="Reach__total__line"/>
				<pre class="Reach__total__value" v-text="total.toLocaleString()"/>
			</div>
		</div>
	</section>
</template>

<script>
import GeoChart from '../../../components/GeoChart';

export default {
	components: {
		GeoChart
	},
	data() {
		return {
			counters: [
				// add the "geoCountry" prop to include a count within the count of another property
				{ country: 'Somalia', value: 12660000 },
				{ country: 'Mali', value: 10473000 },
				{ country: 'Nigeria', value: 34470000 },
				{ country: 'Kenya', value: 23260727 },
				{ country: 'Sierra Leone', value: 6000000 },
				{ country: 'Gambia', value: 920000 },
				{ country: 'Senegal', value: 4041750 }
			],
			totalOverRide: 805335304,
			geoChartRegion: '002' // Africa: https://developers.google.com/chart/interactive/docs/gallery/geochart#Continent_Hierarchy
		};
	},
	computed: {
		geoChartData() {
			const data = this.counters.map((obj) => {
				const datum = [obj.country, obj.value, obj.geoCountry];
				return datum;
			});
			data.forEach((datum, i) => {
				if (!datum[2]) return;
				const match = data.find((d) => d[0] === datum[2]);
				match[1] += datum[1];
			});
			return [
				['country', 'reach'],
				...data.map((d) => [d[0], d[1]])
			];
		},
		total() {
			if (this.totalOverRide) return this.totalOverRide;
			let total = 0;
			this.counters.forEach((counter) => {
				total += counter.value;
			});
			return total;
		}
	},
	methods: {
		formatCount(count) {
			if (count < 1000) return count;
			if (count < 1000000) {
				const thousands = count / 1000;
				const thousandsRounded = Math.round(thousands * 10) / 10;
				return `${thousandsRounded} thousand`;
			};
			const millions = count / 1000000;
			const millionsRounded = Math.round(millions * 10) / 10;
			return `${millionsRounded} million`;
		}
	}
};
</script>


<style lang="scss">
@import '../../../styles/breakpoints';
@import '../../../styles/colours';

.Reach {

	&__row {
		display: flex;
		flex-direction: column;

		@media all and (min-width: $mobile) {
			flex-direction: row;
			justify-content: space-evenly;
		}
	}

	&__counter {
		text-align: right;
		margin-bottom: 1rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		&__label {
			font-weight: bold;
		}

		&__value {
			color: $alt;
		}
	}

	&__geoChart {
		width: 100%;
		padding: 1rem;
	}

	&__counters {
		width: 100%;
		padding: 1rem 2rem;
	}

	&__total {
		width: 100%;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background: $primary;
		color: $highlight;
		text-align: center;
		font-weight: bold;

		&__line {
			width: 5rem;
			height: 0.5rem;
			background-color: $highlight;
			align-self: center;
		}

		&__value {
			font-size: 3rem;
			margin-top: 1rem;
		}
	}
}
</style>
