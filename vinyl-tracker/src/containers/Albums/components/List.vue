<template>
	<div class="section">
		<section id="AlbumList">

			<section class="App__inner">
				<b-button
					class="mb-3"
					variant="outline-success"
					v-text="'Add Album'"
					@click="onAlbumButtonClick"/>
			</section>

			<b-table
				:items="albums"
				:fields="fields"
				:sort-by.sync="sortBy"
				:sort-desc.sync="sortDesc"
				striped>

				<template slot="thumb" slot-scope="data">
					<b-img
						:src="data.item.thumb"
						thumbnail/>
				</template>

				<template slot="stars" slot-scope="data">
					{{data.item.stars}}
					<rating
						:items="starsOptions"
						legend="Star rating:"
						:value="data.item.stars"
						@change="onStarsChange($event, data)"
						kind="slot"/>
				</template>

				<template slot="actions" slot-scope="data">
					<b-button
						:href="getLinkForAlbum(data)"
						variant="outline-primary"
						v-text="'More Info'"/>
					<b-button
						@click="onEditAlbumButtonClick(data.item)"
						variant="outline-secondary"
						v-text="'Edit'"/>
				</template>

			</b-table>

			<album-modal
				:visible="isAlbumModalVisible"
				:mode="albumModalMode"
				:id="selectedId"
				@close="onAlbumModalClose"
				@submit="fetchAlbums"/>

		</section>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { clone } from 'lodash';
import Rating from 'vue-bulma-rating';
import AlbumModal from './AlbumModal';
import StarsOptions from '../../../lib/StarOptions';

export default {
	components: {
		AlbumModal,
		Rating
	},
	props: {
		doFetch: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			starsOptions: StarsOptions,
			sortBy: 'title',
			sortDesc: false,
			fields: [
				{ key: 'thumb', label: 'Image' },
				{ key: 'title', label: 'Title', sortable: true },
				{ key: 'year', label: 'Year', sortable: true },
				{ key: 'stars', label: 'Stars', sortable: true },
				{ key: 'actions', label: 'Actions' }
			],
			isAlbumModalVisible: false,
			selectedId: null,
			albumModalMode: 'add'
		};
	},
	computed: {
		...mapGetters({
			albums: 'album/albums'
		})
	},
	methods: {
		...mapActions({
			fetchAlbums: 'album/fetchAlbums',
			updateAlbum: 'album/updateAlbum'
		}),
		onAlbumButtonClick() {
			this.albumModalMode = 'add';
			this.isAlbumModalVisible = true;
		},
		onEditAlbumButtonClick(item) {
			this.selectedId = item._id;
			this.albumModalMode = 'edit';
			this.isAlbumModalVisible = true;
		},
		onAlbumModalClose() {
			this.isAlbumModalVisible = false;
		},
		getLinkForAlbum(data) {
			const link = data.item._id;
			return `/#/${link}`;
		},
		async onStarsChange(stars, data) {
			const album = clone(data.item);
			album.stars = stars;
			await this.$nextTick();
			await this.updateAlbum({ album, id: album._id });
			this.fetchAlbums();
		}
	},
	created() {
		if (this.doFetch) this.fetchAlbums();
	}
};
</script>
