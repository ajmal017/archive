<template>
	<section class="SurveyQuestionList">

		<div class="SurveyQuestionList__header">
			<span class="uppercase">Questions</span>
			<span>Total - {{questions.length}}/5</span>
		</div>

		<v-list>
			<v-list-tile
				class="SurveyQuestionList__question"
				v-for="(question, i) in questions"
				:key="i" >
				<v-list-tile-content class="SurveyQuestionList__question__inner">
					<span class="SurveyQuestionList__question__index" v-text="`${i+1}.`"/>
					<v-list-tile-title class="SurveyQuestionList__question__text" v-text="question.text"/>

					<div class="SurveyQuestionList__question__controls">
						<span class="SurveyQuestionList__question__type" v-text="question.type"/>
						<v-icon
							v-if="editable"
							v-text="'delete'"
							small
							@click="$emit('deleteIndex', i)"/>
					</div>

				</v-list-tile-content>
			</v-list-tile>
		</v-list>

	</section>
</template>

<script>
export default {
	props: {
		questions: {
			type: Array,
			required: true
		},
		editable: {
			type: Boolean
		}
	}
}
</script>

<style lang="scss">
@import "../../../styles/index.scss";

.SurveyQuestionList {

	&__header {
		letter-spacing: 0.1rem;
		@extend .font-semibold;
		margin-bottom: 1rem;
		font-size: 1.1rem;
		padding: 0.7rem 1rem;
		background-color: #f3f3f3;
		border-radius: 0.2rem;
		justify-content: space-between;
		display: flex;
	}

	&__question {
		padding: 1rem 0;
		background-color: lighten($grey-light, 1);
		height: fit-content;
		border-radius: 0.2rem;
		flex-direction: row;
		margin-bottom: 0.5rem;

		&__inner {
			flex-direction: row;
			width: 100%;
			height: fit-content;
		}

		&__index {
			@extend .font-bold;
		}

		&__text {
			margin-left: 1rem;
			height: fit-content;
			display: block;
			white-space: normal;
		}

		&__controls {
			width: 6rem;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}

		&__type {
			@extend .font-semibold;
			text-transform: uppercase;
			font-size: 0.8rem;
			height: fit-content;
			position: relative;
		}

	}

}
</style>

