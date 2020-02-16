import matchesData from '../../lib/matches';

export default {
	namespaced: true,
	state: {
		matchesData
	},
	getters: {
		matchesData: state => state.matchesData
	}
};
