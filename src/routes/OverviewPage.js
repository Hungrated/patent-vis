import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from '../styles/OverviewPage.less';

import OverviewMapChart from '../components/overview/OverviewMapChart';
import QuarterScatterChart from '../components/overview/QuarterScatterChart';
import SimpleApplyChart from '../components/overview/SimpleApplyChart';
import ProvinceRankChart from '../components/overview/ProvinceRankChart';
import SimpleCategoriesChart from '../components/overview/SimpleCategoriesChart';

const mapStateToProps = ({overview}) => ({
  overview
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    overview: {
      fetch: payload => dispatch({type: 'overview/fetch', payload})
    }
  }
});

class TrendsPage extends PureComponent {

  componentDidMount () {
    this.props.dispatcher.overview.fetch();
  }

  render () {
    const {overview: {data}} = this.props;
    return (
      JSON.stringify(data) !== '{}' &&
      <div className={styles['g-main']}>
        <div className={styles['g-left']}>
          <QuarterScatterChart data={data}/>
          <SimpleApplyChart data={data}/>
        </div>
        <div className={styles['g-middle']}>
          <OverviewMapChart data={data}/>
        </div>
        <div className={styles['g-right']}>
          <ProvinceRankChart data={data}/>
          <SimpleCategoriesChart data={data}/>
        </div>
      </div>
    );
  }
}

TrendsPage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(TrendsPage);
