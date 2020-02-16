<template>
	<section class="Quote">

		<div class="Quote__image"/>

		<div class="Quote__quote">
			<h1 class="Quote__words">"We’ve got this. We don’t need minders - we need enablers."</h1>
			<span class="Quote__author">Lucy-Ann Ganda</span>
			<span class="Quote__author">Head of Broadcasting, Sierra Leone Broadcasting Company</span>
		</div>
	</section>
</template>

<style lang="scss">
@import '../../../styles/colours';

.Quote {

	display: flex;
	flex-direction: row;
	justify-content: center;

	&__image {
		width: 30%;
		height: 30rem;
		background-position: center;
		background-size: cover;
		background-image: url('../../../assets/images/lucy-Colour.jpg');
	}

	&__quote {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 2rem;
		margin-left: 2rem;
	}

	&__words{
		text-align: left;
		font-size: 3.0rem;
		line-height: 3.2rem;
		font-weight: bold;
		margin-bottom: 1rem;
	}

	&__author {
		color: $alt;
		text-align: left;
		font-weight: bold;
		font-size: 1.5rem;
	}
}
</style>
