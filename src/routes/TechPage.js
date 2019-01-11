import React, { PureComponent } from 'react';
import { connect } from 'dva';

import 'antd/lib/input/style';

import styles from '../styles/TechPage.less';
import TechChart from '../components/tech/TechChart';
import TechRatioChart from '../components/tech/TechRatioChart';

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

  componentDidMount () {
    this.props.dispatcher.tech.fetch();
  }

  render () {
    const {tech: {data}} = this.props;
    return (
      JSON.stringify(data) !== '{}' &&
      <div className={styles['g-main']}>
        <div className={styles['g-left']}>
          <TechChart data={data}/>
        </div>
        <div className={styles['g-right']}>
          <TechRatioChart data={data}/>
        </div>
      </div>
    );
  }
}

TechPage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(TechPage);
