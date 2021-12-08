var jsonData;
var storageKey = algorithm;
var storageData = localStorage.getItem(storageKey);
if(storageData!=null){
	storageData = $.parseJSON(storageData);
	hashrate = storageData[0];
	powerConsumption = storageData[1];
	$('#hashrate').val(hashrate);
	$('#powerConsumption').val(powerConsumption);
	quickLoad = 1;
}

var storageKeyHistory = 'minerstat-coins-history';
var storageDataHistory = localStorage.getItem(storageKeyHistory);
var coinCheck = coinTag;
if(coinTwo!=''){
	coinCheck = coinCheck + '+' + coinTwo;
}
if(storageDataHistory!=null && storageDataHistory!=''){
	if(storageDataHistory.indexOf(coinCheck)!=-1){
		storageDataHistory = storageDataHistory.replace(coinCheck + ',','');
	}
	storageDataHistory += coinCheck + ',';
	var storageDataHistoryArray = storageDataHistory.split(',');
	if(storageDataHistoryArray.length>11){
		storageDataHistoryArray.shift();
	}
	storageDataHistory = storageDataHistoryArray.join(',');
}else{
	storageDataHistory = coinCheck + ',';
}
localStorage.setItem(storageKeyHistory, storageDataHistory);

$('.button.green').click(function(){
	
	var hashrateVal = $('#hashrate').val();
	var powerVal = $('#powerConsumption').val();
	localStorage.setItem(storageKey,'[' + hashrateVal + ',' + powerVal + ']');

	$('.loader_frame').show();
});

$('#currency').change(function(){
	currency = $(this).val();
	$('#units_currency').html($(this).val() + '/kWh');
});

