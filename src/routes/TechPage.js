import React, { PureComponent } from 'react';
import { connect } from 'dva';

import 'antd/lib/button/style';

import styles from '../styles/TechPage.less';
import TechChart from '../components/tech/TechChart';
import TechRatioChart from '../components/tech/TechRatioChart';
import { Button } from 'antd';
import TechOverviewChart from '../components/tech/TechOverviewChart';

const mapStateToProps = ({tech}) => ({
  tech
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    tech: {
      fetch: payload => dispatch({type: 'tech/fetch', payload})
    }
  }
});

class TechPage extends PureComponent {

  constructor (props, context) {
    super(props, context);
    this.state = {
      chartNum: 0
    };
  }

  componentDidMount () {
    this.props.dispatcher.tech.fetch();
  }

  changeChart (num) {
    this.setState({
      chartNum: num
    });
  };

  render () {
    const {tech: {data}} = this.props;
    return (
      JSON.stringify(data) !== '{}' &&
      <div className={styles['g-main']}>
        <div className={styles['m-buttons']}>
          <Button className={styles['m-button']}
                  type="primary" onClick={() => {
            this.changeChart(0);
          }}>变化趋势</Button><br/>
          <Button className={styles['m-button']}
                  type="primary" onClick={() => {
            this.changeChart(1);
          }}>类型</Button>
        </div>
        {
          this.state.chartNum === 0
            ? (<TechOverviewChart data={data}/>)
            : (<div>
              <div className={styles['g-left']}>
                <TechRatioChart data={data}/>
              </div>
              <div className={styles['g-right']}>
                <TechChart data={data}/>
              </div>
            </div>)
        }
      </div>
    );
  }
}

TechPage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(TechPage);
