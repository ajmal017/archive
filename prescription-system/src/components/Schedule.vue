<template>
	<!-- component inspired by the docs here: https://github.com/richardtallent/vue-simple-calendar#installation-and-usage -->

	<section class="Schedule">

		<calendar-view
			:show-date="showDate"
			:events="eventsFormatted"
			class="theme-default"
			@click-event="onEventClick"
			@click-date="setShowDate">
			<calendar-view-header
				slot="header"
				slot-scope="t"
				:header-props="t.headerProps"
				@input="setShowDate" />
		</calendar-view>

	</section>

</template>

<script>
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
require("vue-simple-calendar/static/css/default.css");


export default {
	components: {
		CalendarView,
		CalendarViewHeader
	},
	props: {
		startDate: {
			type: String,
			default: () => new Date().toISOString()
		},
		date: {
			type: String
		},
		events: {
			type: Array,
			require: true
		},
	},
	computed: {
		showDate() {
			if (!this.date) return new Date();
			return new Date(this.date);
			return
		},
		eventsFormatted() {
			const events = this.events.map((e, i) => {
				let classes = `event event--${i}`;
				switch(e.type) {
					case 'survey':
						classes += ' event--survey'
						break;
					case 'information':
					case 'faq':
						classes += ' event--information'
						break;
				};
				return {
					...e,
					id: i,
					startDate: e.datetime,
					title: e.name,
					classes
				}
			});
			return events;
		}
	},
	methods: {
		setShowDate(date) {
			const data = new Date(date).toISOString();
			this.$emit('date-change', data);
		},
		onEventClick(e) {
			const ev = e.originalEvent;
			this.$emit('click', ev)
		},
	}
}
</script>

<style lang="scss">
@import "../styles/index.scss";

.Schedule {
	width: 100%;
	height: 36rem;

	button {
		cursor: pointer;

		&:hover {
			background: darken(rgb(221, 221, 221), 10%);
		}

		&.currentPeriod {
			display: none;
		}
	}

	.cv-day {
		cursor: pointer;
	}

	.cv-event.event {
		cursor: pointer;

		&--survey {
			background: $orange;
			border-color: darken($orange, 10%);
		}

		&--information {
			background: $green;
			border-color: darken($green, 10%);
		}

	}

	.cv-day-number {
		padding: 0.5rem;
		height: fit-content;
		width: 100%;
		text-align: right;
	}

	.theme-default .cv-header .periodLabel {
		font-size: 1.2rem;
	}

}
</style>