function loadTable(){
	var nonce = $('#nonce').val();
	var data = '';

	$.post(window.location.href, { chart: '1', nonce: nonce, hashrate: hashrate, powerConsumption: powerConsumption, poolFee: poolFee, currency: currency, electricityCosts: electricityCosts }, function(data){
		
		jsonData 			= $.parseJSON(data);

		var last1hReward 	= jsonData['last1hReward'];
		var last1hIncome 	= jsonData['last1hIncome'];
		var last1hCosts 	= jsonData['last1hCosts'];
		var last1hProfit 	= jsonData['last1hProfit'];
		
		var toFixedReward = 8;
		if(last1hReward>100){
			toFixedReward = 2;
		}
		
		last1hReward 		= last1hReward.toFixed(toFixedReward) + ' ' + coin;
		last1hIncome 		= last1hIncome.toFixed(4) + ' ' + currency;
		last1hCosts 		= '-' + last1hCosts.toFixed(2) + ' ' + currency;
		last1hProfit 		= last1hProfit.toFixed(4) + ' ' + currency;
		
		if(coinTwo!=''){
			var last1hRewardTwo 	= jsonData['last1hRewardTwo'];
			var last1hIncomeTwo 	= jsonData['last1hIncomeTwo'];
			
			last1hReward			+= '<br>' + last1hRewardTwo.toFixed(toFixedReward) + ' ' + coinTwo;
			last1hIncome			+= '<br>' + last1hIncomeTwo.toFixed(4) + ' ' + currency;
		}

		$('#last1hReward').html(last1hReward);
		$('#last1hIncome').html(last1hIncome);
		$('#last1hCosts').html(last1hCosts);
		$('#last1hProfit').html(last1hProfit);
		
		var last24hReward 	= jsonData['last24hReward'];
		var last24hIncome 	= jsonData['last24hIncome'];
		var last24hCosts 	= jsonData['last24hCosts'];
		var last24hProfit 	= jsonData['last24hProfit'];

		last24hReward 		= (last24hReward).toFixed(toFixedReward) + ' ' + coin;
		last24hIncome 		= (last24hIncome).toFixed(4) + ' ' + currency;
		last24hCosts 		= '-' + (last24hCosts).toFixed(2) + ' ' + currency;
		last24hProfit 		= (last24hProfit).toFixed(4) + ' ' + currency;
		
		if(coinTwo!=''){
			var last24hRewardTwo 	= jsonData['last24hRewardTwo'];
			var last24hIncomeTwo 	= jsonData['last24hIncomeTwo'];
			
			last24hReward			+= '<br>' + (last24hRewardTwo).toFixed(toFixedReward) + ' ' + coinTwo;
			last24hIncome			+= '<br>' + (last24hIncomeTwo).toFixed(4) + ' ' + currency;
		}

		$('#last24hReward').html(last24hReward);
		$('#last24hIncome').html(last24hIncome);
		$('#last24hCosts').html(last24hCosts);
		$('#last24hProfit').html(last24hProfit);
		
		var last7dReward 	= jsonData['last7dReward'];
		var last7dIncome 	= jsonData['last7dIncome'];
		var last7dCosts 	= jsonData['last7dCosts'];
		var last7dProfit 	= jsonData['last7dProfit'];
		
		last7dReward 		= (last7dReward).toFixed(toFixedReward) + ' ' + coin;
		last7dIncome 		= (last7dIncome).toFixed(4) + ' ' + currency;
		last7dCosts 		= '-' + (last7dCosts).toFixed(2) + ' ' + currency;
		last7dProfit 		= (last7dProfit).toFixed(4) + ' ' + currency;
		
		if(coinTwo!=''){
			var last7dRewardTwo 	= jsonData['last7dRewardTwo'];
			var last7dIncomeTwo 	= jsonData['last7dIncomeTwo'];
			
			last7dReward			+= '<br>' + (last7dRewardTwo).toFixed(toFixedReward) + ' ' + coinTwo;
			last7dIncome			+= '<br>' + (last7dIncomeTwo).toFixed(4) + ' ' + currency;
		}

		$('#last7dReward').html(last7dReward);
		$('#last7dIncome').html(last7dIncome);
		$('#last7dCosts').html(last7dCosts);
		$('#last7dProfit').html(last7dProfit);
		
		var currentReward 	= jsonData['currentReward'];
		var currentIncome 	= jsonData['currentIncome'];
		var currentCosts 	= jsonData['currentCosts'];
		var currentProfit 	= jsonData['currentProfit'];
		
		currentReward 		= (currentReward).toFixed(toFixedReward) + ' ' + coin;
		currentIncome 		= (currentIncome).toFixed(4) + ' ' + currency;
		currentCosts 		= '-' + (currentCosts).toFixed(2) + ' ' + currency;
		currentProfit 		= (currentProfit).toFixed(4) + ' ' + currency;
		
		if(coinTwo!=''){
			var currentRewardTwo 	= jsonData['currentRewardTwo'];
			var currentIncomeTwo 	= jsonData['currentIncomeTwo'];
			
			currentReward			+= '<br>' + (currentRewardTwo).toFixed(toFixedReward) + ' ' + coinTwo;
			currentIncome			+= '<br>' + (currentIncomeTwo).toFixed(4) + ' ' + currency;
		}

		$('#currentReward').html(currentReward);
		$('#currentIncome').html(currentIncome);
		$('#currentCosts').html(currentCosts);
		$('#currentProfit').html(currentProfit);
		
		$('.box_table .loader_frame').hide();
		
	});
}


