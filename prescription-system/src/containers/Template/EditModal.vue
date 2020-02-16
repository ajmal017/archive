<template>

	<modal-layout :visible="visible" @close="$emit('close')">

		<template v-if="isLoading" slot="sidebar" >
			<div class="flex space-around">
				<v-progress-circular indeterminate/>
			</div>
		</template>

		<template v-else>

			<template slot="title">
				<span v-text="pageTitle"/>

				<v-btn
					v-if="editItemId"
					class="HolisticModal__title__fabButton"
					color="red"
					small
					fab
					absolute
					dark
					@click="onDeleteClick">
					<v-icon small v-text="'delete'"/>
				</v-btn>
			</template>

			<template slot="sidebar">

				<section class="CreateModal__details">

					<text-input
						class="mb-3"
						label="Title"
						theme="dark"
						v-model="name"/>

					<span class="font-author" v-text="authorName"/>

					<textarea-input
						label="Description"
						v-model="description"
						theme="dark"/>

					<text-input
						class="mb-3"
						label="Duration (weeks)"
						theme="dark"
						v-model="durationWeeks"
						type="number"/>

					<datepicker-input
						label="If started on:"
						v-model="exampleStartDate"
						theme="dark"/>

				</section>

				<v-divider class="CreateModal__divider"/>

				<section class="CreateModal__details">

					<v-autocomplete
						class="TextInput TextInput--search"
						label="Add Module"
						prepend-icon="add"
						color="white"
						v-model="newModule.type"
						:items="typeOptions"
						chips
						hide-selected
						clearable
						dark/>

					<module-list
						:modules="modules"
						:editable="true"
						@deleteIndex="deleteModule"/>

				</section>
			</template>

			<template slot="content">
				<div class="CreateModal__newModule" v-if="newModule.type">

					<section class="flex mb-3">
						<h4 class="CreateModal__header uppercase" v-text="newModuleTypeLabel"/>

						<v-btn
							class="m-0"
							color="primary"
							:disabled="!isNewModuleValid"
							v-text="'Add Module'"
							@click="onAddModuleClick"/>

					</section>


					<section class="CreateModal__newModule__fields">

						<text-input
							label="Module Name"
							v-model="newModule.name"/>
					</section>

					<section class="CreateModal__newModule__checkbox">
					<v-checkbox
						color="primary"
						:label="`Repeatable`"
						class="mb-0"
						v-model="newModuleRepeatable"/>
					</section>

					<section class="mb-3" v-if="newModuleRepeatable">
						<label>Repeats Every:</label>
						<text-input
							class="ml-5 d-inline-block"
							v-model="newModule.repeat.value"
							type="number"/>
						<v-select
							class="ml-3 d-inline-block w-25"
							v-model="newModule.repeat.unit"
							:items="repeatUnitItems"/>
					</section>

					<v-spacer/>

					<section class="CreateModal__newModule__content">

						<survey-question-list
							v-if="newModule.type === 'survey'"
							:questions="questions"
							:editable="true"
							@deleteIndex="deleteQuestion"/>


						<template v-if="newModule.type === 'information'">
							<div class="CreateModal__newModule__header">
								<text-input
									label="Add a url to add media..."
									v-model="newModuleMedia.value"/>
								<v-spacer/>
								<v-select
									class="ModuleType__information__media__format"
									:items="mediaTypeOptions"
									v-model="newModuleMedia.type"
									label="Format"
									color="grey"
									light
									small/>
							</div>
						</template>

					</section>

				</div>

				<div v-if="!newModule.type" class="CreateModal__schedule">

					<header class="flex mb-3">
						<h4 class="CreateModal__header uppercase">Calendar</h4>

						<v-btn
							class="CreateModal__submitButton"
							color="primary"
							:disabled="!isTemplateValid"
							v-text="submitButtonText"
							large
							@click="submit"/>
					</header>
					<span class="text-danger Create__submit--text" v-text="errorText"/>

					<schedule
						:events="eventsPreview"
						:date="selectedDate"
						@click="setSelectedEvent"
						@date-change="setSelectedDate"/>/>

				</div>

			</template>

			<template slot="footer">
				<template v-if="newModule.type === 'survey'">
					<textarea-input
						class="m-3 mb-5"
						label="Add question..."
						v-model="newQuestionText"
						:disabled="(questions.length > 4)"/>

					<section class="CreateModal__controls">
						<v-select
							v-model="newQuestionType"
							:items="newQuestionTypeOptions"
							label="Answer type"
							color="grey"
							light
							small/>
						<v-btn
							class="m-0"
							color="grey-dark"
							:disabled="!isNewQuestionValid"
							v-text="'Save'"
							dark
							@click="onAddQuestionClick"/>
					</section>
				</template>

				<textarea-input
					v-if="newModule.type === 'information'"
					class="m-3 mb-5"
					label="Information text"
					v-model="newModuleText"/>
			</template>

			<template slot="panel">
				<emulator
					:prescription="prescriptionPreview"
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
import moment from 'moment';
import ModuleTypes from '../../../lib/ModuleTypes.js';
import ModalLayout from '../../components/layout/Modal';
import TextInput from '../../components/inputs/Text';
import TextareaInput from '../../components/inputs/TextArea';
import DatepickerInput from '../../components/inputs/Datepicker';
import ModuleList from './components/ModuleList';
import SurveyQuestionList from './components/SurveyQuestionList';
import Schedule from '../../components/Schedule';
import Emulator from '../../components/Emulator/Emulator';

