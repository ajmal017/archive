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

		<div class="HolisticModal__inner">

			<section class="HolisticModal__sidebar">
				<div class="HolisticModal__sidebar__inner">

					<h4 class="HolisticModal__title">
						<slot name="title"/>
					</h4>

					<slot name="sidebar"/>
				</div>
			</section>

			<section class="HolisticModal__content">

				<div class="HolisticModal__content__inner">
					<slot name="content"/>
				</div>

				<div class="HolisticModal__content__footer">
					<slot name="footer"/>
				</div>

			</section>

			<section class="HolisticModal__panel">
					<slot name="panel"/>
			</section>

		</div>

	</v-dialog>
</template>

<script>

export default {
	props: {
		visible: {
			type: Boolean
		}
	}
}
</script>


<style lang="scss">
@import "../../styles/index.scss";

.HolisticModal {
	height: 85%;
	width: 98%;
	overflow: visible;
	position: relative;

	&__divider {
		background-color: $white;
		height: 2px;
	}


	&__closeIcon {
		position: absolute;
		top: -3rem;
		right: 0;
	}

	&__inner {
		display: flex;
		overflow: hidden;
		height: 100%;
	}

	&__title {
		color: $white;
		letter-spacing: 1px;
		text-transform: uppercase;
		margin-bottom: 1.5rem;
		padding: 0 2rem;
		position: relative;

		&__fabButton {
			right: 1rem;
			top: -3rem;
		}
	}

	&__sidebar {
		height: 100%;
		background-color: $grey-dark;
		padding: 5rem 0;
		color: $white;
		overflow-y: auto;
		width: 44rem;

		&__inner {
			height: fit-content;
			display: flex;
			flex-direction: column;
		}

	}

	&__content {
		background-color: $white;
		padding-top: 5rem;
		color: $grey-dark;
		overflow-y: auto;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		&__inner {
			padding: 0 2rem;
			overflow-y: auto;
			height: 100%;
		}


		&__footer {
			width: 100%;
			background-color: lighten($grey-light, 1);
			display: flex;
			flex-direction: row;

			> * {
				padding: 2rem 2rem;
			}
		}

	}

	&__panel {
		background-color: $grey-pale;
		padding: 2rem;
		padding-top: 5rem;
	}

}

</style>