function loadChart(){
		var rewardArray 	= jsonData['reward'];
		var incomeArray 	= jsonData['income'];
		var difficultyArray = jsonData['difficulty'];
		var difficultySet = 0;
		if(typeof difficultyArray != 'undefined' && difficultyArray.length>0){
			difficultySet = 1;
		}
		
		var dailyAverage = {};
		var dailyAverageArray = [];
		var rewardArrayLength = rewardArray.length;
		for(var i=0; i<rewardArrayLength; i++){
			
			// Correct timestamps
			if(rewardArray[i]!=null){
				rewardArray[i][0] *= 600000;
			}
			if(incomeArray[i]!=null){
				incomeArray[i][0] *= 600000;
			}

			if(dailyAverage[getDayTimestamp(rewardArray[i][0])]==null) dailyAverage[getDayTimestamp(rewardArray[i][0])] = {};
			if (dailyAverage[getDayTimestamp(rewardArray[i][0])]["sum"]==null) dailyAverage[getDayTimestamp(rewardArray[i][0])]["sum"] = 0;
			if (dailyAverage[getDayTimestamp(rewardArray[i][0])]["count"]==null) dailyAverage[getDayTimestamp(rewardArray[i][0])]["count"] = 0;
			dailyAverage[getDayTimestamp(rewardArray[i][0])]["sum"] += parseFloat(rewardArray[i][1]);
			dailyAverage[getDayTimestamp(rewardArray[i][0])]["count"] += 1;
			
		}		
		for(var i=0; i<rewardArrayLength; i++){
			dailyAverageArray.push([parseInt(rewardArray[i][0]), dailyAverage[getDayTimestamp(rewardArray[i][0])]["sum"]/dailyAverage[getDayTimestamp(rewardArray[i][0])]["count"]]);
		}
		
		if(difficultySet==1){
			var difficultyArrayLength = difficultyArray.length;
			for(var i=0; i<difficultyArrayLength; i++){
				if(difficultyArray[i]!=null){
					difficultyArray[i][0] *= 600000;
				}
				difficultyArray[i][1] = parseFloat(difficultyArray[i][1]);
			}
		}

		chartMining.addSeries({
			animation:false,
			name: _('Reward'),
			data: rewardArray,
			tooltip: {
				valueDecimals: 10,
				valueSuffix: coin + '/' + _('day')
			},
			dataGrouping: {
				approximation: "average",
				enabled: true,
				forced: true
			},
			showInNavigator: true,
			color: '#5767ff',
			yAxis: 0,
			zIndex: 1,
			fillOpacity: 0
		}, false);	
		
		chartMining.addSeries({
			animation:false,
			name: _('Income'),
			data: incomeArray,
			tooltip: {
				valueDecimals: 4,
				valueSuffix: currency + '/' + _('day')
			},
			dataGrouping: {
				approximation: "average",
				enabled: true,
				forced: true
			},
			showInNavigator: true,
			color: '#52cca5',
			yAxis: 1,
			zIndex: 1,
			fillOpacity: 0
		}, false);

		chartMining.addSeries({
			name: _('Avg. daily reward'),
			data: dailyAverageArray,
			tooltip: {
				valueDecimals: 10,
				valueSuffix: coin + '/' + _('day'),
				shared: true,
				split: false
			},
			showInNavigator: true,
			color: '#e2e5ef',
			dataGrouping: {
				approximation: "average",
				enabled: true,
				forced: true
			},
			yAxis: 0,
			zIndex: 0,
			animation: false
		}, false);
		
		if(difficultySet==1){
			chartMining.addSeries({
				name: _('Difficulty'),
				data: difficultyArray,
				tooltip: {
					valueDecimals: 2,
					valueSuffix: '',
					shared: true,
					split: false
				},
				showInNavigator: true,
				color: '#3c406b',
				dataGrouping: {
					approximation: "average",
					enabled: true,
					forced: true
				},
				yAxis: 2,
				zIndex: 0,
				animation: false
			}, false);
		}
		
		chartMining.redraw();
		
		if(coinTwo!=''){
		
			var rewardArrayTwo = jsonData['rewardTwo'];
			var incomeArrayTwo = jsonData['incomeTwo'];
			var difficultyArrayTwo = jsonData['difficultyTwo'];
			var difficultyTwoSet = 0;
			if(typeof difficultyArrayTwo != 'undefined' && difficultyArrayTwo.length>0){
				difficultyTwoSet = 1;
			}
			
			var dailyAverageTwo = {};
			var dailyAverageArrayTwo = [];
			var rewardArrayTwoLength = rewardArrayTwo.length;
			for(var i=0; i<rewardArrayTwoLength; i++){
				
				// Correct timestamps
				if(rewardArrayTwo[i]!=null){
					rewardArrayTwo[i][0] *= 600000;
				}
				if(incomeArrayTwo[i]!=null){
					incomeArrayTwo[i][0] *= 600000;
				}

				if(dailyAverageTwo[getDayTimestamp(rewardArrayTwo[i][0])]==null) dailyAverageTwo[getDayTimestamp(rewardArrayTwo[i][0])] = {};
				if (dailyAverageTwo[getDayTimestamp(rewardArrayTwo[i][0])]["sum"]==null) dailyAverageTwo[getDayTimestamp(rewardArrayTwo[i][0])]["sum"] = 0;
				if (dailyAverageTwo[getDayTimestamp(rewardArrayTwo[i][0])]["count"]==null) dailyAverageTwo[getDayTimestamp(rewardArrayTwo[i][0])]["count"] = 0;
				dailyAverageTwo[getDayTimestamp(rewardArrayTwo[i][0])]["sum"] += parseFloat(rewardArrayTwo[i][1]);
				dailyAverageTwo[getDayTimestamp(rewardArrayTwo[i][0])]["count"] += 1;
				
			}		
			for(var i=0; i<rewardArrayTwoLength; i++){
				dailyAverageArrayTwo.push([parseInt(rewardArrayTwo[i][0]), dailyAverageTwo[getDayTimestamp(rewardArrayTwo[i][0])]["sum"]/dailyAverageTwo[getDayTimestamp(rewardArrayTwo[i][0])]["count"]]);
			}
			
			if(difficultyTwoSet==1){
				var difficultyArrayTwoLength = difficultyArrayTwo.length;
				for(var i=0; i<difficultyArrayTwoLength; i++){
					if(difficultyArrayTwo[i]!=null){
						difficultyArrayTwo[i][0] *= 600000;
					}
					difficultyArrayTwo[i][1] = parseFloat(difficultyArrayTwo[i][1]);
				}
			}
			
			chartMiningTwo.addSeries({
				animation:false,
				name: _('Reward'),
				data: rewardArrayTwo,
				tooltip: {
					valueDecimals: 10,
					valueSuffix: coinTwo + '/' + _('day')
				},
				dataGrouping: {
					approximation: "average",
					enabled: true,
					forced: true
				},
				showInNavigator: true,
				color: '#5767ff',
				zIndex: 1,
				fillOpacity: 0
			}, false);	
			
			chartMiningTwo.addSeries({
				animation:false,
				name: _('Income'),
				data: incomeArrayTwo,
				tooltip: {
					valueDecimals: 4,
					valueSuffix: currency + '/' + _('day')
				},
				dataGrouping: {
					approximation: "average",
					enabled: true,
					forced: true
				},
				showInNavigator: false,
				color: '#52cca5',
				yAxis: 1,
				zIndex: 1,
				fillOpacity: 0
			}, false);

			chartMiningTwo.addSeries({
				name: _('Avg. daily reward'),
				data: dailyAverageArrayTwo,
				tooltip: {
					valueDecimals: 10,
					valueSuffix: coinTwo + '/' + _('day'),
					shared: true,
					split: false
				},
				showInNavigator: false,
				color: '#e2e5ef',
				dataGrouping: {
					approximation: "average",
					enabled: true,
					forced: true
				},
				yAxis: 0,
				zIndex: 0,
				animation: false
			}, false);
			
			if(difficultyTwoSet==1){
				chartMiningTwo.addSeries({
					name: _('Difficulty'),
					data: difficultyArrayTwo,
					tooltip: {
						valueDecimals: 2,
						valueSuffix: '',
						shared: true,
						split: false
					},
					showInNavigator: true,
					color: '#3c406b',
					dataGrouping: {
						approximation: "average",
						enabled: true,
						forced: true
					},
					yAxis: 2,
					zIndex: 0,
					animation: false
				}, false);
			}

			chartMiningTwo.redraw();
			
		}

		$('.box_graph .loader_frame').hide();

}

