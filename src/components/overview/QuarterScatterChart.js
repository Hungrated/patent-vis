import React from 'react';
import styles from '../../styles/QuarterScatterChart.less';
import ReactEcharts from 'echarts-for-react';

const QuarterScatterChart = ({data}) => {

  const scatterData = data.scatter || {};

  const getOption = () => {

    let months = Object.keys(scatterData || {});
    let years = Object.keys(scatterData['1'] || {}).slice(-15);

    let data = [];

    for (let i = 0; i < years.length; i++) {
      for (let j = 0; j < months.length; j++) {
        let yearIndex = (2001 + i).toString();
        let monthIndex = (1 + j).toString();
        data.push([i, j, scatterData[monthIndex][yearIndex]]);
      }
    }

    return {
      title: {
        text: '近15年专利申请时间密度总览',
        left: 'center'
      },
      polar: {},
      tooltip: {
        formatter: function (params) {
          return years[params.value[0]] + '年' + months[params.value[1]] + '月：' +
            params.value[2] + '项申请';
        },
        position: function (pos, params, dom, rect, size) {
          let obj = {top: 60};
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
          return obj;
        }
      },
      angleAxis: {
        type: 'category',
        data: months,
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
      radiusAxis: {
        type: 'category',
        data: years,
        axisLine: {
          show: false
        },
        axisLabel: {
          rotate: 45
        }
      },
      series: [
        {
          name: 'Punch Card',
          type: 'scatter',
          coordinateSystem: 'polar',
          symbolSize: function (val) {
            return val[2] / 8500;
          },
          data: data,
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
          top: '20px',
          minWidth: '300px',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

QuarterScatterChart.propTypes = {};

export default QuarterScatterChart;
