<template>
	<v-app id="app" class="App">

		<sidebar/>

		<router-view class="App__content"/>

	</v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Sidebar from '@/components/Sidebar.vue';

export default {
	components: {
		Sidebar,
	},
	computed: {
		...mapGetters({
			account: 'account/account'
		})
	},
	methods: {
		redirectIfNoAuth() {
			if (this.$route.name === 'account.unauthorized') return;
			if (!this.account) this.$router.push({ name: 'account.unauthorized'});
		}
	},
	watch: {
		account: {
			immediate: true,
			handler: 'redirectIfNoAuth'
		},
		$route: {
			immediate: true,
			handler: 'redirectIfNoAuth'
		}
	}
};

</script>

<style lang="scss">
@import './styles/index.scss';

.App {
	font-family: 'Nunito', 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	width: 100%;
	color: $grey;
	background: $white-off;
	display: flex;
	overflow: hidden;
	overflow-wrap: break-word;

	>.application--wrap{ flex-direction: row; }

	&__content {
		width: 100%;
		max-height: 100vh;
		overflow: auto;
	}

	&__title {
		width: 100%;
		font-weight: 300;
		font-size: 1.8rem;
		text-align: left;
		margin-bottom: 1rem;
	}

	&__info {
		align-self: flex-start;
		justify-content: space-between;

		.btn {
			font-family: 'Nunito';
			font-weight: 600;
			color: $grey;
			border: none;
			background-color: $white2;
			box-shadow: 0px 3px 10px rgba(0,0,0,0.16);
		}
	}

	&__card {
		margin: 1rem;
		width: 100%;
		text-align: left;
	}

	&__label {
		align-self: flex-start;
		font-weight: bold;
		text-transform: uppercase;
		display: block;
		text-align: left;

		&--inline {
			display: inline-block;
			margin-right: 1rem;
		}
	}

	&__loader {
		width: 3rem;
		height: 3rem;
		animation: spin 1000ms linear infinite;

		&.fa-icon {
			display: flex;
			margin: auto;
		}
	}

	&__formGroup {
		width: 100%;

		.col-form-label {
			text-align: left;
		}
	}

	&__submit {
		align-self: flex-end;

		&--text {
			width: 100%;
			text-align: right;
			display: inline-block;
			margin-right: 1rem;
		}

	}

	&__chip {
		padding: 0.2rem 1.3rem;
	}

	h4 {
		font-size: 1.25rem;
	}

}

@keyframes spin {
	from {transform:rotate(0deg);}
	to {transform:rotate(360deg);}
}

</style>
