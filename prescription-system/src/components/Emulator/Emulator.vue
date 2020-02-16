<template>
	<section class="Emulator">
		<h4 class="Emulator__header uppercase">Your client's phone:</h4>
		<div class="Emulator__emulator">
			<div class="Emulator__inner">

				<status-bar/>

				<section class="Emulator__content">

					<template v-if="event || date">

						<v-icon
							class="Emulator__backButton"
							v-if="event"
							color="primary"
							v-text="'keyboard_arrow_left'"
							@click="$emit('back')"/>

						<h5 class="Emulator__userName" v-text="clientName"/>
						<week-panel :date="date" @date-change="onDateChange"/>

						<event v-if="event" class="p-3" :event="event"/>

						<template v-else>
							<v-divider class="m-0"/>

							<section class="Emulator__info">
								<h4 class="Emulator__label">Prescription:</h4>
								<p class="Emulator__detail" v-text="prescription.name"/>

								<h5 class="Emulator__label">Description:</h5>
								<p class="Emulator__detail mb-0" v-text="prescription.description"/>
							</section>

							<v-divider class="m-0"/>

							<section class="Emulator__events">
								<h4 class="Emulator__label">Events:</h4>

								<div
									class="Emulator__panel cursor-pointer"
									v-for="(e, i) in todaysEvents"
									:key="i"
									v-text="e.name"
									@click="$emit('event-click', e)"/>

							</section>

						</template>

					</template>

					<span v-else class="Emulator__title">DEEPSCOPE</span>

				</section>

			</div>
		</div>
	</section>
</template>

<script>
import moment from 'moment';
import WeekPanel from './components/WeekPanel';
import StatusBar from './components/StatusBar';
import Event from './components/Event';

export default {
	components: {
		WeekPanel,
		StatusBar,
		Event
	},
	props: {
		prescription: {
			type: Object,
			required: true
		},
		date: {
			type: String
		},
		event: {
			default: false
		}
	},
	computed: {
		clientName() {
			if (!this.prescription || !this.prescription.client) return 'John Doe';
			return this.prescription.client.name;
		},
		todaysEvents() {
			if (!this.prescription) return [];
			return this.prescription.events.filter(e => {
				const eventDay = moment(e.datetime).startOf('day');
				const currentDay = moment(this.date).startOf('day');
				return eventDay.isSame(currentDay);
			});
		}
	},
	methods: {
		onDateChange(date) {
			this.$emit('date-change', date);
		}
	}
}
</script>


<style lang="scss">
@import "../../styles/index.scss";

.Emulator {
	font-family: 'Montserrat', sans-serif;
	color: #000;

	&__emulator {
		width: 23rem;
		height: 46rem;
		background-color: $white;
		border-radius: 11.3%;
		background-image: url('../../assets/images/iphone-frame.png');
		background-size: contain;
		background-position: center;
		display: flex;
	}

	&__inner {
		padding: 1.5rem 1.7rem;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	&__content {
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	&__title {
		margin: auto;
		font-size: 1.2rem;
		font-weight: 700;
		letter-spacing: 0.1rem;
		color: $grey-dark;
		padding-bottom: 1rem;
	}

	&__backButton {
		position: absolute;
		left: 0.5rem;
		top: 1rem;
	}

	&__userName {
		margin-top: 1rem;
		text-align: center;
	}

	&__info {
		padding: 1rem;
		overflow-y: auto;
		flex-grow: 1;
		flex-basis: 0;
		max-height: 50%;
	}

	&__label {
		text-transform: uppercase;
		font-weight: bold;
	}

	&__detail {
		color: $grey-dark;
	}

	&__events {
		padding: 1rem;
		overflow-y: auto;
	}

	&__panel {
		width: 100%;
		padding: 1rem;
		background: linear-gradient(-180deg, $blue-light, darken($blue-light, 5));
		border-radius: 1rem;
		color: $white;
		margin-bottom: 1rem;
	}

}
</style>

