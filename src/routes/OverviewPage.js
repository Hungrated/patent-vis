import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from '../styles/OverviewPage.less';

import OverviewMapChart from '../components/overview/OverviewMapChart';
import ProvinceRankChart from '../components/overview/ProvinceRankChart';

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
        <div className={styles['g-left']}><OverviewMapChart data={data}/></div>
        <div className={styles['g-right']}><ProvinceRankChart data={data}/></div>
      </div>
    );
  }
}

TrendsPage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(TrendsPage);