function loadChartLoop(){
	setTimeout(function() {
		if(typeof jsonData != 'undefined' && jsonData != null && jsonData['reward'].length > 0){
			loadChart();
		}else{
			loadChartLoop();
		}
	}, 500);
}

var chartLoaded = 0;

$(window).on('scroll mousemove', function() {
	if(chartLoaded==0){
		chartLoaded++;
		loadChartLoop();
	}
});

$(window).on('load', function() {
	loadTable();
	if(quickLoad==1){
		loadChartLoop();
		chartLoaded++;
	}
});

var chartMining = new Highcharts.chart('mining-chart', {
	chart: {
		animation:false,
		alignTicks: false,
		type: 'spline',
		events: {
			renderTo: 'container',
			load: function () {
				
				var chart = this;
				var zoomText = chart.rangeSelector.zoomText.element;
				$(zoomText).attr({
					y: 17,
					x: 0
				})
				$.each(chart.rangeSelector.buttons, function (i, button) {
					var textStr = button.element.childNodes[1];
					$(textStr).attr({
						y: 17
					});
				});
			}
		},
		marginTop: 20
	},
	title: {
		text: coin + ' ' + _('reward & income'),
		align: 'left',
		style: { "color": "#6b6d7a", "fontSize": "18px", "fontWeight": "300" },
		y: 10
	},
	xAxis: {
		type: 'datetime',
		labels: {
			overflow: 'justify',
			style:{
				color: '#575e71',
				fontSize: '13px'
			}
		}
	},
	yAxis: [{
		title: {
			text: ''
		},
		minorGridLineWidth: 0,
		gridLineWidth: 1,
		gridLineColor: '#f8f9fc',
		gridColor: '#e2e5ef',
		alternateGridColor: null,
		labels: {
			align: 'left',
			x: 0,
			y: -5,
			style:{
				color: '#575e71',
				fontSize: '12px'
			},
			formatter: function () {
				var label = this.axis.defaultLabelFormatter.call(this);
				return label;
			}
		},
		tickAmount: 5,
		allowDecimals: true
	},{
		title: {
			text: ''
		},
		minorGridLineWidth: 0,
		gridLineWidth: 1,
		gridLineColor: '#f8f9fc',
		gridColor: '#e2e5ef',
		alternateGridColor: null,
		labels: {
			align: 'right',
			x: 0,
			y: -5,
			style:{
				color: '#575e71',
				fontSize: '12px'
			},
			formatter: function () {
				var label = this.axis.defaultLabelFormatter.call(this);
				return label;
			}
		},
		tickAmount: 5,
		opposite: true,
		allowDecimals: true
	},{
		visible: false,
		title: {
			text: ''
		},
		minorGridLineWidth: 0,
		gridLineWidth: 1,
		gridLineColor: '#f8f9fc',
		gridColor: '#e2e5ef',
		alternateGridColor: null,
		labels: {
			align: 'right',
			x: 0,
			y: -5,
			style:{
				color: '#575e71',
				fontSize: '12px'
			},
			formatter: function () {
				var label = this.axis.defaultLabelFormatter.call(this);
				return label;
			}
		},
		tickAmount: 5,
		opposite: true,
		allowDecimals: true
	}],
	tooltip: {
		borderRadius: 6,
		borderWidth: 0,
		padding: 0,
		shadow: false,
		useHTML: true,
		formatter: function(){
			var style = '<div style="border:1px solid #e2e5ef;background:#fff;box-shadow:0px 3px 5px rgba(0,0,0,0.05);border-radius:3px;padding:16px 16px 2px 16px;line-height:1;font-family:\'Mukta Mahee\', sans-serif;width:auto;">';
			var points = this.points;
			style += '<div style="margin:0;padding:0 0 10px 0;line-height:1;font-size:12px;color:#85879b;font-weight:300;">' + Highcharts.dateFormat('%e %b %Y %H:%M', new Date(this.points[0].x)) + '</div><div style="width:20px;border-top:1px solid #e2e5ef;margin:0 0 10px 0;"></div>';
			for (var i=0; i < points.length; i++){
				style += '<div style="margin:0;padding:0;font-weight:600;color:#46474f;font-size:16px;line-height:1;"><div style="background:' + this.points[i].color + ';width:20px;height:4px;border-radius:5px;display:inline-table;margin:-2px 8px 0 0;"></div>' + ((this.points[i].y).toFixed(this.points[i].series.options.tooltip.valueDecimals)) + ' ' + this.points[i].series.tooltipOptions.valueSuffix + '</div><div style="margin:0;padding:2px 0 10px 0;line-height:1;font-size:12px;color:#85879b;font-weight:300;">' + this.points[i].series.name +'</div>';
			}
			style += '</div>';
			return style;
		},
		shared: true
	},
	plotOptions: {
		spline: {
			lineWidth: 3,
			states: {
				hover: {
					lineWidth: 3
				}
			},
			marker: {
				radius: 3,
				enabled: false,
				lineColor: null
			}
		}
	},
	navigator: {
		enabled: true,
		outlineColor: 'rgba(0,0,0,0.2)',
		outlineWidth: 1,
		height: 40,
		maskFill: 'rgba(87,103,255,0.2)',
		handles: {
			borderColor: '#8a8da3'
		},
		series:{
			fillOpacity: 0.05
		},
		xAxis:{
			lineColor: 'rgba(0,0,0,0.2)',
			lineWidth: 1
		}
	},
	
	rangeSelector: {
		enabled: true,
		inputEnabled: false,
		x: 0,
		y: 0,
		verticalAlign: 'top',
		buttonPosition: {
			align: 'right',
			x: 0,
			y: -65
		},
		buttonTheme: {
			fill: 'none',
			stroke: 'none',
			'stroke-width': 0,
			r: 3,
			width: 25,
			padding: 4,
			style: {
				color: '#46474f',
				fontWeight: 'regular',
				fontSize: '13px'
			},
			states: {
				hover: {
					fill: '#5767ff',
					style: {
						color: '#fff',
						fontWeight: 'bold'
					}
				},
				select: {
					fill: '#575e71',
					style: {
						color: '#fff',
						fontWeight: 'bold'
					}
				},
				disabled: {
					fill: '#fff',
					style: {
						color: '#c2c6d4'
					}
				}
				// disabled: { ... }
			}
		},
		labelStyle: {
			color: '#46474f',
			fontWeight: 'bold',
			fontSize: '13px'
		},
		buttons: [{
			type: 'hour',
			count: 3,
			text: _('3h')
		}, {
			type: 'hour',
			count: 12,
			text: _('12h')
		}, {
			type: 'hour',
			count: 24,
			text: _('1d')
		}, {
			type: 'day',
			count: 3,
			text: _('3d')
		},{
			type: 'all',
			text: _('All')
		}],
		selected: 1
	},
	navigation: {
		menuItemStyle: {
			fontSize: '10px'
		}
	},
	responsive: {
		 rules: [{
			condition: {
				maxWidth: 600
			},
			chartOptions: {
				title: {
					style: { "color": "#ffffff" }
				}
				
			}
		}]
	},
	credits: {
		enabled: false
	}
});	

