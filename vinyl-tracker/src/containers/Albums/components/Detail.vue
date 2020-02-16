<template>
	<div class="section">

		<section class="App__inner">

			<b-button
				variant="primary"
				class="Detail__button"
				v-text="'Edit Album'"
				@click="onEditAlbumButtonClick"/>

			<h1 v-text="titleText"/>

			<b-img
				class="Detail__cover"
				:src="coverImageSrc"/>

			<section class="Detail__content">

				<a
					:href="discogsUrl"
					target="_blank"
					v-text="'View on Discogs'"/>

				<div>
					<label for="detailYear">Year</label>
					<span id="detailYear" v-text="yearText"/>
				</div>

				<div>
					<label for="detailGenre">Genre</label>
					<span id="detailGenre" v-text="genreText"/>
				</div>

				<!-- #Todo: replace star text with either star component or another designed feature -->
				<div>
					<label for="detailStars">Stars</label>
					<span id="detailStars" v-text="starsText"/>
				</div>

			</section>

		</section>

		<album-modal
			:visible="isAlbumModalVisible"
			mode="edit"
			:id="id"
			@close="onAlbumModalClose"
			@submit="fetch"/>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AlbumModal from './AlbumModal';

export default {
	components: {
		AlbumModal
	},
	props: {
		doFetch: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			id: null,
			isAlbumModalVisible: false
		};
	},
	computed: {
		...mapGetters({
			album: 'album/album'
		}),
		titleText() {
			return this.album.title;
		},
		coverImageSrc() {
			return this.album.cover_image;
		},
		discogsUrl() {
			const base = 'https://www.discogs.com';
			const path = `${base}${this.album.uri}`;
			return path;
		},
		yearText() {
			return this.album.year;
		},
		genreText() {
			return this.album.genre;
		},
		starsText() {
			return this.album.stars;
		}
	},
	methods: {
		...mapActions({
			fetchAlbum: 'album/fetchAlbum'
		}),
		async fetch() {
			await this.fetchAlbum({ id: this.id });
		},
		onEditAlbumButtonClick() {
			this.isAlbumModalVisible = true;
		},
		onAlbumModalClose() {
			this.isAlbumModalVisible = false;
		}
	},
	created() {
		this.id = this.$route.params.id;
		if (this.doFetch) this.fetch();
	}
};
</script>

<style lang="scss">

.Detail {

	&__button {
		clear: both;
		display: block;
		margin: 1.5rem 0;
	}

	&__cover {
		width: 30%;
	}

	&__content {
		display: inline-block;

		> * {
			display: block;
		}
	}
}
</style>
