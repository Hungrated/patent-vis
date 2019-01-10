import React from 'react';
import ReactEcharts from 'echarts-for-react';
import styles from '../../styles/SimpleCategoriesChart.less';

const SimpleCategoriesChart = ({data}) => {

  let legendData = [];

  let rawData = data.categories || [];

  const convertedData = rawData.map(function (item) {
    legendData.push(item.category);
    return {
      value: item.count,
      code: item.code,
      name: item.category
    };
  });

  const getOption = () => {
    return {
      title: {
        text: '专利类型占比',
        subtext: '悬停或点击查看详情',
        left: 'center',
        top: 20
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series : [
        {
          name:'专利类型占比',
          type:'pie',
          center: ['50%', '50%'],
          data: convertedData,
          selectedMode: 'single',
          label: {
            normal: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: '#4a6fd4',
              shadowBlur: 50,
              shadowColor: 'rgba(0, 0, 0, 0.4)'
            }
          }
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
          minWidth: '300px',
          height: '100%'
        }}
      />
    </div>
  );
};

SimpleCategoriesChart.propTypes = {};

export default SimpleCategoriesChart;
