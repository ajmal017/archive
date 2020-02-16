<template>

	<modal-layout :visible="visible" @close="$emit('close')">

		<template v-if="isLoading" slot="sidebar" >
			<div class="flex space-around">
				<v-progress-circular indeterminate/>
			</div>
		</template>

		<template v-else-if="prescription && template">

			<template slot="title">{{prescription.name}}</template>

			<template slot="sidebar">

				<section class="DetailModal__details">

					<span class="DetailModal__label">
						From template:
					</span>
					<b-link
						class="mb-4"
						v-text="template.name"
						:to="{ name: 'template.list', query: { id: template._id } }"/>

					<span class="font-author" v-text="`Prescribed by: ${prescription.author.name}`"/>

					<span class="font-author" v-text="`Client: ${clientName}`"/>

					<span class="DetailModal__label">
						Description
					</span>
					<p class="mb-5 break-word" v-text="prescription.description"/>

					<span class="DetailModal__label">
						Start Date
					</span>
					<p class="mb-5 break-word" v-text="formatDate(prescription.startDate)"/>

				</section>

			</template>

			<template slot="content">

				<header class="flex mb-3">
					<h4 class="DetailModal__header uppercase">Schedule</h4>

				<v-chip
					class="App__chip"
					:color="progressChip.colour"
					v-text="progressChip.text"/>
				</header>


				<schedule
					:events="prescription.events"
					:date="selectedDate"
					@click="setSelectedEvent"
					@date-change="setSelectedDate"/>

			</template>

			<template slot="panel">
				<h4 class="DetailModal__header uppercase">Your client's phone</h4>
				<emulator
					v-if="prescription"
					:prescription="emulatorPrescription"
					:event="selectedEvent"
					:date="selectedDate"
					@back="selectedEvent = null"
					@event-click="setSelectedEvent"
					@date-change="setSelectedDate"/>
			</template>

		</template>

	</modal-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
require('video.js/dist/video-js.css');
import { formatDate } from '../../../lib/common';
import Clients from '../../../lib/Clients';
import ModalLayout from '../../components/layout/Modal';
import Schedule from '../../components/Schedule';
import Emulator from '../../components/Emulator/Emulator';

export default {
	components: {
		ModalLayout,
		Schedule,
		Emulator
	},
	props: {
		visible: {
			type: Boolean
		}
	},
	data() {
		return {
			isLoading: false,
			clientOptions: Clients,
			selectedEvent: null,
			selectedDate: new Date().toISOString()
		}
	},
	computed: {
		...mapGetters({
			prescription: 'prescription/prescription',
			template: 'template/template'
		}),
		prescriptionId() {
			return this.$route.query.id;
		},
		progressChip() {
			let text = 'Upcoming';
			let colour = 'yellow';
			if (new Date(this.prescription.startDate) < new Date()) {
				text = 'Started';
				colour = 'green';
			}
			if (new Date(this.prescription.endDate) < new Date()) {
				text = 'Finished';
				colour = 'red';
			}
			return { text, colour };
		},
		clientName() {
			if (!this.prescription) return null;
			const client = this.clientOptions.find(c => c.value === this.prescription.clientId);
			return client.text;
		},
		emulatorPrescription() {
			return {
				...this.prescription,
				client: {
					name: this.clientName
				}
			};
		}
	},
	methods: {
		...mapActions({
			fetchPrescription: 'prescription/get',
			fetchTemplate: 'template/get'
		}),
		formatDate: formatDate,
		async fetch() {
			this.isLoading = true;
			if (!this.prescriptionId) return this.isLoading = false;
			try {
				await this.fetchPrescription({ id: this.prescriptionId });
				await this.fetchTemplate({ id: this.prescription.templateId });
			} catch (err) {
				this.$router.push({ query: undefined });
			}
			this.isLoading = false;
		},
		setSelectedEvent(e) {
			this.selectedDate = e.datetime;
			this.selectedEvent = e;
		},
		setSelectedDate(date) {
			this.selectedDate = date;
			this.selectedEvent = null;
		},
	},
	watch: {
		prescriptionId: {
			immediate: true,
			handler: 'fetch'
		}
	}
}
</script>


<style lang="scss">
@import "../../styles/index.scss";

.DetailModal {
	color: $white;

	&__label {
		@extend .font-semibold;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
	}

	&__details {
		display: flex;
		flex-flow: column;
		padding: 0 2rem;
	}

	&__header {
		@extend .font-semibold;
		text-transform: capitalize;
		display: inline;
		margin: 0 auto auto 0;
	}

	&__createButton {
		margin: 0 0 auto auto;
	}

}

</style>
