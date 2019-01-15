import React from 'react';
import styles from '../../styles/TechOverviewChart.less';
import ReactEcharts from 'echarts-for-react';

const TechOverviewChart = ({data}) => {

  const partsData = data.parts || {};

  const partsByYearData = data.partsByYear || {};

  const getOption = () => {

    const parts = Object.keys(partsData);

    let dataInvent = {};

    let dataPractical = {};

    for (let i = 1985; i <= 2015; i++) {
      dataInvent[i.toString()] = [];
      dataPractical[i.toString()] = [];
    }

    parts.forEach(function (item) {
      for (let i = 1985; i <= 2015; i++) {
        let dataIdx = '[' + i + item + ']';
        dataInvent[i.toString()].push(
          partsByYearData[dataIdx]['发明']);
        dataPractical[i.toString()].push(
          partsByYearData[dataIdx]['实用新型']);
      }
    });

    let dataMap = {};

    function dataFormatter (obj) {
      if (!obj || obj === {}) {
        return {};
      }
      let xAxisArr = parts;
      let temp;
      for (let year = 1985; year <= 2015; year++) {
        let max = 0;
        let sum = 0;
        temp = obj[year];
        for (let i = 0, l = temp.length; i < l; i++) {
          max = Math.max(max, temp[i]);
          sum += temp[i];
          obj[year][i] = {
            name: xAxisArr[i],
            value: temp[i]
          };
        }
        obj[year + 'max'] = Math.floor(max / 100) * 100;
        obj[year + 'sum'] = Number(sum).toFixed(2);
      }
      return obj;
    }

    dataMap.dataInvent = dataFormatter(dataInvent);

    dataMap.dataPractical = dataFormatter(dataPractical);

    let innerOptions = [];

    for (let i = 1985; i <= 2015; i++) {
      let yearIdx = i.toString();
      innerOptions.push({
        title: {
          text: yearIdx + '年专利大类中发明与实用新型专利情况',
          left: 'center',
          top: 20
        },
        series: [
          {data: dataMap.dataInvent[yearIdx]},
          {data: dataMap.dataPractical[yearIdx]},
          {
            data: [
              {name: '发明', value: dataMap.dataInvent[yearIdx + 'sum']},
              {name: '实用新型', value: dataMap.dataPractical[yearIdx + 'sum']}
            ]
          },
          {
            data: parts.map(function (item, i) {
              return {
                name: item + '：' + partsData[item],
                value: dataMap.dataInvent[yearIdx][i].value +
                  dataMap.dataPractical[yearIdx][i].value
              };
            })
          }
        ]
      });
    }

    return {
      baseOption: {
        timeline: {
          axisType: 'category',
          autoPlay: true,
          loop: false,
          playInterval: 200,
          data: [
            '1985-01-01',
            '1986-01-01',
            '1987-01-01',
            '1988-01-01',
            '1989-01-01',
            '1990-01-01',
            '1991-01-01',
            '1992-01-01',
            '1993-01-01',
            '1994-01-01',
            '1995-01-01',
            '1996-01-01',
            '1997-01-01',
            '1998-01-01',
            '1999-01-01',
            '2000-01-01',
            '2001-01-01',
            '2002-01-01',
            '2003-01-01',
            '2004-01-01',
            '2005-01-01',
            '2006-01-01',
            '2007-01-01',
            '2008-01-01',
            '2009-01-01',
            '2010-01-01',
            '2011-01-01',
            '2012-01-01',
            '2013-01-01',
            '2014-01-01',
            '2015-01-01'
          ],
          label: {
            formatter: function (s) {
              return (new Date(s)).getFullYear();
            }
          }
        },
        dataZoom: [
          {
            show: true,
            width: 20,
            yAxisIndex: [0],
            right: 80,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '120%',
            handleStyle: {
              color: '#d3dee5'
            },
            borderColor: '#90979c'
          }
        ],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          x: 'right',
          data: ['发明', '实用新型'],
          right: '20%'
        },
        calculable: true,
        grid: {
          top: 80,
          left: '14%',
          right: '14%',
          bottom: 100
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {interval: 0},
            data: parts,
            splitLine: {show: false}
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '专利数（项）',
            max: 250000
          }
        ],
        series: [
          {name: '发明', type: 'bar'},
          {name: '实用新型', type: 'bar'},
          {
            name: '专利类型占比',
            type: 'pie',
            center: ['80%', '12%'],
            radius: '18%',
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            }
          },
          {
            name: '专利大类占比',
            type: 'pie',
            center: ['80%', '35%'],
            radius: '18%',
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            }
          }
        ]
      },
      options: innerOptions
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
          width: '100%',
          height: 'calc(100vh - 100px)'
        }}
      />
    </div>
  );
};

TechOverviewChart.propTypes = {};

export default TechOverviewChart;
