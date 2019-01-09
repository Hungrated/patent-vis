import React from 'react';
import styles from '../../styles/ProvinceRankChart.less';
import ReactEcharts from 'echarts-for-react';

const ProvinceRankChart = ({data}) => {

  const getOption = () => {

    console.log(data);
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
        data: xAxisData.slice(0, 15)
      },
      series: [
        {
          name: '各省专利申请排行Top15',
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
