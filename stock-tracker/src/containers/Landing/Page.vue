<template>
	<div class="Landing">

		<hero-image
			@signUp="onHeroSignup"/>

		<sign-up-modal ref="signUpModal"/>

		<marquee class="Landing__tagLine">
			1 BTC = 7,656 USD
		</marquee>

		<b-row class="App__inner App--paddingBottom">
			<b-col>

				<bar-graph/>

			</b-col>
			<b-col>

				<!-- eslint-disable-next-line max-len -->
				<iframe id="tradingview_73c65" src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_73c65&amp;symbol=COINBASE%3ABTCUSD&amp;interval=D&amp;symboledit=1&amp;saveimage=1&amp;toolbarbg=f1f3f6&amp;studies=%5B%5D&amp;hideideas=1&amp;theme=Light&amp;style=1&amp;timezone=Etc%2FUTC&amp;studies_overrides=%7B%7D&amp;overrides=%7B%7D&amp;enabled_features=%5B%5D&amp;disabled_features=%5B%5D&amp;locale=en&amp;utm_source=www.deluxcoin.com&amp;utm_medium=widget&amp;utm_campaign=chart&amp;utm_term=COINBASE%3ABTCUSD" style="width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;" frameborder="0" allowtransparency="true" scrolling="no" allowfullscreen=""></iframe>


			</b-col>
		</b-row>

		<b-row class="App__inner App--paddingBottom">

			<b-col>

				<line-graph/>

			</b-col>

			<b-col>

				<company-search/>

			</b-col>

		</b-row>

	</div>
</template>

<script>
import { mapActions } from 'vuex';
import HeroImage from './components/HeroImage';
import SignUpModal from './components/SignUpModal';
import BarGraph from '../../components/graphs/Bar';
import LineGraph from '../../components/graphs/Line';
import CompanySearch from './components/CompanySearch';

export default {
	components: {
		HeroImage,
		SignUpModal,
		BarGraph,
		LineGraph,
		CompanySearch
	},
	methods: {
		...mapActions({
			getCompany: 'getCompany'
		}),
		onHeroSignup() {
			this.$refs.signUpModal.openModal();
		}
	}
};

</script>

<style lang="scss">
@import '../../settings';

$marqueeTextColour: white;
$marqueeBackground: black;
$marqueeHeight: 32px;

.Landing {

	&__tagLine {
		background: $marqueeBackground;
		color: $marqueeTextColour;
		position: relative;
		margin-bottom: 60px;
		height: $marqueeHeight;
		line-height: $marqueeHeight;
	}

}

</style>
