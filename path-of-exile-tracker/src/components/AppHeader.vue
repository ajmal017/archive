<template>
<div class="Header">
	<div class="App__inner Header__inner">

		<b-link to="/">
			<h1 class="Header__title App--center">test</h1>
		</b-link>

		<section class="Header__auth App--center">
			<span
				v-if="user"
				v-text="user.email"/>

			<b-button
				v-text="authButtonText"
				@click="onAuthButtonClick"
				variant="primary--outline"/>
		</section>

	</div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	computed: {
		...mapGetters({
			user: 'auth/user'
		}),
		authButtonText() {
			if (!this.user) return 'Sign In';
			return 'Sign Out';
		}
	},
	methods: {
		...mapActions({
			signOut: 'auth/signOut',
			signIn: 'auth/signIn'
		}),
		onAuthButtonClick() {
			if (this.user) {
				this.signOut();
			} else {
				this.signIn();
			}
		}
	}

};
</script>


<style lang="scss">
@import '../settings';

$headerHeight: $Header-Height;
$backgroundColour: $Theme-Colour;
$textColour: $White;

.Header{
	background: $backgroundColour;
	height: $headerHeight;
	position: fixed;
	color: $textColour;
	width: 100%;
	z-index: 1;

	&__inner {
		height: 100%;
	}

	&__title{
		height: $headerHeight / 2;
		color: $textColour;
		margin: auto;
		display: inline-block;
		left: 0;
	}

	&__auth {
		right: 0;
	}

}

</style>
