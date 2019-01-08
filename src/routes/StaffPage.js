import React, { PureComponent } from 'react';
import { connect } from 'dva';

import styles from '../styles/StaffPage.less';

// const mapStateToProps = ({ help }) => ({
//   help,
// });
//
// const mapDispatchToProps = dispatch => ({
//   dispatch,
//   dispatcher: {
//     help: {
//       fetch: payload => dispatch({ type: 'help/fetch', payload }),
//     },
//   },
// });

class StaffPage extends PureComponent {

  // componentDidMount () {
  //   this.props.dispatcher.help.fetch();
  // }

  render () {
    return (
      <div className={styles['g-main']}>
      </div>
    );
  }
}

StaffPage.propTypes = {};

// export default connect(mapStateToProps, mapDispatchToProps)(StaffPage);
export default connect()(StaffPage);
