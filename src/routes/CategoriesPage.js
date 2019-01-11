import React, { PureComponent } from 'react';
import { connect } from 'dva';

import CategoriesChart from '../components/categories/CategoriesChart';
import CategoriesTrendChart
  from '../components/categories/CategoriesTrendChart';
import styles from '../styles/CategoriesPage.less';
import CategoriesYearChart from '../components/categories/CategoriesYearChart';

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
        <div className={styles['g-left']}>
          <CategoriesChart data={data}/>
        </div>
        <div className={styles['g-right']}>
          <CategoriesTrendChart data={data}/>
          <CategoriesYearChart data={data}/>
        </div>
      </div>
    );
  }
}

CategoriesPage.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
