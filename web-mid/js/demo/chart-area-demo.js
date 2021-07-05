// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';





function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}





var ctx = document.getElementById("myAreaChart");
// var myLineChart = new Chart(ctx, {
//   type: 'line',
//   data: {
//     labels: [],

//     datasets: [{
//       label: "high",
//       lineTension: 0.3,
//       backgroundColor: "rgba(78, 115, 223, 0.05)",
//       borderColor: "rgba(78, 115, 223, 1)",
//       pointRadius: 3,
//       pointBackgroundColor: "rgba(78, 115, 223, 1)",
//       pointBorderColor: "rgba(78, 115, 223, 1)",
//       pointHoverRadius: 3,
//       pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
//       pointHoverBorderColor: "rgba(78, 115, 223, 1)",
//       pointHitRadius: 10,
//       pointBorderWidth: 2,
//       data: [],

//     }],
//   },

//   options: {
//     maintainAspectRatio: false,
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero: true
//         }
//       }]
//     }
//   }
// });

// (function draw_line() {
//   $.ajax({
//     url: 'http://localhost:5000/',
//     dataType: 'json',
//     type: 'GET',
//     success: function(data) {
//       myLineChart.data.labels = data.date;
//       myLineChart.data.datasets[0].data = data.high;
//       myLineChart.update();
//     },
//     complete: function() {
//       setTimeout(draw_line, 5000);
//     }
//   })
// })();

var dataPoints1 = [], dataPoints2 = [], dataPoints3 = [];
var stockChart = new CanvasJS.StockChart(ctx, {
  theme: "light2",
  exportEnabled: true,
  title: {
    text: "Price & Volume"
  },
  charts: [{
    toolTip: {
      shared: true
    },
    axisX: {
      lineThickness: 5,
      tickLength: 0,
      labelFormatter: function (e) {
        return "";
      }
    },
    axisY: {
      prefix: "$"
    },
    legend: {
      verticalAlign: "top"
    },
    data: [{
      showInLegend: true,
      name: "Stock Price (in USD)",
      yValueFormatString: "$#,###.##",
      type: "candlestick",
      dataPoints: dataPoints1
    }]
  }, {
    height: 100,
    toolTip: {
      shared: true
    },
    axisY: {
      prefix: "$",
      labelFormatter: addSymbols
    },
    legend: {
      verticalAlign: "top"
    },
    data: [{
      showInLegend: true,
      name: "Volume (BTC/USD)",
      yValueFormatString: "$#,###.##",
      dataPoints: dataPoints2
    }]
  }],
  navigator: {
    data: [{
      dataPoints: dataPoints3
    }],
    slider: {
      minimum: new Date(2018, 06, 01),
      maximum: new Date(2018, 08, 01)
    }
  }
});

var data_len = 0;

(function draw_chart() {
  $.ajax({
    url: "http://3.226.47.218:5000/".concat(getUrlParameter('coin')),
    dataType: 'json',
    type: 'GET',
    success: function (data) {
      for (var i = data_len; i < data.date.length; i++) {
        dataPoints1.push({ x: new Date(data.date[i]), y: [Number(data.open[i]), Number(data.high[i]), Number(data.low[i]), Number(data.close[i])] });;
        dataPoints2.push({ x: new Date(data.date[i]), y: Number(data.volume[i]) });
        dataPoints3.push({ x: new Date(data.date[i]), y: Number(data.close[i]) });
      }
      data_len = data.date.length;
      
      // stockChart.charts[1].data[0].name = `Volume (${getUrlParameter('coin')}/USD)`
      stockChart.render();

    },
    complete: function () {
      setTimeout(draw_chart, 300000);
    }
  });
})();


function addSymbols(e) {
  var suffixes = ["", "K", "M", "B"];
  var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
  if (order > suffixes.length - 1)
    order = suffixes.length - 1;
  var suffix = suffixes[order];
  return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
}