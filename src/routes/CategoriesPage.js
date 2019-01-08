import React, { PureComponent } from 'react';
import { connect } from 'dva';

import StatisticsChart from '../components/categories/CategoriesChart';
import styles from '../styles/CategoriesPage.less';

const mapStateToProps = ({categories}) => ({
  categories
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    categories: {
      fetch: payload => dispatch({type: 'categories/fetch', payload})
    }
  }
});

class CategoriesPage extends PureComponent {

  componentDidMount () {
    this.props.dispatcher.categories.fetch();
  }

  render () {
    const {categories: {data}} = this.props;
    return (
      JSON.stringify(data) !== '{}' &&
      <div className={styles['g-main']}>
        <StatisticsChart data={data}/>
      </div>
    );
  }
}

CategoriesPage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
