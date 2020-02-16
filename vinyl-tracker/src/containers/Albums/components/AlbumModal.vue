<template>
	<section>

		<b-modal
			:title="titleText"
			:visible="visible"
			class="App"
			@hidden="emitClose">

			<multiselect
				v-model="selected"
				track-by="code"
				placeholder="Type to search"
				:options="results"
				:loading="isSearching"
				:internal-search="false"
				@search-change="onSearchChange">

				<template
					slot="singleLabel"
					slot-scope="props">
					<img
						class="Album__thumbImage Album__thumbImage--small"
						:src="props.option.thumb"/>
					<span class="option__desc">
						<span
							v-text="props.option.title"/>
					</span>
				</template>

				<template
					slot="option"
					slot-scope="props">
					<img
						class="Album__thumbImage"
						:src="props.option.thumb"/>
					<span
						class="Album__multiSelectTitle"
						v-text="props.option.title"/>
				</template>

			</multiselect>

			<rating
				:items="starsOptions"
				legend="Star rating:"
				:value="stars"
				@change="onStarsChange"
				kind="slot"/>

			<template slot="modal-footer">
				<b-button
					v-if="isDeleteButtonVisible"
					variant="danger"
					v-text="'Delete'"
					@click="onDeleteButtonClick"/>
				<b-button
					v-text="'Cancel'"
					@click="onCancelButtonClick"/>
				<b-button
					variant="primary"
					v-text="submitButtonText"
					:disabled="!isFormValid"
					@click="onSubmitButtonClick"/>
			</template>

		</b-modal>

		<b-modal
			title="Delete"
			:visible="isConfirmDeleteModalVisible"
			@ok="onConfirmDeleteButtonClick"
			@hidden="onConfirmDeleteModalClose">
			<p>Are you sure you want to delete this album?</p>
		</b-modal>

	</section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Multiselect from 'vue-multiselect';
import Rating from 'vue-bulma-rating';
import StarsOptions from '../../../lib/StarOptions';

// Keep purely functional methods here (project logic free!)
function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
	components: {
		Multiselect,
		Rating
	},
	props: {
		visible: {
			type: Boolean
		},
		mode: {
			type: String,
			default: 'add'
		},
		id: {
			type: String
		}
	},
	watch: {
		visible() {
			if (!this.visible) return;
			if (this.mode === 'add') {
				this.clear();
			} else if (this.mode === 'edit') {
				this.prepareToEdit();
			}
		},
		doSearch() {
			if (!this.doSearch) return;
			this.onSearchChange(this.searchTerm);
		}
	},
	data() {
		return {
			isSearching: false,
			searchTerm: null,
			lastSearchTerm: null,
			isConfirmDeleteModalVisible: false,
			selected: null,
			stars: null,
			starsOptions: StarsOptions
		};
	},
	computed: {
		...mapGetters({
			album: 'album/album',
			results: 'album/searchResults'
		}),
		titleText() {
			if (this.mode === 'add') return 'Add Album';
			if (this.mode === 'edit') return 'Edit Album';
			return false;
		},
		submitButtonText() {
			if (this.mode === 'add') return 'Add';
			if (this.mode === 'edit') return 'Update';
			return false;
		},
		isDeleteButtonVisible() {
			return this.mode === 'edit';
		},
		isFormValid() {
			return !!this.selected;
		},
		doSearch() {
			if (this.isSearching) return false;
			if (this.searchTerm === this.lastSearchTerm) return false;
			return true;
		}
	},
	methods: {
		...mapActions({
			updateAlbum: 'album/updateAlbum',
			fetchAlbum: 'album/fetchAlbum',
			addAlbum: 'album/addAlbum',
			search: 'album/fetchSearchResults'
		}),
		async onSubmitButtonClick() {
			if (this.birthday) this.birthday = this.birthday.toISOString();
			const album = this.selected;
			if (this.stars) album.stars = this.stars;
			if (this.mode === 'add') {
				await this.addAlbum({ album });
			} else if (this.mode === 'edit') {
				await this.updateAlbum({ id: this.album._id, album });
			}
			debugger;
			this.emitSubmit();
		},
		onCancelButtonClick() {
			this.emitClose();
		},
		onDeleteButtonClick() {
			this.isConfirmDeleteModalVisible = true;
		},
		async onConfirmDeleteButtonClick() {
			await this.updateAlbum({ id: this.album._id, album: null });
			this.emitSubmit();
		},
		onConfirmDeleteModalClose() {
			this.isConfirmDeleteModalVisible = false;
		},
		async onSearchChange(title) {
			this.searchTerm = title;
			if (!this.searchTerm) return;
			if (this.isSearching) return;
			this.isSearching = true;
			await timeout(1000);
			console.log(`searching discogs api for: ${title}...`); // eslint-disable-line no-console
			await this.search({
				title
			});
			this.isSearching = false;
			this.lastSearchTerm = title;
		},
		onStarsChange(stars) {
			this.stars = stars;
		},
		clear() {
			this.selected = null;
		},
		async prepareToEdit() {
			if (!this.id) return;
			await this.fetchAlbum({ id: this.id });
			this.selected = this.album;
		},
		emitClose() {
			this.$emit('close');
		},
		emitSubmit() {
			this.$emit('submit');
			this.emitClose();
		}
	}
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"/>

<style lang="scss">

.Album {

	&__thumbImage {
		width: 80px;

		&--small {
			width: 30px;
		}
	}

	&__multiSelectTitle {
		transition: margin-right 1s;

		&:hover {
			margin-right: 100px;
		}
	}

}
</style>
