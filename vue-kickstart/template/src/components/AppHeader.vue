<template>
	<header class="Header">

		<div class="Header__inner">

			<router-link class="Header__title" to="/">
				Michael&nbsp;<span class="Header__title--light">- Software Engineer</span>
			</router-link>

			<b-link
				href="https://github.com/michaelfitzhavey"
				title="Check me out on github!"
				target="_blank">
				<img
					class="Header__icon"
					src="../assets/icons/github.svg"
					alt="github/michaelfitzhavey"/>
			</b-link>

		</div>

	</header>
</template>

<style lang="scss">

@import '../styles/index.scss';

.Header {
	width: 100%;
	height: $headerHeight;
	position: fixed;
	top: 0;
	background: $white;

	@media all and (min-width: $desktop) {
		height: $headerHeightDesktop;
	}

	&__inner {
		@extend .inner;
		justify-content: space-between;
	}

	&__title {
		font-weight: bold;
		margin-right: auto;

		&:hover {
			text-decoration: none;
		}

		@media all and (min-width: $tablet) {
			font-size: 1.5rem;
		}

		&--light {
			font-weight: normal;
			color: $orange;
		}

	}

	&__icon {
		width: 32px;

		@media all and (min-width: $desktop) {
			width: 48px;
		}
	}

}
</style>
