const socket = io('http://localhost:5000');
Highcharts.chart('graficocpu', {
    chart: {
        type: 'line',
        animation: Highcharts.svg,
        marginRight: 10,
        events: {
            load: function() {
                var series = this.series[0];
                socket.on('cpu', function(capturarCpu) {
                    var x = (new Date()).getTime();
                    series.addPoint([x, capturarCpu], true, true);
                });
            }
        }
    },

    time: {
        useUTC: false
    },

    title: {
        text: 'MONITOREO EN TIEMPO REAL'
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
    },
    yAxis: {
        title: {
            text: 'CPU DISPONIBLE (%)'
        },
        plotLines: [{
            value: 0,
            width: 100,
            color: '#ffffff'
        }]
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}%'
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    series: [{
        name: 'CPU',
        data: (function() {

            var data = [],

                time = (new Date()).getTime(),
                i;
            for (i = -19; i <= 0; i += 1) {
                var y = null;
                socket.on('cpu', function(num) {
                    y = num;
                });
                data.push({
                    x: time + i * 1000,
                    y: y
                });
            }
            return data;
        }())
    }],
});