<template>
	<v-dialog
		content-class="Modal"
		height="80vh"
		:color="theme.primary"
		v-model="visible"
		@input="onDialogStateChange">

		<v-icon class="Modal__closeButton" color="highlight" v-text="'close'" @click="emitClose"/>

		<div class="Modal__inner">

			<div class="Modal__column">


				<section class="Modal__support">

					<h1 class="Modal__title">GMC relies on your help and support</h1>

					<p class="Modal__support__text">Sign up to our newsletter here:</p>

					<transition name="fade">
						<v-text-field
							v-if="!isSubmitted"
							class="Modal__email"
							label="YOUR EMAIL"
							color="alt"
							v-model="email"/>
					</transition>

					<transition name="bounce">
						<a
							v-if="isSubscribeButtonVisible"
							class="Modal__button"
							color="alt"
							@click="subscribeToNewsletter"
							v-text="'Sign Up'"/>
					</transition>

					<transition name="fade">
						<p v-if="isSubmitted" class="Modal__support__text">
							Thank you, you'll hear from us shortly!
						</p>
					</transition>

				</section>

				<section class="Modal__donate">
					<p class="Modal__donate__text">Your contributions are invaluable to our success. Join the growing numbers taking a stand now.</p>
					<a
						class="Modal__button Modal__button--donate"
						color="highlight"
						target="_blank"
						href="https://www.paypal.me/globalmediacampaign"
						v-text="'Donate'"/>

				</section>

			</div>


			<section class="Modal__column Modal__column--image"/>

		</div>
	</v-dialog>
</template>

<script>
import axios from 'axios';
import theme from '../styles/theme';
import config from '../config';

function validateEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

export default {
	props: {
		visible: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			theme,
			email: '',
			isSubmitted: false
		};
	},
	computed: {
		isSubscribeButtonVisible() {
			if (this.isSubmitted) return false;
			return (this.email && validateEmail(this.email));
		}
	},
	methods: {
		onDialogStateChange(state) {
			if (!state) this.emitClose();
		},
		emitClose() {
			this.$emit('close');
		},
		async subscribeToNewsletter() {
			if (!this.email) return;
			const url = `${config.apiBase}/newsletters/sign-up`;
			await axios.post(url, { email: this.email });
			this.isSubmitted = true;
		}

	}
};
</script>

<style lang="scss">
@import '../styles/colours';
@import '../styles/breakpoints';

.Modal {
	position: relative;

	&__closeButton {
		position: absolute;
		right: 0;
		top: 0;
		padding: 1rem;
		background: $text;
	}

	&__inner {
		height: 100%;
		display: flex;
		flex-direction: row;
		background: $background;
	}

	&__column {
		width: 50%;

		&--image {
			background-image: url('../assets/images/ifrah.jpg');
			background-size: cover;
			background-position: center;
		}
	}

	&__support {
		padding: 2rem 3rem;
		height: 60%;
		text-align: left;
		display: flex;
		flex-direction: column;

		&__text {
			font-weight: normal;
			margin-bottom: 3rem;
		}
	}

	&__title {
		font-size: 3rem;
		line-height: 3.5rem;
		margin-bottom: 2rem;
	}

	&__email {
		margin-bottom: 2rem;
	}

	&__button {
		border-radius: 2rem;
		text-transform: uppercase;
		padding: 1rem 3rem;
		background: $text;
		color: $highlight;
		transition: background-color 0.3s;
		cursor: pointer;
		width: fit-content;

		&:hover {
			background: $alt;
			color: $highlight;
		}

		&:active {
			background: $text;
		}

		&--donate {
			background: $highlight;
			color: $alt;
			width: 100%;
			text-align: center;
			transition: background-color 0.3s, color 0.3s;
			margin-bottom: 1rem;

			&:hover {
				background: $primary;
				color: $highlight;
			}

			&:active {
				background: $highlight;
			}
		}
	}

	&__donate {
		padding: 2rem 3rem;
		height: 40%;
		text-align: left;
		background: $alt;
		color: $white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		&__text {
			font-weight: bold;
			font-size: 1.6rem;
		}
	}
}

.v-dialog {
	margin: 0 5rem;
	height: 80vh;
}

.bounce-enter-active {
	animation: bounce-in .5s;
}
.bounce-leave-active {
	animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
	0% {
		transform: scale(0);
	}
	50% {
		transform: scale(1.5);
	}
	100% {
		transform: scale(1);
	}
}

.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}

</style>
