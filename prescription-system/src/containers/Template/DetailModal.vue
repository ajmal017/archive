<template>

	<modal-layout :visible="visible" @close="$emit('close')">

		<template v-if="isLoading" slot="sidebar" >
			<div class="flex space-around">
				<v-progress-circular indeterminate/>
			</div>
		</template>

		<template v-else-if="template">

			<template slot="title">
				<span v-text="template.name"/>

				<v-btn
					v-if="template.author.id === account._id"
					class="HolisticModal__title__fabButton"
					color="primary"
					small
					fab
					absolute
					@click="$router.push({ query: { id: undefined, editId: template._id } })">
					<v-icon small v-text="'edit'"/>
				</v-btn>
			</template>


			<template slot="sidebar">

				<section class="DetailModal__details">

					<span class="font-author" v-text="template.author.name"/>

					<span class="DetailModal__label">
						Description
					</span>
					<p class="mb-4 break-word" v-text="template.description"/>

					<span class="DetailModal__label">
						Duration (weeks)
					</span>
					<p class="mb-3 break-word" v-text="template.durationWeeks"/>

					<datepicker-input
						class="mb-5"
						label="If started on:"
						v-model="exampleStartDate"
						theme="dark"/>

				</section>

				<v-divider class="DetailModal__divider"/>

				<section class="DetailModal__details">

					<span class="DetailModal__label mt-3">
						Modules
					</span>

					<module-list
						:modules="template.modules"
						:selectable="true"
						:selectedIndex="selectedModuleIndex"
						@select="onModuleSelect"/>

				</section>
			</template>

			<template slot="content">

				<header class="flex mb-3">
					<h4 class="DetailModal__header uppercase" v-text="contentHeaderText"/>

					<v-btn
						class="DetailModal__createButton"
						v-text="'Create Prescription App'"
						:to="{
							name: 'prescription.list',
							query: {
								create: null,
								templateId: template._id,
								startDate: exampleStartDate
							}
						}"
						color="primary"
						large/>
				</header>

				<section class="DetailModal__content">

					<template v-if="selectedModule">

						<h5
							class="DetailModal__repeat"
							v-text="`Repeat every - ${this.selectedModule.repeat.value} ${this.selectedModule.repeat.unit}`"/>

						<survey-question-list
							v-if="selectedModule.type === 'survey'"
							:questions="selectedModule.meta.questions"/>

						<template v-if="selectedModule.type === 'information'">

							<div class="DetailModal__content__cell mb-3">
								<p v-text="selectedModule.meta.text"/>
							</div>

							<div v-if="selectedModule.meta.media" class="DetailModal__content__cell mb-4">

								<b-img
									v-if="selectedModule.meta.media.type === 'photo-url'"
									class="DetailModal__media"
									:src="selectedModule.meta.media.value"/>
								<video-player
									v-if="selectedModule.meta.media.type === 'video-url'"
									class="DetailModal__media"
									:options="videoPlayerOptions" />
								<youtube
									v-if="selectedModule.meta.media.type === 'youtube-link'"
									class="DetailModal__media"
									:video-id="youtubeVideoId"/>

							</div>

						</template>

						<v-btn
							class="DetailModal__backButton"
							v-text="'Back to calendar'"
							color="grey-dark"
							dark
							@click="onBackToCalendarClick"/>

					</template>

					<schedule
						v-if="!selectedModule"
						:date="selectedDate"
						:events="eventsPreview"
						@click="setSelectedEvent"
						@date-change="setSelectedDate"/>


				</section>


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
import { videoPlayer } from 'vue-video-player';
require('video.js/dist/video-js.css');
import ModalLayout from '../../components/layout/Modal';
import TextInput from '../../components/inputs/Text';
import TextareaInput from '../../components/inputs/TextArea';
import DatepickerInput from '../../components/inputs/Datepicker';
import ModuleList from './components/ModuleList';
import SurveyQuestionList from './components/SurveyQuestionList';
import Schedule from '../../components/Schedule';
import Emulator from '../../components/Emulator/Emulator';

const MAX_QUESTION_LENGTH = 140;

export default {
	components: {
		videoPlayer,
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
			selectedModuleIndex: null,
			exampleStartDate: new Date().toISOString(),
			selectedEvent: null,
			selectedDate: new Date().toISOString()
		}
	},
	computed: {
		...mapGetters({
			template: 'template/template',
			account: 'account/account'
		}),
		templateId() {
			return this.$route.query.id;
		},
		selectedModule() {
			if (!this.template) return;
			return this.template.modules[this.selectedModuleIndex];
		},
		contentHeaderText() {
			if (!this.selectedModule) return 'CALENDAR';
			return this.selectedModule.name;
		},
		videoPlayerOptions() {
			if (!this.selectedModule || !this.selectedModule.meta.media) return null;
			return {
				sources: {
					type: 'video/mp4',
					src: this.selectedModule.meta.media.value
				}
			}
		},
		youtubeVideoId() {
			if (!this.selectedModule || !this.selectedModule.meta.media) return false;
			const url = this.selectedModule.meta.media.value;
			 var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
			var match = url.match(regExp);
			return (match&&match[7].length==11)? match[7] : false;
		},
		eventsPreview() {
			const maxDays = this.template.durationWeeks * 7;
			const endDate = moment(this.exampleStartDate).add(maxDays, 'days');
			const events = [];
			this.template.modules.forEach(m => {
				let nextEventDate = moment(this.exampleStartDate);
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
		prescriptionPreview() {
			return {
				name: this.template.name,
				events: this.eventsPreview,
				startDate: this.exampleStartDate,
				description: this.template.description
			}
		}
	},
	methods: {
		...mapActions({
			fetchTemplate: 'template/get'
		}),
		async fetch() {
			this.isLoading = true;
			if (!this.templateId) return this.isLoading = false;
			await this.fetchTemplate({ id: this.templateId });
			this.isLoading = false;
		},
		onModuleSelect(i) {
			this.selectedEvent = null;
			this.selectedDate = null;
			this.selectedModuleIndex = i;
		},
		setSelectedEvent(e) {
			this.selectedDate = e.datetime;
			this.selectedEvent = e;
		},
		setSelectedDate(date) {
			this.selectedDate = date;
			this.selectedEvent = null;
		},
		onBackToCalendarClick() {
			this.selectedModuleIndex = null;
			this.selectedDate = this.exampleStartDate;
		},
		clearData() {
			this.startDate = new Date();
		}
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

	&__createButton {
		margin: 0 0 auto auto;
	}

	&__repeat {
		@extend .font-light;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
		font-size: 0.8rem;
	}

	&__backButton {
		margin: 0;
		margin-left: 100%;
		margin-bottom: 2rem;
		transform: translateX(-100%);
		white-space: nowrap;
	}

	&__content {

		&__cell {
			background-color: $grey-pale;
			border: 1px solid darken($grey-pale, 5);
			border-radius: 2px;
			padding: 1rem;
		}
	}

	&__media {
		max-width: 100%;
		max-height: 100%;
		display: flex;
	}

	&__editButton {
		right: 1rem;
		top: -3rem;
	}

}

</style>
