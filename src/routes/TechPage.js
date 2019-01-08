import React, { PureComponent } from 'react';
import { connect } from 'dva';

import 'antd/lib/input/style';

import styles from '../styles/TechPage.less';
import TechChart from '../components/tech/TechChart';

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
    console.log(data);
    return (
      JSON.stringify(data) !== '{}' &&
      <div className={styles['g-main']}>
        <TechChart data={data}/>
      </div>
    );
  }
}

TechPage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(TechPage);
