import React from 'react';
import ReactEcharts from 'echarts-for-react';
import styles from '../../styles/CategoriesTrendChart.less';

const CategoriesTrendChart = ({data}) => {

  //
  // let legendData = [];
  //
  const rawData = data.years || [];

  // const convertedData = rawData.map(function (item) {
  //   legendData.push(item.category);
  //   return {
  //     value: item.count,
  //     code: item.code,
  //     name: item.category
  //   };
  // });

  let years = [];
  let applyNums = [];
  let publicNums = [];

  rawData.forEach(function (item) {
    years.push(item.year);
    applyNums.push(item['apply_num']);
    publicNums.push(item['public_num']);
  });

  console.log(rawData);

  const getOption = () => {

    return {
      title: {
        text: '1985-2015年专利申请数与公开数对比',
        left: 'center',
        top: 20
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['申请量', '公开量'],
        top: 75
      },
      grid: {
        bottom: '70',
        containLabel: true
      },
      calculable: true,
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
      xAxis: [
        {
          type: 'category',
          data: years
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '申请量',
          type: 'bar',
          data: applyNums,
        },
        {
          name: '公开量',
          type: 'bar',
          data: publicNums,
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
        style={{width: '100%', height: 'calc(100vh - 70px)'}}
      />
    </div>
  );
};

CategoriesTrendChart.propTypes = {};

export default CategoriesTrendChart;
