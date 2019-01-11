import React from 'react';
import styles from '../../styles/CategoriesYearChart.less';
import ReactEcharts from 'echarts-for-react';

const CategoriesYearChart = ({data}) => {

  const yearsData = data.years2 || {};

  const getOption = () => {

    const years = Object.keys(yearsData);

    const categories = Object.keys(yearsData[years[0]] || {});

    let seriesData = [];

    categories.forEach(function (category) {
      seriesData.push({
        name: category,
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: years.map(function (year) {
          return yearsData[year][category];
        })
      });
    });

    return {
      title: {
        text: '1985-2015年专利类型堆叠图',
        top: 20,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: 70,
        containLabel: true
      },
      dataZoom: [
        {
          show: true,
          height: 25,
          start: 45,
          xAxisIndex: [0],
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
          boundaryGap: false,
          data: years
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: seriesData
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

CategoriesYearChart.propTypes = {};

export default CategoriesYearChart;
