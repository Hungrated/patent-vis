import React from 'react';
import ReactEcharts from 'echarts-for-react';
import styles from '../../styles/CategoriesChart.less';

const CategoriesChart = ({data}) => {

  const scale = 1;

  let legendData = [];

  const convertedData = data.map(function (item) {
    legendData.push(item.category);
    return {
      value: item.count,
      code: item.code,
      name: item.category
    };
  });

  const richData = {
    count: {
      color: '#10005f',
      fontSize: 24 * scale,
      padding: [5, 5],
      align: 'center'
    },
    total: {
      color: '#0f0e55',
      fontSize: 32 * scale,
      align: 'center'
    },
    label: {
      color: '#222222',
      align: 'center',
      fontSize: 16 * scale,
      padding: [10, 0]
    },
    blue: {
      color: '#0f0e55',
      fontSize: 16 * scale,
      align: 'center'
    },
    hr: {
      borderColor: '#0b5263',
      width: '100%',
      borderWidth: 1,
      height: 0
    }
  };

  const getOption = () => {
    return {
      title: {
        text: '总专利数',
        left: 'center',
        top: '51%',
        padding: [24, 0],
        textStyle: {
          fontSize: 24 * scale,
          align: 'center'
        }
      },
      legend: {
        selectedMode: false,
        formatter: function () {
          let total = 0;
          convertedData.forEach(function (item) {
            total += item.value;
          });
          return '{total|' + total + '}';
        },
        data: [convertedData[0].name],
        left: 'center',
        top: 'center',
        icon: 'none',
        align: 'center',
        textStyle: {
          fontSize: 16 * scale,
          rich: richData
        }
      },
      series: [
        {
          type: 'pie',
          smooth: true,
          radius: ['50%', '65%'],
          startAngle: 85,
          hoverAnimation: true,
          label: {
            normal: {
              formatter: function (params) {
                let total = 0;
                let percent;
                convertedData.forEach(function (value) {
                  total += value.value;
                });
                percent = ((params.value / total) * 100).toFixed(2);
                return '{label|' + params.name + '\n(类别代码：' + params.data.code +
                  ')' + '}\n{hr|}\n{count|' +
                  params.value + '}\n{blue|' + percent + '%}';
              },
              rich: richData
            }
          },
          labelLine: {
            normal: {
              length: 55 * scale,
              length2: 0,
              lineStyle: {
                color: '#0b5263'
              }
            }
          },
          data: convertedData
        }]
    };
  };

  return (
    <div className={styles['g-inner']}>
      <ReactEcharts
        option={getOption()}
        notMerge={true}
        lazyUpdate={true}
        style={{width: '100%', height: 'calc(100vh - 70px)'}}
      />
    </div>
  );
};

CategoriesChart.propTypes = {};

export default CategoriesChart;
