import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from '../styles/TrendsPage.less';

import ApplyChart from '../components/trends/ApplyChart';

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

  componentDidMount () {
    this.props.dispatcher.trends.fetch();
  }

  render () {
    const {trends: {data}} = this.props;
    return (
      JSON.stringify(data) !== '{}' &&
      <div className={styles['g-main']}>
        <ApplyChart data={data}/>
      </div>
    );
  }
}

TrendsPage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(TrendsPage);
