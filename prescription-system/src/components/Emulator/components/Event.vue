<template>
	<section class="EmulatorEvent">

		<h4 class="Emulator__label" v-text="event.name"/>

		<section v-if="event.type === 'survey'">
			<div
				class="Emulator__panel"
				v-for="(question, i) in event.meta.questions"
				:key="i"
				v-text="question.text"/>
		</section>

		<section v-if="event.type === 'information'">
			<p class="Emulator__detail" v-text="event.meta.text"/>

			<div v-if="event.meta.media" class="DetailModal__content__cell mb-4">
				<b-img
					v-if="event.meta.media.type === 'photo-url'"
					class="DetailModal__media"
					:src="event.meta.media.value"/>
				<video-player
					v-if="event.meta.media.type === 'video-url'"
					class="DetailModal__media"
					:options="videoPlayerOptions" />
				<div v-if="event.meta.media.type === 'youtube-link'">
					<youtube
						class="DetailModal__media"
						:video-id="youtubeVideoId"/>
				</div>
			</div>
		</section>

	</section>
</template>

<script>
export default {
	props: {
		event: {
			type: Object,
			required: true
		}
	},
	computed: {
		videoPlayerOptions() {
			if (!this.event || !this.event.meta.media) return null;
			return {
				sources: {
					type: 'video/mp4',
					src: this.event.meta.media.value
				}
			}
		},
		youtubeVideoId() {
			if (!this.event || !this.event.meta.media) return false;
			const url = this.event.meta.media.value;
			var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
			var match = url.match(regExp);
			return (match&&match[7].length==11)? match[7] : false;
		}
	}
}
</script>


<style lang="scss">

.EmulatorEvent {
	height: 100%;
	overflow-y: auto;
}
</style>
