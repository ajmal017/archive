<template>
	<v-dialog
		content-class="HolisticModal"
		:value="visible"
		persistent
		@input="$emit('close')">

		<v-icon
			class="HolisticModal__closeIcon"
			color="white"
			v-text="'close'"
			large
			@click="$emit('close')"/>

		<v-card class="HolisticModal__inner">
			<slot @close="$emit('close')"/>
		</v-card>

	</v-dialog>
</template>

<script>

export default {
	props: {
		visible: {
			type: Boolean
		}
	}
};
</script>


<style lang="scss">
@import "../styles/colours.scss";

.HolisticModal {
	height: 85%;
	width: 98%;
	overflow: visible;
	position: relative;


	&__closeIcon {
		position: absolute;
		top: -3rem;
		right: 0;
	}

	&__inner {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
		background-color: $background;
	}

}

</style>
