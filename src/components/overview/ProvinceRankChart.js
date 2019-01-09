import React from 'react';
import styles from '../../styles/ProvinceRankChart.less';
import ReactEcharts from 'echarts-for-react';

const ProvinceRankChart = ({data}) => {

  const getOption = () => {

    let xAxisData = [];
    let yAxisData = [];

    if (data.applyNumByProvince) {
      xAxisData = data.applyNumByProvince.map(function (item) {
        yAxisData.push(item['apply_num']);
        return item.province;
      });
    }

    return {
      title: {
        text: '各省专利申请排行Top15',
        left: 'center',
        top: 20
      },
      tooltip: {
        trigger: 'axis'
      },
      color: ['#3b84dc'],
      grid: {
        left: '3%',
        right: '10%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          show: false
        }
      },
      yAxis: {
        type: 'category',
        inverse: true,
        axisPointer: {
          type: 'none'
        },
        data: xAxisData.slice(0, 15)
      },
      series: [
        {
          name: '专利申请总数',
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
          data: yAxisData.slice(0, 15)
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

ProvinceRankChart.propTypes = {};

export default ProvinceRankChart;
