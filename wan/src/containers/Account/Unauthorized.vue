<template>
	<v-container class="Unauthorized">

		<span class="Unauthorized__title">Please <a @click="onLoginClick">login</a> or <a @click="onSignupClick">sign up!</a></span>

	</v-container>

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
};
</script>


<style lang="scss">

@import '../../styles/index.scss';

.Unauthorized {
	display: flex;
	justify-content: center;
	align-self: center;

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
