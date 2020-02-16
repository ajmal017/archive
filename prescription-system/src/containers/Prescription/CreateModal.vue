<template>

	<modal-layout :visible="visible" @close="$emit('close')">

		<template v-if="isLoading" slot="sidebar" >
			<div class="flex space-around">
				<v-progress-circular indeterminate/>
			</div>
		</template>

		<template v-else-if="template">
			<template slot="title">New Prescription</template>

			<template slot="sidebar">

				<section class="CreateModal__details">

					<span class="font-author mb-4" v-text="authorName"/>

					<span class="DetailModal__label">
						From template:
					</span>
					<b-link
						class="mb-4"
						v-text="template.name"
						:to="{ name: 'template.list', query: { id: template._id } }"/>

					<text-input
						class="mb-3"
						label="Title"
						theme="dark"
						v-model="name"/>

					<textarea-input
						label="Description"
						v-model="description"
						theme="dark"/>

					<datepicker-input
						class="mb-3"
						label="Start Date:"
						:value="startDate"
						@input="onStartDateInput"
						theme="dark"/>

					<v-autocomplete
						class="TextInput TextInput--search"
						label="Select Client"
						prepend-icon=""
						color="white"
						v-model="clientId"
						:items="clientOptions"
						chips
						hide-selected
						clearable
						dark/>

				</section>

			</template>

			<template slot="content">

				<section class="flex mb-3">
					<h4 class="CreateModal__header uppercase">Schedule</h4>

					<v-btn
						class="m-0"
						color="primary"
						:disabled="!isValid"
						v-text="'Publish Prescription'"
						@click="submit"/>

					<span class="text-danger Create__submit--text" v-text="errorText"/>

				</section>

				<schedule
					:date="selectedDate"
					:events="events"
					@click="setSelectedEvent"
					@date-change="setSelectedDate"/>

			</template>

			<template slot="panel">
				<emulator
					:prescription="prescriptionPreview"
					:event="selectedEvent"
					:date="selectedDate"
					@back="selectedEvent = null"
					@event-click="setSelectedEvent"
					@date-change="selectedDate"/>
			</template>

		</template>

	</modal-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import Clients from '../../../lib/Clients';
import ModalLayout from '../../components/layout/Modal';
import TextInput from '../../components/inputs/Text';
import TextareaInput from '../../components/inputs/TextArea';
import DatepickerInput from '../../components/inputs/Datepicker';
import Schedule from '../../components/Schedule';
import Emulator from '../../components/Emulator/Emulator';

export default {
	components : {
		ModalLayout,
		TextInput,
		TextareaInput,
		DatepickerInput,
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
			name: '',
			description: '',
			errorText: null,
			clientOptions: Clients,
			clientId: null,
			selectedEvent: null,
			selectedDate: new Date().toISOString()
		}
	},
	computed: {
		...mapGetters({
			account: 'account/account',
			template: 'template/template'
		}),
		templateId() {
			return this.$route.query.templateId;
		},
		authorName(){
			return `Author - ${this.account.title}. ${this.account.firstName} ${this.account.lastName}`
		},
		isValid() {
			return (
				this.name &&
				this.description &&
				this.clientId &&
				this.events.length > 0
			);
		},
		events() {
			if (!this.template) return [];
			const maxDays = this.template.durationWeeks * 7;
			const endDate = moment(this.startDate).add(maxDays, 'days');
			const events = [];
			this.template.modules.forEach(m => {
				if (!m.repeat.value) throw new Error('Modules must have "repeat.value" property');
				let nextEventDate = moment(this.startDate);
				while (nextEventDate.isBefore(endDate)) {
					const e = {
						...m,
						datetime: nextEventDate.toISOString()
					};
					nextEventDate = nextEventDate.add(m.repeat.value, m.repeat.unit);
					if (m.repeat.value === 0) nextEventDate = endDate;
					delete e.repeat;
					events.push(e);
				}

			});
			return events;
		},
		startDate() {
			const startDate = moment(this.$route.query.startDate).toISOString();
			if (!startDate) return new Date().toISOString();
			return startDate;
		},
		prescriptionPreview() {
			const preview = {
				name: this.name,
				events: this.events,
				startDate: this.startDate,
				description: this.description,
			}
			const client = this.clientOptions.find(c => c.value === this.clientId);
			if (client) preview.client = { name: client.text };
			return preview;
		}
	},
	methods: {
		...mapActions({
			submitPrescription: 'prescription/submit',
			fetchTemplate: 'template/get'
		}),
		async submit() {
			this.isLoading = true;
			const prescription = {
				name: this.name,
				description: this.description,
				events: this.events,
				templateId: this.templateId,
				clientId: this.clientId
			}
			try {
				const result = await this.submitPrescription({ data: prescription });
				this.$emit('submit');
				this.$router.push({ query: { id: result.data } });
			} catch (err) {
				this.errorText = err.message;
			}
			this.isLoading = false;
		},
		async fetch() {
			this.isLoading = true;
			if (!this.templateId) return this.$router.push({ query: {} });
			await this.fetchTemplate({ id: this.templateId });
			this.name = this.template.name;
			this.description = this.template.description;
			this.isLoading = false;
		},
		clearData() {
			this.name = '';
			this.description = '';
			this.errorText = null;
		},
		onStartDateInput(val) {
			this.$router.push({
				query: {
					...this.$route.query,
					startDate: new Date(val).toISOString()
				}
			});
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
		visible: 'clearData',
		templateId: {
			immediate: true,
			handler: 'fetch'
		}
	}
}
</script>


<style lang="scss">
@import "../../styles/index.scss";

.CreateModal {

	&__details {
		display: flex;
		flex-flow: column;
		padding: 0 2rem;
	}

	&__label {
		@extend .font-semibold;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
	}

	&__divider {
		background-color: $white;
		height: 2px;
	}

	&__header {
		@extend .font-semibold;
		text-transform: capitalize;
		display: inline;
		margin: 0 auto auto 0;
	}

}


</style>