if(coinTwo!=''){
	var chartMiningTwo = new Highcharts.chart('mining-chart-two', {
		chart: {
			animation:false,
			alignTicks: false,
			type: 'spline',
			events: {
				load: function () {
					var chart = this;
					var zoomText = chart.rangeSelector.zoomText.element;
					$(zoomText).attr({
						y: 17,
						x: 0
					})
					$.each(chart.rangeSelector.buttons, function (i, button) {
						var textStr = button.element.childNodes[1];
						$(textStr).attr({
							y: 17
						});
					});
				}
			},
			marginTop: 20
		},
		title: {
			text: coinTwo + ' ' + _('reward & income'),
			align: 'left',
			style: { "color": "#6b6d7a", "fontSize": "18px", "fontWeight": "300" },
			y: 10
		},
		xAxis: {
			type: 'datetime',
			labels: {
				overflow: 'justify',
				style:{
					color: '#575e71',
					fontSize: '13px'
				}
			}
		},
		yAxis: [{
			title: {
				text: ''
			},
			minorGridLineWidth: 0,
			gridLineWidth: 1,
			gridLineColor: '#f8f9fc',
			gridColor: '#e2e5ef',
			alternateGridColor: null,
			labels: {
				align: 'left',
				x: 0,
				y: -5,
				style:{
					color: '#575e71',
					fontSize: '12px'
				},
				formatter: function () {
					var label = this.axis.defaultLabelFormatter.call(this);
					return label;
				}
			},
			tickAmount: 5,
			allowDecimals: true
		},{
			title: {
				text: ''
			},
			minorGridLineWidth: 0,
			gridLineWidth: 1,
			gridLineColor: '#f8f9fc',
			gridColor: '#e2e5ef',
			alternateGridColor: null,
			labels: {
				align: 'right',
				x: 0,
				y: -5,
				style:{
					color: '#575e71',
					fontSize: '12px'
				},
				formatter: function () {
					var label = this.axis.defaultLabelFormatter.call(this);
					return label;
				}
			},
			tickAmount: 5,
			opposite: true,
			allowDecimals: true
		},{
			visible: false,
			title: {
				text: ''
			},
			minorGridLineWidth: 0,
			gridLineWidth: 1,
			gridLineColor: '#f8f9fc',
			gridColor: '#e2e5ef',
			alternateGridColor: null,
			labels: {
				align: 'right',
				x: 0,
				y: -5,
				style:{
					color: '#575e71',
					fontSize: '12px'
				},
				formatter: function () {
					var label = this.axis.defaultLabelFormatter.call(this);
					return label;
				}
			},
			tickAmount: 5,
			opposite: true,
			allowDecimals: true
		}],
		tooltip: {
			borderRadius: 6,
			borderWidth: 0,
			padding: 0,
			shadow: false,
			useHTML: true,
			formatter: function(){
				var style = '<div style="border:1px solid #e2e5ef;background:#fff;box-shadow:0px 3px 5px rgba(0,0,0,0.05);border-radius:3px;padding:16px 16px 2px 16px;line-height:1;font-family:\'Mukta Mahee\', sans-serif;width:auto;">';
				var points = this.points;
				style += '<div style="margin:0;padding:0 0 10px 0;line-height:1;font-size:12px;color:#85879b;font-weight:300;">' + Highcharts.dateFormat('%e %b %Y %H:%M', new Date(this.points[0].x)) + '</div><div style="width:20px;border-top:1px solid #e2e5ef;margin:0 0 10px 0;"></div>';
				for (var i=0; i < points.length; i++){
					style += '<div style="margin:0;padding:0;font-weight:600;color:#46474f;font-size:16px;line-height:1;"><div style="background:' + this.points[i].color + ';width:20px;height:4px;border-radius:5px;display:inline-table;margin:-3px 8px 0 0;"></div>' + ((this.points[i].y).toFixed(this.points[i].series.options.tooltip.valueDecimals)) + ' ' + this.points[i].series.tooltipOptions.valueSuffix + '</div><div style="margin:0;padding:2px 0 10px 0;line-height:1;font-size:12px;color:#85879b;font-weight:300;">' + this.points[i].series.name +'</div>';
				}
				style += '</div>';
				return style;
			},
			shared: true
		},
		plotOptions: {
			spline: {
				lineWidth: 3,
				states: {
					hover: {
						lineWidth: 3
					}
				},
				marker: {
					radius: 3,
					enabled: false,
					lineColor: null
				}
			}
		},
		navigator: {
			enabled: true,
			outlineColor: 'rgba(0,0,0,0.2)',
			outlineWidth: 1,
			height: 40,
			maskFill: 'rgba(87,103,255,0.2)',
			handles: {
				borderColor: '#8a8da3'
			},
			series:{
				fillOpacity: 0.05
			},
			xAxis:{
				lineColor: 'rgba(0,0,0,0.2)',
				lineWidth: 1
			}
		},
		
		rangeSelector: {
			enabled: true,
			inputEnabled: false,
			x: 0,
			y: 0,
			verticalAlign: 'top',
			buttonPosition: {
				align: 'right',
				x: 0,
				y: -65
			},
			buttonTheme: {
				fill: 'none',
				stroke: 'none',
				'stroke-width': 0,
				r: 3,
				width: 25,
				padding: 4,
				style: {
					color: '#46474f',
					fontWeight: 'regular',
					fontSize: '13px'
				},
				states: {
					hover: {
						fill: '#5767ff',
						style: {
							color: '#fff',
							fontWeight: 'bold'
						}
					},
					select: {
						fill: '#575e71',
						style: {
							color: '#fff',
							fontWeight: 'bold'
						}
					},
					disabled: {
						fill: '#fff',
						style: {
							color: '#c2c6d4'
						}
					}
					// disabled: { ... }
				}
			},
			labelStyle: {
				color: '#46474f',
				fontWeight: 'bold',
				fontSize: '13px'
			},
			buttons: [{
				type: 'hour',
				count: 3,
				text: _('3h')
			}, {
				type: 'hour',
				count: 12,
				text: _('12h')
			}, {
				type: 'hour',
				count: 24,
				text: _('1d')
			}, {
				type: 'day',
				count: 3,
				text: _('3d')
			},{
				type: 'all',
				text: _('All')
			}],
			selected: 1
		},
		navigation: {
			menuItemStyle: {
				fontSize: '10px'
			}
		},
		responsive: {
			 rules: [{
				condition: {
					maxWidth: 600
				},
				chartOptions: {
					title: {
						style: { "color": "#ffffff" }
					}
					
				}
			}]
		},
		credits: {
			enabled: false
		}
	});
}

