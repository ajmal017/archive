<template>
	<div class="Landing">

		<menu-bar/>

		<section class="Landing__content">

			<h2 class="Landing__title">
				Swipe. Crush. Ship.
			</h2>

			<b-row class="Landing__row">
				<b-col>
					<b-img class="Landing__image"
						rounded
						src="/static/screen-1.png"/>
				</b-col>
				<b-col>
					<h3 class="Landing__subTitle">
						Swipe on your friends and friends of friends ;)
					</h3>
					<ul class="Landing__text">
						<li>
							Swipe on people whom your friends are friends with
						</li>
						<li>
							Swipe on your friends (or secret crushes!)
						</li>
					</ul>
				</b-col>
			</b-row>

			<b-row class="Landing__row">
				<b-col>
					<ul class="Landing__text">
						<li>
							Search for your crush
						</li>
						<li>
							See their profile
						</li>
						<li>
							Swipe on them and wait for them to match with you!
						</li>
					</ul>
				</b-col>
				<b-col>
					<b-img class="Landing__image"
						rounded
						src="/static/screen-2.png"/>
				</b-col>
			</b-row>

			<b-row class="Landing__row">
				<b-col>
					<b-img class="Landing__image"
						rounded
						src="/static/screen-3.png"/>
				</b-col>
				<b-col>
					<ul class="Landing__text">
						<li>
							Want your friends opinion on someone you've swipe on?
						</li>
						<li>
							Let your friends know what you think of them as a couple!
						</li>
						<li>
							Cute together? Ship them! Not so much? Tell them why!
						</li>
					</ul>
				</b-col>
			</b-row>

		</section>

	</div>
</template>

<script>
import MenuBar from '../../components/MenuBar';

export default {
	components: {
		MenuBar
	}
};
</script>

<style lang="scss">
.Landing {
	background-image: url('/static/happy-couple.jpg');
	background-size: contain;
	display: block;
	width: 100%;
	float: left;
	z-index: 1;

	&__content {
		margin: auto;
		// This value is referenced in MenuBar's setOpacity function as imageHeight
		margin-top: 1080px;
		background: white;
		width: 1140px;
		padding: 0 calc((100% - 1140px) / 2);
		box-sizing: content-box;
		color: #c63840;
		float: left;
	}

	&__title {
		font-size: 82px;
		text-align: center;
		margin-top: 8px;
		margin-bottom: 32px;
	}

	&__subTitle {
		font-weight: bold;
		font-size: 40px;
		margin-bottom: 16px;
	}

	&__row {
		margin-bottom: 64px;
	}

	&__text {
		font-size: 32px;
	}

	&__image {
		width: 400px;
	}
}
</style>
