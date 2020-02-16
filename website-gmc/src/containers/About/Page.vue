<template>
	<div class="About">
		<app-header @showModal="$emit('showModal')"/>

		<div class="About__content">

			<v-container class="About__intro">
				<h1 class="About__intro__title">About Us</h1>
				<p class="About__intro__text">
					We are the Global Media Campaign to End FGM
				</p>
			</v-container>

			<media-team class="About__mediaTeam"/>

			<v-container class="About__backroomTeam">
				<h3 class="About__header">
					The Backroom Team in London
				</h3>
				<p>
					<b>Maggie O’Kane</b> - <i>Executive Director</i>
				</p>
				<p>
					<b>Naimah Hassan</b> - <i>Programme Director</i>
				</p>
				<p>
					<b>Dee Lukic</b> - <i>Finance & Office Manager</i>
				</p>
				<p>
					<b>Mary Carson</b> - <i>Social & Multimedia Producer</i>
				</p>
				<p>
					<b>Mariam Aliabadi</b> - <i>Projects/Media Production</i>
				</p>
				<p>
					<b>Charlotte Morlie</b> - <i>Projects</i>
				</p>
			</v-container>



			<v-container class="About__board">
				<h1 class="About__header">
					The Board
				</h1>
				<p class="About__board__subheader">
					Trustees
				</p>
				<div class="About__board__item">
					<h5 class="About__board__item__header">
						<b>Dexter​ ​Dias​ ​QC</b> (Chair),​​ <i>High Court Judge, Child’s Rights Advisor to Unicef, Human​ ​rights​ ​lawyer,​ ​internationally​ ​renowned​ ​author​</i>
					</h5>
					<p class="About__board__item__text">
						Dexter​ ​Dias​ ​QC​ ​is​ ​a​ ​Barrister​ ​(Queen’s​ ​Counsel)​, ​who​ ​has​ ​been​ ​instructed​ ​in​ ​some​ ​of​ ​the​ ​biggest​ ​cases of​ ​recent​ ​years​ ​involving​ ​human​ ​rights,​ ​murder,​ ​crimes​ ​against​ ​humanity,​ ​terrorism,​ ​war​ ​crimes​ ​and genocide.​ ​​​
					</p>
				</div>
				<div class="About__board__item">
					<h5 class="About__board__item__header">
						<b>Julia​ ​Cook</b>,​ ​<i>Change​ ​Management​ ​Group​</i>
					</h5>
					<p class="About__board__item__text">
						Julia​ ​Cook​ ​is​ ​a​ ​management​ ​consultant​ ​with over 20 years of experience supporting charities and building the now internationally renowned charity,  Consortia For Street Children.  Her ​company​ ​now​ ​employs​ ​40​ ​people​ ​in​ ​the​ ​UK​ ​and​ ​the Middle​ ​East.​
					​</p>
				</div>
				<div class="About__board__item">
					<h5 class="About__board__item__header">
						<b>Alan​ ​Rusbridger</b>,​ <i>​​​former​ ​Editor-in-Chief​ ​of​ ​the​ ​Guardian</i>
					</h5>
					<p class="About__board__item__text">
						Now​ ​Principal​ ​of​ ​Lady​ ​Margaret​ ​College, Oxford​ ​University​ ​and​ ​Chair​ ​of​ ​the​ ​Reuters​ ​Institute​ ​for​ ​the​ ​Study​ ​of​ ​Journalism​
					​</p>
				</div>
				<div class="About__board__item">
					<h5 class="About__board__item__header">
						<b>Katrin Macmillan</b>, <i>founder of Projects for All and Hello Hubs</i>
					</h5>
					<p class="About__board__item__text">
						Katrin is the Founder of Projects For All, an NGO which takes an entrepreneurial approach to community led development
					​</p>
				</div>
				<div class="About__board__item">
					<h5 class="About__board__item__header">
						<b>Martin Doyle</b>, <i>Headmaster and Governor of Riverside School, Haringey, London</i>
					</h5>
					<p class="About__board__item__text">
						Martin has been involved in work for charities for many years: as chair of ‘Out and About’ (a school-based charity funding residential trips for low-income families)
					​</p>
				</div>
				<div class="About__board__item">
					<h5 class="About__board__item__header">
						<b>Jeremy Cox</b>, <i>Chartered Accountant</i>
					</h5>
					<p class="About__board__item__text">
						Jeremy is a Chartered Accountant qualifying with Brebners who specialise in media and entertainment.
					​</p>
				</div>
				<div class="About__board__item">
					<h5 class="About__board__item__header">
						<b>Stephen Dawson</b>, <i>Charity Good Practice Advisor</i>
					</h5>
					<p class="About__board__item__text">
						Stephen Dawson, a former financial service consultant who holds an OBE for his services to philanthropy is one of the Global Media Campaign’s private funders.
					​</p>
				</div>
				<div class="About__board__item">
					<h5 class="About__board__item__header">
						<b>Virginia Henley</b>, <i>Lawyer specialised in charity law and social entreprise</i>
					</h5>
				</div>
			</v-container>

			<app-footer/>

		</div>

	</div>
</template>

<script>
import AppHeader from '../../components/AppHeader';
import MediaTeam from './components/MediaTeam';
import AppFooter from '../../components/AppFooter';

export default {
	components: {
		AppHeader,
		MediaTeam,
		AppFooter
	}
};
</script>

<style lang="scss">
@import '../../styles/colours';
@import '../../styles/breakpoints';

.About {
	margin-top: 5.5rem;
	background-color: $background;

	&__intro {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0;
		padding-top: 4rem;
		font-size: 1.7rem;
		margin-bottom: 3rem;

		&__title {
			color: $primary;
		}

		&__text {
			width: 60%;
			font-weight: bold;
			line-height: 1.9rem;
			text-align: left;
			line-height: 2.2rem;
		}
	}

	&__mediaTeam {
		margin-bottom: 4rem;
		padding: 0 1rem;
	}

	&__backroomTeam {
		padding: 0;
		text-align: left;
		font-size: 1.3rem;
		margin-bottom: 4rem;
	}

	&__header {
		margin-bottom: 2rem;
		font-size: 1.8rem;
	}

	&__board {
		text-align: left;
		padding: 0;
		margin-bottom: 4rem;

		&__subheader {
			font-style: italic;
		}

		&__item {

			&__header {
				font-weight: normal;
				margin-bottom: 0.5rem;
			}

			&__text{
				line-height: 1.2rem;
				font-size: 1rem;
			}
		}
	}
}

</style>