function getDayTimestamp(aTimestamp){
	return aTimestamp - aTimestamp%(24*60*60*1000);
}

$(function(){ 
	if(scrollToCalc==1 && $(window).width() < 1040){
		slideTo('#calcArea');
	}
});

$('#coinAmount').keyup(function(){
	var coinAmount = $(this).val();
	if(coinAmount>0){
		var newAmount = coinAmount*exchangeRate;
		if(newAmount.toFixed(2)>0){
			newAmount = newAmount.toFixed(2);
		}else if(newAmount.toFixed(4)>0){
			newAmount = newAmount.toFixed(4);
		}else if(newAmount.toFixed(6)>0){
			newAmount = newAmount.toFixed(6);
		}else if(newAmount.toFixed(8)>0){
			newAmount = newAmount.toFixed(8);
		}
		$('#coinValue').val(newAmount);
	}
});

$('#coinValue').keyup(function(){
	var coinValue = $(this).val();
	if(coinValue>0){
		var newValue = coinValue/exchangeRate;
		if(newValue.toFixed(2)>0){
			newValue = newValue.toFixed(3);
		}else if(newValue.toFixed(4)>0){
			newValue = newValue.toFixed(5);
		}else if(newValue.toFixed(6)>0){
			newValue = newValue.toFixed(7);
		}else{
			newValue = newValue.toFixed(9);
		}
		$('#coinAmount').val(newValue);
	}
});