const MAX_QUESTION_LENGTH = 140;
const MAX_TEXT_LENGTH = 500;

export default {
	components : {
		ModalLayout,
		TextInput,
		TextareaInput,
		DatepickerInput,
		ModuleList,
		SurveyQuestionList,
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
			modules: [],
			durationWeeks: 4,
			errorText: null,
			typeOptions: ModuleTypes,
			exampleStartDate: new Date().toISOString(),
			newModule: {
				name: '',
				repeat: {
					value: 7,
					unit: 'days'
				},
				type: null
			},
			newModuleRepeatable : true,
			repeatUnitItems: [
				'minutes',
				'hours',
				'days',
				'months'
			],
			newQuestionText: '',
			newQuestionType: 'text',
			newQuestionTypeOptions: [
				'text',
				'number'
			],
			questions: [],
			newModuleText: '',
			newModuleMedia: {
				value: '',
				type: 'photo-url'
			},
			mediaTypeOptions: [
				'photo-url',
				'video-url',
				'youtube-link'
			],
			selectedEvent: null,
			selectedDate: new Date().toISOString()
		}
	},
	computed: {
		...mapGetters({
			account: 'account/account',
			template: 'template/template'
		}),
		editItemId() {
			return this.$route.query.editId;
		},
		authorName(){
			return `Author - ${this.account.title}. ${this.account.firstName} ${this.account.lastName}`
		},
		newModuleTypeLabel() {
			const moduleType = this.typeOptions.find(mt => mt.value === this.newModule.type);
			return moduleType.text;
		},
		pageTitle() {
			if (this.editItemId) return 'Edit Template';
			return 'New Template';
		},
		submitButtonText() {
			if (this.editItemId) return 'Update Template';
			return 'Create Template';
		},
		isTemplateValid() {
			return (
				this.name &&
				this.description &&
				this.modules.length !== 0 &&
				this.durationWeeks
			);
		},
		isNewQuestionValid() {
			return (
				this.newModule.type &&
				this.newQuestionText &&
				this.newQuestionText.length < MAX_QUESTION_LENGTH &&
				this.questions.length < 5
			);
			return true;
		},
		isNewModuleValid() {
			if (!this.newModule.name ||
				!this.newModule.repeat.value ||
				parseInt(this.newModule.repeat.value, 10) < 1 ||
				!this.newModule.type
			) return false;
			if (this.newModule.type === 'survey') {
				if (this.questions.length === 0) return false;
			}
			if (this.newModule.type === 'information') {
				if (!this.newModuleText) return false;
			}
			return true;
		},
		eventsPreview() {
			const maxDays = this.durationWeeks * 7;
			const endDate = moment(this.exampleStartDate).add(maxDays, 'days');
			const events = [];
			this.modules.forEach(m => {
				let nextEventDate = moment(this.exampleStartDate);
				while (nextEventDate.isBefore(endDate)) {
					const e = {
						...m,
						datetime: nextEventDate.toISOString()
					}
					nextEventDate = nextEventDate.add(m.repeat.value, m.repeat.unit);
					if (m.repeat.value === 0) nextEventDate = endDate;
					delete e.repeat;
					events.push(e);
				}
			});
			return events;
		},
		prescriptionPreview() {
			return {
				name: this.name,
				events: this.eventsPreview,
				startDate: this.exampleStartDate,
				description: this.description
			}
		}
	},
	methods: {
		...mapActions({
			submitTemplate: 'template/submit',
			updateTemplate: 'template/update',
			fetchTemplate: 'template/get',
			deleteTemplate: 'template/delete'
		}),
		async submit() {
			this.isLoading = true;
			const template = {
				name: this.name,
				description: this.description,
				modules: this.modules,
				durationWeeks: parseInt(this.durationWeeks, 10)
			};
			try {
				let result;
				if (this.editItemId) {
					result = await this.updateTemplate({ data: template, id: this.template._id });
				} else {
					result = await this.submitTemplate({ data: template });
				}
				this.$emit('submit');
				this.$router.push({
					query: {
						id: this.template._id
					}
				});
			} catch (err) {
				this.errorText = err.message;
			}
			this.isLoading = false;
		},
		async fetch() {
			if (!this.editItemId) return;
			this.isLoading = true;
			await this.fetchTemplate({ id: this.editItemId });
			this.name = this.template.name;
			this.description = this.template.description;
			this.modules = this.template.modules,
			this.durationWeeks = this.template.durationWeeks
			this.isLoading = false;
		},
		async onDeleteClick() {
			this.isLoading = true;
			await this.deleteTemplate({ id: this.template._id });
			this.$emit('submit');
			this.$router.push({ query: undefined });
			this.isLoading = false;
		},
		onAddModuleClick() {
			const result = {
				...this.newModule,
				repeat: {
					value: parseInt(this.newModule.repeat.value, 10),
					unit: this.newModule.repeat.unit
				},
				meta: {
					questions: this.questions,
					text: this.newModuleText,
					media: {
						value: this.newModuleMedia.value,
						type: this.newModuleMedia.type
					}
				}
			}
			if (!this.newModuleRepeatable) result.repeat.value = 0;
			if (!this.newModuleMedia.value) delete result.meta.media;
			if (!this.newModuleText) delete result.meta.text;
			this.modules.push(result);
			this.clearNewModuleData();
		},
		onAddQuestionClick() {
			this.questions.push({
				text: this.newQuestionText,
				type: this.newQuestionType
			});
			this.newQuestionText = '';
		},
		clearData() {
			this.name = '';
			this.description = '';
			this.modules = [];
			this.durationWeeks = 4;
			this.errorText = null;
			this.clearNewModuleData();
		},
		clearNewModuleData() {
			this.newQuestionText = '';
			this.questions = [];
			this.newModuleText = '';
			this.newModuleMedia.value = '';
			this.newModuleMedia.type = 'photo-url'
			this.newModule.name = '';
			this.newModuleRepeatable = true;
			this.newModule.repeat.value = 7;
			this.newModule.type = null;
		},
		deleteQuestion(i) {
			this.questions.splice(i, 1);
		},
		deleteModule(i) {
			this.modules.splice(i, 1);
		},
		setSelectedEvent(e) {
			this.selectedDate = e.datetime;
			this.selectedEvent = e;
		},
		setSelectedDate(date) {
			this.selectedDate = date;
			this.selectedEvent = null;
		}
	},
	watch: {
		visible: 'clearData',
		editItemId: {
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

	&__submitButton {
		margin: 0 0 auto auto;
	}


	&__controls {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		padding-left: 2rem;
		height: 100%;
		width: 15rem;
	}


	&__newModule {

		&__fields {
			display: flex;
			justify-content: space-between;
			width: 100%;
		}

		&__header {
			padding: 0.7rem 1rem;
			background-color: lighten($grey-light, 1);
			border-radius: 0.2rem;
			justify-content: space-between;
			display: flex;
		}

		&__checkbox {
			label {
				margin-bottom: 0;
			}
		}

	}

	&__schedule {
		display: flex;
		flex-direction: column;
	}

}

.ModuleType {

	&__information {

		&__media {
			display: flex;
			justify-content: space-between;

			&__format {
				width: 1rem;
			}
		}
	}
}

</style>
