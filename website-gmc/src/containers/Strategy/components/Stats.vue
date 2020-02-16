<template>
	<section class="Stats">

		<v-container class="Stats__inner">

			<div class="Stats__section">
				<h1 class="Stats__count">8</h1>
				<span class="Stats__line"/>
				<span>Countries where our model has been implemented</span>
			</div>

			<div class="Stats__section">
				<h1 class="Stats__count">375</h1>
				<span class="Stats__line"/>
				<span>Media Campaigners trained</span>
			</div>

			<div class="Stats__section">
				<h1 class="Stats__count">675</h1>
				<span class="Stats__line"/>
				<span>Million people have seen and heard our campaigner's anti-FGM message</span>
			</div>

		</v-container>

	</section>
</template>

<style lang="scss">
@import '../../../styles/colours';
@import '../../../styles/breakpoints';

.Stats {
	background-color: $primary;

	&__inner {
		padding: 0;
		display: flex;
		flex-direction: row;
	}


	&__section {
		width: 100%;
		color: $highlight;
		padding: 5% 8%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	&__count {
		font-size: 3.5rem
	}

	&__line {
		width: 3rem;
		height: 0.3rem;
		background-color: $highlight;
		align-self: center;
		margin-bottom: 1rem;
	}
}
</style>