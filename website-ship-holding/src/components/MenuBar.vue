<template>
	<header class="MenuBar">

		<section class="MenuBar__inner">

			<b-img class="MenuBar__logo"
				src="/static/logo.png"
				thumbnail
				fluid/>

			<div class="MenuBar__center">

				<h1 class="MenuBar__title">
					Ship.
				</h1>

				<h2 class="MenuBar__subTitle">
					Coming soon to UCL
				</h2>

			</div>

			<div class="MenuBar__form">

				<b-input class="MenuBar__input"
					type="email"
					:disabled="submitted"
					@keyup.enter.native="submitEmail"
					v-model="email"/>

				<b-button class="MenuBar__button"
				variant="outline-success"
					v-text="'Sign Up!'"
					:disabled="submitted"
					@click.prevent="submitEmail"/>

			</div>

		</section>

	</header>
</template>

<script>
import Firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyAbm7-uLDKGBdBbYrrWzDutc2tNwdj3OTc',
	authDomain: 'newagent-1cb47.firebaseapp.com',
	databaseURL: 'https://newagent-1cb47.firebaseio.com',
	projectId: 'newagent-1cb47',
	storageBucket: 'newagent-1cb47.appspot.com',
	messagingSenderId: '818684151536'
};
const app = Firebase.initializeApp(firebaseConfig);
const db = app.database();
const emailsRef = db.ref('emails');

export default {
	data() {
		return {
			emailsRef,
			email: '',
			submitted: false
		};
	},
	mounted() {
		window.addEventListener('scroll', () => {
			this.setOpacity(window.scrollY);
		});
	},
	methods: {
		setOpacity(scrollHeight) {
			const maxOpacity = 0.99;
			// imageHeight comes from the padding given to the element with the class: Landing__content
			const imageHeight = 1080;
			const opacity = maxOpacity * (1 - (scrollHeight / imageHeight));
			this.$el.style.opacity = opacity;
		},
		async submitEmail() {
			console.warn('in submitEmail');
			if (!this.email) return;
			if (this.submitted) return;
			await this.emailsRef.push(this.email);
			this.submitted = true;
			// eslint-disable-next-line no-alert
			alert('Thank you, we\'ll be in touch shortly');
		}
	}
};
</script>

<style lang="scss">

.MenuBar {
	padding: 24px 0;
	width: 100%;
	background: #fff;
	position: fixed;
	z-index: 100;

	&:hover{
		transition: opacity 0.3s;
		opacity: 1 !important;
	}

	&__inner {
		width: 1140px;
		margin: auto;
		position: relative;
	}

	&__logo {
		width: 150px;
	}

	&__center {
		position: absolute;
		top: 16px;
		left: 50%;
		transform: translateX(-50%);
	}

	&__title {
		font-size: 80px;
		color: #000;
		margin: auto;
		text-align: center;
		margin-bottom: 16px;
	}

	&__subTitle {
		font-size: 20px;
		font-weight: bold;
		color: #c63840;
		text-transform: uppercase;
	}

	&__form {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	&__input {
		width: 340px;
		margin-bottom: 16px;
	}

	&__button {
		float: right;
	}
}

</style>
