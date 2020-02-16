<template>
	<section class="Value">

		<div class="Value__box">
			<span class="Value__cost">£1</span>
			<span class="Value__text">Helped reach 2,273 people on Zero Tolereance Day.</span>
			<span class="Value__button" @click="$emit('showModal')">Make a difference</span>
		</div>

		<div class="Value__box">
			<span class="Value__cost">£100</span>
			<span class="Value__text">Could fund a workshop on FGM for faith leaders.</span>
			<span class="Value__button" @click="$emit('showModal')">Make a difference</span>
		</div>

		<div class="Value__box">
			<span class="Value__cost">$300</span>
			<span class="Value__text">Could fund a radio programme in Nigeria on FGM for 10 broadcasts.</span>
			<span class="Value__button" @click="$emit('showModal')">Make a difference</span>
		</div>

	</section>
</template>

<style lang="scss">
@import '../../../styles/colours';
@import '../../../styles/breakpoints';

.Value {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	font-weight: bold;
	text-align: center;

	&__box {
		width: 23rem;
		height: 23rem;
		padding: 3rem 1rem;
		box-shadow: 0 0 0.8rem lighten($text, 30%);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	&__cost {
		padding: 0.5rem;
		border: 2px solid $text;
		width: 40%;
		font-size: 1.3rem;
	}

	&__text {
		color: $primary;
	}

	&__button {
		text-transform: uppercase;
		width: 90%;
		background: $text;
		color: $background;
		border-radius: 2rem;
		font-size: 1rem;
		padding: 1rem 0;
		cursor: pointer;
		transition: background-color 300ms;

		&:hover {
			background: $alt;
		}

		&:active {
			transition: none;
			background-color: $text;
		}
	}
}

</style>
