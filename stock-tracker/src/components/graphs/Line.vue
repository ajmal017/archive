<script>
// CommitChart.js
import { Line } from 'vue-chartjs';

export default {
	extends: Line,
	data() {
		return {
			// inspired by: https://www.sitepoint.com/introduction-chart-js-2-0-six-examples/
			config: {
				options: {
					responsive: true,
    				lineTension: 1,
					animation: {
						duration: 0 // general animation time
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true,
								padding: 25
							}
						}]
					}
				},
				labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
				datasets: [{
					label: 'oranges',
					data: [2, 29, 5, 5, 2, 3, 10],
					backgroundColor: 'rgba(54,73,93,.5)'
				}]
			}
		};
	},
	mounted() {
		// Overwriting base render method with actual data.
		this.renderChart(this.config);
	}
};
</script>
