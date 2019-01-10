import React from 'react';
import styles from '../../styles/SimpleApplyChart.less';
import ReactEcharts from 'echarts-for-react';


const SimpleApplyChart = ({data}) => {

  const getOption = () => {

    let xAxisQuarters = [];
    let xAxisYears = [];
    let yAxisQuarters = [];
    let yAxisYears = [];

    if (data.apply && data.apply.quarters && data.apply.years) {
      const quartersData = data.apply.quarters.slice(-60) || [];
      const yearsData = data.apply.years.slice(-15) || [];
      quartersData.forEach(function (item) {
        xAxisQuarters.push(item['year_quarter']);
        yAxisQuarters.push(item['amount']);
      });
      yearsData.forEach(function (item) {
        xAxisYears.push(item['year']);
        yAxisYears.push(item['amount']);
      });
    }

    return {
      title: {
        text: '近15年专利申请趋势',
        left: 'center',
        top: 20
      },
      tooltip: {
        trigger: 'axis'
      },
      color: ['#2e5da2', '#73e2ff'],
      grid: {
        top: '25%',
        containLabel: true
      },
      legend: {
        data: ['季度申请量', '年申请量'],
        bottom: 5,
        textStyle: {
          verticalAlign: 'middle',
          lineHeight: 50
        }
      },
      xAxis: [
        {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#9d9b9e'
            }
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          splitArea: {
            show: false
          },
          data: xAxisQuarters
        },
        {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#9d9b9e'
            }
          },
          axisLabel: {
            show: false
          },
          axisPointer: {
            type: 'none'
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          splitArea: {
            show: false
          },
          data: xAxisYears
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '季度申请量',
          axisLabel: {
            show: false
          },
          position: 'right'

        }, {
          type: 'value',
          name: '年申请量',
          axisLabel: {
            show: false
          },
          position: 'left'
        }],
      series: [
        {
          name: '季度申请量',
          type: 'line',
          label: {
            normal: {
              show: false,
              position: 'top'
            }
          },
          lineStyle: {
            normal: {
              width: 3,
              shadowColor: 'rgba(0,0,0,0.3)',
              shadowBlur: 5,
              shadowOffsetY: 5
            }
          },
          data: yAxisQuarters
        },
        {
          name: '年申请量',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          label: {
            normal: {
              show: false,
              position: 'top'
            }
          },
          data: yAxisYears
        }
      ]
    };
  };

  return (
    <div className={styles['g-inner']}>
      <ReactEcharts
        option={getOption()}
        notMerge={true}
        lazyUpdate={true}
        style={{
          minWidth: '300px',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

SimpleApplyChart.propTypes = {};

export default SimpleApplyChart;
