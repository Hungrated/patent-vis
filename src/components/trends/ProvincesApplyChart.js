import React from 'react';
import styles from '../../styles/ProvincesApplyChart.less';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';

const ProvincesApplyChart = ({data}) => {

  const provinceData = data.applyNumByYearAndProvince || {};

  const getOption = () => {

    let provinces = Object.keys(provinceData);
    let xAxisDetailedData = Object.keys(provinceData[provinces[0]] || {});
    let yAxisDetailedDataArr = [];

    provinces.forEach(function (item) {
      yAxisDetailedDataArr.push({
        name: item,
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          normal: {
            width: 1
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(0, 136, 212, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(0, 136, 212, 0)'
              }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        itemStyle: {
          normal: {
            color: 'rgb(' + Math.round(Math.random() * 255) +
              ',' + Math.round(Math.random() * 255) +
              ',' + Math.round(Math.random() * 255) +
              ')'
          }
        },
        data: Object.values(provinceData[item] || {})
      });
    });

    return {
      title: {
        text: '1985-2015年各省专利申请量趋势及比较',
        left: 'center',
        top: 20
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#9db5dd'
          }
        }
      },
      legend: {
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 20,
        right: '2%',
        padding: [100, 10, 100, 0],
        data: provinces,
        orient: 'vertical',
        textStyle: {
          fontSize: 12
        },
        selected: {
          '上海': true,
          '云南': false,
          '内蒙古': false,
          '北京': true,
          '台湾': false,
          '吉林': false,
          '四川': false,
          '天津': false,
          '宁夏': false,
          '安徽': false,
          '山东': true,
          '山西': false,
          '广东': true,
          '广西': false,
          '新疆': false,
          '江苏': true,
          '江西': false,
          '河北': false,
          '河南': false,
          '浙江': true,
          '海南': false,
          '湖北': false,
          '湖南': false,
          '澳门': false,
          '甘肃': false,
          '福建': false,
          '西藏': false,
          '贵州': false,
          '辽宁': false,
          '重庆': false,
          '陕西': false,
          '青海': false,
          '香港': false,
          '黑龙江': false
        }
      },
      grid: {
        left: '10%',
        bottom: 70,
        right: 200,
        containLabel: true
      },
      dataZoom: [
        {
          show: true,
          height: 25,
          start: 50,
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
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: xAxisDetailedData
        }],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
      series: yAxisDetailedDataArr
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

ProvincesApplyChart.propTypes = {};

export default ProvincesApplyChart;
