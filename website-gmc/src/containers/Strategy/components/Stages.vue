<template>
	<section class="Stages">
		<h3 class="Stages__title">Our End FGM media model has three stages:</h3>

		<div class="Stages__inner">

			<div class="Stages__stage">

				<div class="Stages__stage__bubble">
					<h3 class="Stages__stage__bubble__title">
						National High level gathering on FGM
					</h3>
					<span class="Stages__stage__bubble__line"/>
					<span class="Stages__stage__bubble__text">
						1 Day<br/>
						150 People
					</span>
				</div>

				<div class="Stages__stage__text">
					We bring together high-level leaders (including Heads of State, national Religious Leaders and high-profile media personalities) to make FGM a national priority.
				</div>

			</div>

			<div class="Stages__stage">

				<div class="Stages__stage__bubble">
					<h3 class="Stages__stage__bubble__title">
						Religious Leaders Media Training Academy
					</h3>
					<span class="Stages__stage__bubble__line"/>
					<span class="Stages__stage__bubble__text">
						5 Days<br/>
						35 Participating
					</span>
				</div>

				<p class="Stages__stage__text">
					Over five days, we provide practical media campaign training to 35 of the most influential broadcasters, activists and religious leaders.
				</p>

			</div>

			<div class="Stages__stage">

				<div class="Stages__stage__bubble">
					<h3 class="Stages__stage__bubble__title">
						Direct Action Media Grants
					</h3>
					<span class="Stages__stage__bubble__line"/>
					<span class="Stages__stage__bubble__text">
						3 Years
					</span>
				</div>

				<p class="Stages__stage__text">
					Direct Action Media Grants are small grants, from $300 to $1000, that enable graduates from the Academy to create content and buy airtime for broadcast for three years.
				</p>

			</div>

		</div>
	</section>
</template>

<style lang="scss">
@import '../../../styles/colours';
@import '../../../styles/breakpoints';

.Stages {
	display: flex;
	flex-direction: column;
	align-items: center;

	&__title {
		margin-bottom: 2rem;
	}

	&__inner {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		padding: 2rem 10%;
	}

	&__stage {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;

		&__bubble {
			background-color: $alt;
			border-radius: 100%;
			width: 20rem;
			height: 20rem;
			color: $highlight;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-evenly;
			padding: 3rem;

			&__title {
				font-size: 1.2rem;
			}

			&__line {
				height: 0.3rem;
				width: 3rem;
				background: $highlight;
			}

			&__text {
				text-transform: uppercase;
				font-size: 1.1rem;
				letter-spacing: 0.1rem;
			}
		}

		&__text {
			padding: 2rem 10%;
		}
	}
}

</style>