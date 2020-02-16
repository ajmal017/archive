<script>
// CommitChart.js
import { Bar } from 'vue-chartjs';

export default {
	extends: Bar,
	mounted() {
		// Overwriting base render method with actual data.
		this.renderChart({
			// eslint-disable-next-line max-len
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			datasets: [
				{
					label: 'GitHub Commits',
					backgroundColor: '#f87979',
					data: [1, 2, 3, 4, 5, 6, 7, 8, 9]
				}
			]
		});
	}
};
</script>

