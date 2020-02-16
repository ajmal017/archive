<template>
	<section class="WeekPanel">

		<div class="WeekPanel__days">
			<section
				class="WeekPanel__day"
				:class="{ 'WeekPanel__day--active': day.selected }"
				v-for="day in days"
				:key="day.date"
				@click="onDayClick(day)">

				<span class="WeekPanel__dayCharacter" v-text="day.character"/>

				<span class="mt-1 text-align-center cursor-pointer" :class="{ 'WeekPanel__currentDay': day.selected }" v-text="day.date"/>

			</section>
		</div>
		<p class="WeekPanel__dayString" v-text="dayString"/>

	</section>
</template>

<script>
import moment from 'moment';

export default {
	props: {
		date: {
			type: String,
			required: true
		}
	},
	computed: {
		currentDate() {
			return moment(this.date);
		},
		days() {
			const weekStart = this.currentDate.clone().startOf('week');
			let days = [];
			for (let i = 0; i < 7; i++) {
				const day = weekStart.clone().add(i, 'days');
				let selected = false;
				if (this.currentDate.day() === day.day()) selected = true;
				days.push({
					character: day.format('dd').substring(0, 1),
					date: day.date(),
					selected,
					isoString: day.toISOString()
				});
			}
			return days;
		},
		dayString() {
			const data = this.currentDate.format('LLLL').split(' ');
			data.splice(-2);
			const dayString = data.join(' ');
			return dayString;
		}
	},
	methods: {
		onDayClick(day) {
			this.$emit('date-change', day.isoString)
		}
	}
}
</script>


<style lang="scss">
@import "../../../styles/index.scss";

.WeekPanel {
	width: 100%;

	&__days {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}

	&__day {
		color: $grey-dark;
		display: flex;
		flex-direction: column;
		width: 2rem;

		&--active {
			color: #000;
		}
	}

	&__dayCharacter {
		font-size: 0.7rem;
		text-align: center;
		margin-bottom: 0.5rem
	}

	&__currentDay {
		border-radius: 100%;
		width: 2rem;
		height: 2rem;
		background: $blue-light;
		line-height: 2rem;
		color: $white;
		margin-top: 0 !important;
		cursor: default;
	}

	&__dayString {
		margin: 0.5rem 0;
		font-size: 0.8rem;
		text-align: center;
		width: 100%;
	}

}
</style>
