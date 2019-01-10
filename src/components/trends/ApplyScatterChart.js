import React from 'react';
import styles from '../../styles/ApplyScatterChart.less';
import ReactEcharts from 'echarts-for-react';

const ApplyScatterChart = ({data}) => {

  const scatterData = data.scatter || [];

  const getOption = () => {

    let months = Object.keys(scatterData || {});

    let years = Object.keys(scatterData['1'] || {});

    let convertedData = [];

    for (let i = 0; i < months.length; i++) {
      for (let j = 0; j < years.length; j++) {
        let yearIndex = (1985 + j).toString();
        let monthIndex = (1 + i).toString();
        convertedData.push([j, i, scatterData[monthIndex][yearIndex]]);
      }
    }

    return {
      title: {
        text: '1985-2015年专利申请密度',
        left: 'center',
        top: 20
      },
      tooltip: {
        position: 'top',
        formatter: function (params) {
          return years[params.value[0]] + '年' + months[params.value[1]] + '月：' +
            params.value[2] + '项申请';
        }
      },
      grid: {
        left: 50,
        bottom: 70,
        right: 50,
        containLabel: true
      },
      dataZoom: [
        {
          show: true,
          height: 25,
          xAxisIndex: [0],
          start: 45,
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
      xAxis: {
        type: 'category',
        data: years,
        boundaryGap: false,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#999',
            type: 'dashed'
          }
        },
        axisLine: {
          show: false
        }
      },
      yAxis: {
        type: 'category',
        data: months,
        axisLine: {
          show: false
        }
      },
      series: [
        {
          name: 'Punch Card',
          type: 'scatter',
          data: convertedData,
          symbolSize: function (val) {
            return val[2] / 3000;
          },
          animationDelay: function (idx) {
            return idx * 5;
          }
        }]
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

ApplyScatterChart.propTypes = {};

export default ApplyScatterChart;
