import Vue from 'vue';

export default {

	toast: (message) => {
		Vue.toasted.show(message, {
			position: 'bottom-right',
			duration: '3000',
		});
	},

};
