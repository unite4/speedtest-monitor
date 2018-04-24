<template>
  <div class="chart"></div>
</template>

<style scoped>
.chart {
  width: 100%;
  height: 60vh;
}
</style>

<script>
import echarts from 'echarts/lib/echarts';
import debounce from 'lodash/debounce';
import { addListener, removeListener } from 'resize-detector';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/dataset';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

export default {
  props: {
    logsData: Array
  },

  data() {
    const bitsToMegabits = bits => bits / 1000 / 1000;

    const speedAxisFormatter = speed => `${bitsToMegabits(speed)} Mb/s`;

    const pingAxisFormatter = ping => `${ping.toFixed(0)} ms`;

    const formatSeriesText = series => {
      const value = series.value[series.seriesId];

      switch (series.seriesId) {
        case 'download':
        case 'upload':
          return `${series.marker} ${series.seriesName}: ${bitsToMegabits(value).toFixed(2)} Mb/s`;

        case 'ping':
          return `${series.marker} ${series.seriesName}: ${value.toFixed(2)} ms`;

        default:
          return `${series.marker} ${series.seriesName}: ${value}`;
      }
    };

    const tooltipFormatter = data => {
      const dateObj = new Date(data[0].value.date);
      const date = `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
      const series = data.map(formatSeriesText);

      return [date, ...series].join('<br>');
    };

    const dateAxisFormatter = data => {
      const date = new Date(data);

      return `${date.getDate()}.${date.getMonth() + 1}`;
    };

    return {
      chart: null,

      options: {
        tooltip: {
          trigger: 'axis',
          formatter: tooltipFormatter
        },
        legend: {
          data: ['Download', 'Upload', 'Ping'],
          inactiveColor: '#4d6b73',
          textStyle: {
            color: '#759aa5'
          }
        },
        grid: [{ id: 'speed' }, { id: 'ping' }, { id: 'norm' }],
        xAxis: [
          {
            id: 'speedXAxis',
            gridIndex: 0,
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#4d6b73'
              }
            },
            axisLabel: {
              rotate: 50,
              formatter: dateAxisFormatter
            }
          },
          {
            id: 'pingXAxis',
            gridIndex: 1,
            type: 'category',
            show: false
          },
          {
            id: 'normXAxis',
            gridIndex: 2,
            type: 'time',
            show: false,
            silent: true,
            axisPointer: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            id: 'speedYAxis',
            gridIndex: 0,
            max: 80000000,
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#4d6b73'
              }
            },
            axisLabel: {
              formatter: speedAxisFormatter
            }
          },
          {
            id: 'pingYAxis',
            gridIndex: 1,
            max: 150,
            position: 'right',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#4d6b73'
              }
            },
            axisLabel: {
              formatter: pingAxisFormatter
            }
          },
          {
            name: 'normYAxis',
            gridIndex: 2,
            max: 80000000,
            show: false,
            silent: true
          }
        ],
        axisPointer: {
          lineStyle: {
            color: '#4d6b73'
          },
          shadowStyle: {
            opacity: 0
          },
          zlevel: 15
        },
        series: [
          {
            id: 'download',
            name: 'Download',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            symbol: 'circle',
            showSymbol: false,
            symbolSize: 4,
            smooth: true,
            itemStyle: {
              color: 'blue'
            },
            lineStyle: {
              width: 3,
              shadowColor: 'rgba(0, 0, 0, .2)',
              shadowOffsetX: 2,
              shadowOffsetY: 2,
              shadowBlur: 2
            },
            zlevel: 20
          },
          {
            id: 'ping',
            name: 'Ping',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            symbol: 'circle',
            showSymbol: false,
            symbolSize: 4,
            smooth: true,
            itemStyle: {
              color: '#4d6b73'
            },
            lineStyle: {
              width: 1,
              color: 'rgba(255, 255, 255, .15)'
            },
            areaStyle: {
              color: '#19414A'
            },
            zlevel: 10
          },
          {
            id: 'upload',
            name: 'Upload',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            symbol: 'circle',
            showSymbol: false,
            symbolSize: 4,
            smooth: true,
            itemStyle: {
              color: 'red'
            },
            lineStyle: {
              width: 3,
              shadowColor: 'rgba(0, 0, 0, .2)',
              shadowOffsetX: 2,
              shadowOffsetY: 2,
              shadowBlur: 2
            },
            zlevel: 20
          },
          {
            id: 'downloadNorm',
            name: 'Download norm',
            type: 'line',
            xAxisIndex: 2,
            yAxisIndex: 2,
            itemStyle: {
              color: 'blue'
            },
            lineStyle: {
              width: 1,
              type: 'dashed'
            },
            data: [[0, 45000000], [1, 45000000]],
            showSymbol: false,
            animation: false,
            zlevel: 19
          },
          {
            id: 'uploadNorm',
            name: 'Upload norm',
            type: 'line',
            xAxisIndex: 2,
            yAxisIndex: 2,
            itemStyle: {
              color: 'red'
            },
            lineStyle: {
              width: 1,
              type: 'dashed'
            },
            data: [[0, 4000000], [1, 4000000]],
            showSymbol: false,
            animation: false,
            zlevel: 19
          }
        ],
        dataset: {
          source: null
        }
      }
    };
  },

  watch: {
    logsData: 'refreshChart'
  },

  mounted() {
    this.initChart();
  },

  beforeDestroy() {
    this.destroyChart();
  },

  methods: {
    initChart() {
      if (this.chart) {
        return;
      }

      this.chart = echarts.init(this.$el, null, this.options);
      this.__resizeHandler = debounce(this.chart.resize, 50);
      addListener(this.$el, this.__resizeHandler);
    },

    destroyChart() {
      removeListener(this.$el, this.__resizeHandler);
      this.chart.dispose();
      this.chart = null;
    },

    refreshChart(data) {
      if (!data || data.length === 0) {
        return;
      }

      this.options.dataset.source = data;
      this.chart.setOption(this.options, true, true);
    }
  }
};
</script>
