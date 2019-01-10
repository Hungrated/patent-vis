import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import 'antd/lib/button/style';
import styles from '../styles/TrendsPage.less';

import ApplyChart from '../components/trends/ApplyChart';
import ApplyScatterChart from '../components/trends/ApplyScatterChart';
import ProvincesApplyChart from '../components/trends/ProvincesApplyChart';

const mapStateToProps = ({trends}) => ({
  trends
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    trends: {
      fetch: payload => dispatch({type: 'trends/fetch', payload})
    }
  }
});

class TrendsPage extends PureComponent {

  constructor (props, context) {
    super(props, context);
    this.state = {
      chartNum: 2
    };
  }

  componentDidMount () {
    this.props.dispatcher.trends.fetch();
  }

  changeChart (num) {
    this.setState({
      chartNum: num
    });
  };

  render () {

    const {trends: {data}} = this.props;

    return (
      JSON.stringify(data) !== '{}' &&
      (
        <div className={styles['g-main']}>
          <div className={styles['m-buttons']}>
            <Button type="primary" onClick={() => {this.changeChart(0);}}>趋
              势</Button><br/>
            <Button type="primary" onClick={() => {this.changeChart(1);}}>密
              度</Button><br/>
            <Button type="primary" onClick={() => {this.changeChart(2);}}>省
              份</Button>
          </div>
          {
            this.state.chartNum === 0
              ? (<ApplyChart data={data}/>)
              : (this.state.chartNum === 1
                ? (<ApplyScatterChart data={data}/>)
                : (<ProvincesApplyChart data={data}/>)
              )
          }
        </div>
      )
    );
  }
}

TrendsPage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(TrendsPage);
