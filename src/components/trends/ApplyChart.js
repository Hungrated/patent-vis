import React from 'react';
import styles from '../../styles/ApplyChart.less';
import ReactEcharts from 'echarts-for-react';


const ApplyChart = ({data}) => {

  const getOption = () => {

    let xAxisQuarters = [];
    let xAxisYears = [];
    let yAxisQuarters = [];
    let yAxisYears = [];

    if (data.quarters && data.years) {
      data.quarters.forEach(function (item) {
        xAxisQuarters.push(item['year_quarter']);
        yAxisQuarters.push(item['amount']);
      });
      data.years.forEach(function (item) {
        xAxisYears.push(item['year']);
        yAxisYears.push(item['amount']);
      });
    }

    return {
      title: {
        text: '1979-2015年专利季度申请量趋势及年申请量比较',
        left: 'center',
        top: 20
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
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
      dataZoom: [
        {
          show: true,
          height: 25,
          start: 50,
          xAxisIndex: [
            0,
            1
          ],
          bottom: 30,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'
          },
          borderColor: '#90979c'
        },
        {
          type: 'inside',
          show: true,
          height: 35,
          start: 1,
          end: 35
        }],
      yAxis: [
        {
          type: 'value',
          name: '季度申请量',
          position: 'right'
        }, {
          type: 'value',
          name: '年申请量',
          position: 'left'
        }],
      series: [
        {
          name: '季度申请量',
          type: 'line',
          label: {
            normal: {
              show: false
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
              show: true,
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
          width: '100%',
          height: 'calc(100vh - 70px)',
          minHeight: '500px'
        }}
      />
    </div>
  );
};

ApplyChart.propTypes = {};

export default ApplyChart;
