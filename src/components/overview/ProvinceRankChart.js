import React from 'react';
import styles from '../../styles/ProvinceRankChart.less';
import ReactEcharts from 'echarts-for-react';

const ProvinceRankChart = ({data}) => {

  const getOption = () => {

    console.log(data);

    return {
      title: {
        text: '各省专利申请与公开情况',
        left: 'center',
        top: 20
      },
      color: ['#2d62a6'],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'category',
        inverse: true,
        data: [
          '0',
          '10',
          '20',
          '30',
          '40',
          '50',
          '60',
          '70',
          '80',
          '90',
          '100',
          '110',
          '120',
          '130',
          '140']
      },
      series: [
        {
          name: '中国各省专利申请与公开情况比较',
          type: 'bar',
          smooth: true,
          lineStyle: {
            normal: {
              width: 3,
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 10,
              shadowOffsetY: 10
            }
          },
          data: [
            50000,
            45850,
            37500,
            34563,
            32142,
            31098,
            30968,
            25709,
            24583,
            23233,
            18500,
            17491,
            15999,
            12075,
            11001]
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
          minWidth: '480px',
          height: 'calc(100vh - 70px)',
          minHeight: '500px'
        }}
      />
    </div>
  );
};

ProvinceRankChart.propTypes = {};

export default ProvinceRankChart;
