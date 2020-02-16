<template>
	<b-container class="Unauthorized">

		<span class="Unauthorized__title">Please <b-link @click="onLoginClick">login</b-link> or <b-link @click="onSignupClick">sign up!</b-link></span>

	</b-container>

</template>

<script>
export default {
	methods: {
		onLoginClick() {
			this.$router.push({ query: { login: null } });
		},
		onSignupClick() {
			this.$router.push({ query: { signUp: null } });
		}
	}
}
</script>


<style lang="scss">

@import '../../styles/index.scss';

.Unauthorized {
	@extend .flexbox;
	justify-content: center;
	align-self: center;

	@media all and (min-width: $tablet) {
		margin-top: 0;
	}

	&__title {
		font-size: 2rem;
		width: auto;
		margin-left: auto;
		margin-right: auto;
	}

	a:hover {
		text-shadow: $blue-light 1px 1px;
	}

}

</style>