$('#coinAmount2').keyup(function(){
	var coinAmount = $(this).val();
	if(coinAmount>0){
		var newAmount = coinAmount*exchangeRate2;
		if(newAmount.toFixed(2)>0){
			newAmount = newAmount.toFixed(2);
		}else if(newAmount.toFixed(4)>0){
			newAmount = newAmount.toFixed(4);
		}else if(newAmount.toFixed(6)>0){
			newAmount = newAmount.toFixed(6);
		}else if(newAmount.toFixed(8)>0){
			newAmount = newAmount.toFixed(8);
		}
		$('#coinValue2').val(newAmount);
	}
});

$('#coinValue2').keyup(function(){
	var coinValue = $(this).val();
	if(coinValue>0){
		var newValue = coinValue/exchangeRate2;
		if(newValue.toFixed(2)>0){
			newValue = newValue.toFixed(3);
		}else if(newValue.toFixed(4)>0){
			newValue = newValue.toFixed(5);
		}else if(newValue.toFixed(6)>0){
			newValue = newValue.toFixed(7);
		}else{
			newValue = newValue.toFixed(9);
		}
		$('#coinAmount2').val(newValue);
	}
});

$('#currency').change(function(){
	var showCurrency = $(this).val();
	var d = new Date();
	d.setTime(d.getTime() + 3600 * 1000 * 24 * 7);
	var expires = "expires="+ d.toUTCString();
	document.cookie = "msscur=" + showCurrency + ";" + expires + ";path=/";
});

$('#electricityCosts').on('keyup', function(){
	var showElCost = parseFloat($(this).val());
	if($(this).val().indexOf(',')!=-1){
		showElCost = parseFloat($(this).val().replace(',','.'));
	}
	var d = new Date();
	d.setTime(d.getTime() + 3600 * 1000 * 24 * 7);
	var expires = "expires="+ d.toUTCString();
	document.cookie = "msse=" + showElCost + ";" + expires + ";path=/";
});