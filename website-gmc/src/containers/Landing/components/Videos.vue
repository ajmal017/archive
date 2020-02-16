<template>
	<section class="Videos" row>

		<p class="Videos__intro">See how media activists are getting religious leaders on air to stop FGM:</p>

		<v-layout class="Videos__inner" v-if="isReady">
			<v-flex class="Videos_player" xs8>
				<h3 class="mb-3" v-text="videos[selectedIndex].title"/>
				<youtube :video-id="videos[selectedIndex].id" :fit-parent="true"/>
			</v-flex>
			<v-flex class="Videos__playlist" xs4>
				<h4 class="mb-3">Videos of anti-FGM media activists on the job:</h4>
				<section class="Videos__playlist__list">
					<div v-for="(video, i) in videos" :key="video.id" @click="selectedIndex = i">
						<section class="Videos__preview" v-if="i !== selectedIndex">
							<img class="Videos__thumbnail" :src="video.thumbnailUrl"/>
							<span class="Videos__preview__title" v-text="video.title"/>
						</section>
					</div>
				</section>
			</v-flex>
		</v-layout>

		<loader v-else/>

	</section>
</template>

<script>
import axios from 'axios';
import config from '../../../config';
import Loader from '../../../components/Loader';

export default {
	components: {
		Loader
	},
	data() {
		return {
			videoUrls: [
				'BlGbEgLT1TU',
				'EPJr0zuw5ro',
				'HcvtKfYeyxI',
				'jCuS1yk5NFw',
				'3av6X90ajRs',
				'z6dR9BG9XUA'
			],
			videos: [],
			selectedIndex: 0,
			isReady: false
		}
	},
	methods: {
		async fetchData() {
			const url = `${config.apiBase}/youtube-info`;
			const { data } = await axios.get(url, { params: { videoIds: this.videoUrls } });
			this.videos = data;
			this.isReady = true;
		}
	},
	created() {
		this.fetchData();
	}
}
</script>

<style lang="scss">

.Videos {
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 5rem;

	&__intro {
		margin-bottom: 2rem;
	}

	&__inner {
		width: 100%;
	}

	&__thumbnail {
		height: 6.75rem;
	}

	&__playlist {
		margin-left: 2rem;
		padding: 4rem 2rem;
		padding-right: 0;

		&__list {
			height: 25rem;
			overflow-y: auto;
		}
	}

	&__preview {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 1rem;
		cursor: pointer;

		&__title {
			margin-left: 1rem;
			font-size: 1rem;
			text-overflow: ellipsis;
			height: 6.75rem;
			overflow: hidden;
			white-space: nowrap;
		}
	}
}
</style>
