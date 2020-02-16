const poems = 7;

const store = {
	state: {
		poems: {
			data: poems,
			loaded: (poems != null)
		}
	}
};

export default store;
