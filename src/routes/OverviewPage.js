import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from '../styles/OverviewPage.less';

import OverviewMap from '../components/overview/OverviewMap';

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

class OverviewPage extends PureComponent {

  componentDidMount () {
    this.props.dispatcher.overview.fetch();
  }

  render () {
    const {overview: {data}} = this.props;
    return (
      JSON.stringify(data) !== '{}' &&
      <div className={styles['g-main']}>
        <OverviewMap data={data}/>
      </div>
    );
  }
}

OverviewPage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(OverviewPage);
