// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
  return false;
};

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
// var myPieChart = new Chart(ctx, {
//   type: 'doughnut',
//   data: {
//     labels: ["Direct", "Referral", "Social"],
//     datasets: [{
//       data: [55, 30, 15],
//       backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
//       hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
//       hoverBorderColor: "rgba(234, 236, 244, 1)",
//     }],
//   },
//   options: {
//     maintainAspectRatio: false,
//     tooltips: {
//       backgroundColor: "rgb(255,255,255)",
//       bodyFontColor: "#858796",
//       borderColor: '#dddfeb',
//       borderWidth: 1,
//       xPadding: 15,
//       yPadding: 15,
//       displayColors: false,
//       caretPadding: 10,
//     },
//     legend: {
//       display: false
//     },
//     cutoutPercentage: 80,
//   },
// });
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],

    datasets: [{
      label: "high",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [],

    }],
  },

  options: {
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          // beginAtZero: true,
        }
      }]
    }
  }
});

(function draw_line() {
  $.ajax({
    url: "http://3.226.47.218:5000/".concat(getUrlParameter('coin')),
    dataType: 'json',
    type: 'GET',
    success: function(data) {
      len = data.date.length;
      myLineChart.data.labels = data.date.slice(len-20);
      myLineChart.data.datasets[0].data = data.high.slice(len-20);
      myLineChart.update();

      var thigh= document.getElementById("today_high");
      thigh.innerHTML = data.high.slice(-1)[0];


      var tlow= document.getElementById("today_low");
      tlow.innerHTML = data.low.slice(-1)[0];

    },
    complete: function() {
      setTimeout(draw_line, 300000);
    }
  })
})();
