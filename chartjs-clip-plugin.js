// Get the chart variable
var Chart = typeof(Chart) === 'function' ? Chart : window.Chart;
var helpers = Chart.helpers;

// Take the clip namespace of Chart
var clipNS = Chart.Clip || {};

var defaultOptions = clipNS.defaults = {
	enabled: false
};

var clipPlugin = {
	beforeDatasetsDraw: function(chartInstance) {
		var options = chartInstance.options;
		options.clip = helpers.getValueOrDefault(options.clip, clipNS.defaults)

		if (options.clip.enabled) {
			var ctx = chartInstance.chart.ctx;
			var chartArea = chartInstance.chartArea;
			ctx.save();
			ctx.beginPath();
			ctx.rect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
			ctx.clip();
		}
	},

	afterDatasetsDraw: function(chartInstance) {
		chartInstance.chart.ctx.restore();
	}
};

Chart.pluginService.register(clipPlugin);