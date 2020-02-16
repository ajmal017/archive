<template>
	<div class="Album">

		<full-page ref="albumPage" :options="fullPageOptions">

			<list/>

			<detail :doFetch="false"/>

		</full-page>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AppLoader from '../../components/AppLoader';
import List from './components/List';
import Detail from './components/Detail';

export default {
	components: {
		AppLoader,
		List,
		Detail
	},
	watch: {
		async $route() {
			this.goToDetail();
		},
		user() {
			this.fetch();
		}
	},
	data() {
		return {
			fullPageOptions: {
				licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
				paddingTop: '90px',
				// We set css3 to false so allow bootstrap-modals to work even when placed within the FullPage wrapper
				css3: false,
				anchors: [
					'list',
					'detail'
				],
				keyboardScrolling: false,
				normalScrollElements: '#AlbumList',
				sectionsColor: [
					'#ffcc66',
					'#DB2929'
				],
			}
		};
	},
	computed: {
		...mapGetters({
			user: 'auth/user'
		})
	},
	methods: {
		...mapActions({
			fetchAlbums: 'album/fetchAlbums',
			fetchAlbum: 'album/fetchAlbum'
		}),
		async fetch() {
			if (!this.user) return;
			await this.fetchAlbums();
		},
		async goToDetail() {
			if (!this.$route.params.id) return;
			await this.fetchAlbum({ id: this.$route.params.id });
			await this.$refs.albumPage.api.moveSectionDown();
			// the following line seems to add the id back to the url somehow? -Yay
			this.$router.history.push({});
		}
	},
	created() {
		this.fetch();
		if (this.$route.params.id) this.goToDetail();
	}
};
</script>
