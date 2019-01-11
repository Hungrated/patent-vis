import React from 'react';
import styles from '../../styles/TechRatioChart.less';
import ReactEcharts from 'echarts-for-react';

const TechRatioChart = ({data}) => {

  const totalData = data.total || [];

  const getOption = () => {

    const convertedData = totalData.map(function (item) {
      return {
        name: item.category,
        value: item.amount
      };
    });

    return {
      title: {
        text: '专利技术分布总体占比',
        top: 20,
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      calculable: true,
      series: [
        {
          name: '技术分布总体占比',
          type: 'pie',
          roseType: 'area',
          radius: [0, '80%'],
          data: convertedData
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

TechRatioChart.propTypes = {};

export default TechRatioChart;
