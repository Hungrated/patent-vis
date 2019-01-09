import React from 'react';
import styles from '../../styles/OverviewMapChart.less';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import '../../assets/china';

const OverviewMapChart = ({data}) => {

  const getOption = () => {

    const detailedData = data.applyNumByYearAndProvince;
    let heatMapData = [];

    if (data.heatMap) {
      heatMapData = data.heatMap.map(function (item) {
        return {
          name: item.province,
          value: item['apply_num'],
          tipData: [
            item['apply_num'],
            item['public_num']
          ]
        };
      });
    }

    function tooltipCharts () {
      let xAxisDetailedData = ['xAxis'].concat(
        Object.keys(detailedData[arguments[0]] || {}));
      let yAxisDetailedData = ['专利申请数量'].concat(
        Object.values(detailedData[arguments[0]] || {}));
      let myChart = echarts.init(document.getElementById('tooltipBarId'));
      let option = {
        tooltip: {},
        dataset: {
          source: [
            xAxisDetailedData,
            yAxisDetailedData
          ]
        },
        xAxis: {
          type: 'category',
          interval: true,
          axisLabel: {
            rotate: 45
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {},
        color: ['#4FA8F9', '#3c67b9'],
        grid: {
          show: true,
          backgroundColor: '#FAFAFA',
          left: 70,
          right: 20,
          top: 20
        },
        series: [
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            barWidth: 10
          }
        ]
      };
      myChart.setOption(option);
    }

    return {
      title: {
        text: '中国专利申请与公开数总览',
        left: 'center',
        top: 20
      },
      visualMap: {
        min: 0,
        max: 1000000,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],
        calculable: false,
        orient: 'horizontal',
        inRange: {
          color: ['#e8f7ff', '#006edd'],
          symbolSize: [30, 100]
        }
      },
      tooltip: {
        padding: 0,
        enterable: true,
        transitionDuration: 1,
        textStyle: {
          color: '#000',
          decoration: 'none'
        },
        formatter: function (params) {
          let tipHtml = '<div' +
            ' style="height:360px;width:400px;border-radius:5px;background:#fff;box-shadow:0 0 10px 5px #eee">' +
            '    <div style="height:50px;width:100%;border-radius:5px;background:#F8F9F9;border-bottom:1px solid #F0F0F0">' +
            '        <span style="line-height:50px;margin-left:18px">' +
            (params ? params.name : '') + '</span>' +
            '    </div>' +
            '    <div style="height:110px;width:100%;background:#fff">' +
            '        <div style="padding-left:18px;padding-top:22px">' +
            '            <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgba(92,169,235,1)"></span>' +
            '            <span>专利申请总数</span>' +
            '            <span style="float:right;margin-right:18px">' +
            (params.data ? params.data.tipData[0] : '') + '</span>' +
            '        </div>' +
            '        <div style="padding-left:18px;padding-top:14px">' +
            '            <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgba(92,169,235,1)"></span>' +
            '            <span>专利公开总数</span>' +
            '            <span style="float:right;margin-right:18px">' +
            (params.data ? params.data.tipData[1] : '') + '</span>' +
            '        </div>' +
            '    </div>' +
            '    <div id="tooltipBarId" style="height:200px;width:100%;border-radius:0 0 5px 0;background:#fff"></div>' +
            '</div>';
          setTimeout(function () {
            tooltipCharts(params.name);
          }, 5);
          return tipHtml;
        }
      },
      series: [
        {
          name: 'patent',
          type: 'map',
          mapType: 'china',
          itemStyle: {
            normal: {
              label: {
                show: false
              }
            },
            emphasis: {
              label: {
                show: true
              }
            }
          },
          data: heatMapData
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
          minWidth: '550px',
          height: 'calc(100vh - 70px)',
          minHeight: '500px'
        }}
      />
    </div>
  );
};

OverviewMapChart.propTypes = {};

export default OverviewMapChart;
