<template>
	<v-app
		id="app"
		class="App">

		<v-navigation-drawer
			v-model="isSidebarVisible"
			class="grey lighten-4"
			fixed
			clipped
			app>
			<app-sidebar
				class="App__sidebar"
				@close="toggleSidebarVisible"/>
		</v-navigation-drawer>

		<v-toolbar app fixed clipped-left>
			<app-header @toolbarClick="toggleSidebarVisible"/>
		</v-toolbar>

		<v-content class="App__content grey lighten-4">
			<router-view class="App__wrapper"/>
		</v-content>

		<notifications/>

	</v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import AppHeader from './components/AppHeader';
import AppSidebar from './components/AppSidebar';

export default {
	name: 'App',
	components: {
		AppHeader,
		AppSidebar
	},
	data() {
		return {
			isSidebarVisible: false
		};
	},
	computed: {
		...mapGetters({
			user: 'account/user'
		})
	},
	methods: {
		redirectIfNotAuthorized() {
			const routeName = this.$route.name;
			const openRoutes = [
				'user.create',
				'user.detail',
				'post.list',
				'post.detail'
			];
			if (!openRoutes.includes(routeName) && !this.user) {
				this.$router.push('/account/create');
			}
		},
		toggleSidebarVisible() {
			this.isSidebarVisible = !this.isSidebarVisible;
		}
	},
	watch: {
		$route() {
			this.redirectIfNotAuthorized();
		},
		$user() {
			this.redirectIfNotAuthorized();
		}
	},
	created() {
		this.redirectIfNotAuthorized();
	}
};
</script>

<style lang="scss">
@import './settings';

$textColour: $Text-Colour;
$backgroundColour: $Background-Colour;
$dangerColour: $Danger-Colour;
$fontFamily: $Font-Family;
$frameWidth: $Frame-Width;
$tabletWidth: $Tablet-Width;
$mobileWidth: $Mobile-Width;

#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.App {
	background: $backgroundColour;
	font-family: $fontFamily;
	color: $textColour;

	&__inner {
		position: relative;
		height: 100% !important;
		width: 95% !important;
		margin-left: 2.5% !important;
		margin-right: 2.5% !important;

		@media all and (min-width: $tabletWidth) {
			width: 90% !important;
			margin-left: 5% !important;
			margin-right: 5% !important;
		}

		@media all and (min-width: $frameWidth) {
			width: 80% !important;
			margin-left: 10% !important;
			margin-right: 10% !important;
		}

	}

	&__card {
		padding: 8px;
		margin-bottom: 3rem;
		position: relative;
	}

	&__content {
		padding-top: 64px;
		display: block;
		min-height: calc(100vh - 64px);
	}
	&__sidebar {
		width: 100%;
		height: 100%;
	}

	&__wrapper {
		width: 100%;
		padding: 1rem 0;
		float: left;

		@media all and (min-width: $tabletWidth) {
			width: calc(100% - 2rem);
			padding: 0;
			margin: 1rem;
		}
	}

	&__toolbar {
		float: left;
		width: 100%;
		margin-bottom: 1rem;

		@media all and (min-width: $tabletWidth) {
			margin-bottom: 2rem;
		}

		&__title {
			float: left;
			max-width: 60%;
			text-overflow: ellipsis;
			margin-bottom: 1rem;
			clear: both;
			font-size: 2rem !important;

			@media all and (min-width: $tabletWidth) {
				font-size: 3rem !important;
			}

		}

		&__avatar {
			float: left;
			clear: both;
			margin-bottom: 1rem;

			@media all and (min-width: $tabletWidth) {
				clear: none;
				margin-left: 3rem;
			}

		}

		&__button {
			float: left;
			text-decoration: none !important;
			clear: both;
			margin: 0;
			margin-bottom: 1rem;

			@media all and (min-width: $tabletWidth) {
				float: right;
				margin-left: 1rem;
				clear: none;
			}

			&--iconOnly {
				min-width: 50px;
			}
		}

	}

	&--center {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	&--invalid {
		color: $dangerColour;
	}

}

#app {
	.v-navigation-drawer__border {
		display: none
	}

	.v-bottom-sheet {
		background: white;
	}

	a{
		&:hover {
			text-decoration: none;
		}
	}

	p {
		font-size: 16px;
	}
}

</style>
