import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Menu } from 'antd';
import 'antd/lib/menu/style';
import styles from '../../styles/GlobalHeader.less';

const mapStateToProps = ({header}) => ({
  header
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    header: {
      redirect: payload => dispatch({type: 'header/redirect', payload})
    }
  }
});

const navItems = [
  {
    key: 'trends',
    tlt: '专利趋势',
    link: '/trends'
  },
  {
    key: 'categories',
    tlt: '类 型',
    link: '/categories'
  },
  {
    key: 'tech',
    tlt: '技术分布',
    link: '/tech'
  },
  {
    key: 'staff',
    tlt: '研发人员',
    link: '/staff'
  }
];

class GlobalHeader extends PureComponent {

  state = {
    current: window.location.pathname.substring(1) || 'trends'
  };

  togglePageRedirect = (key, link) => {
    this.setState({
      current: key
    });
    this.props.dispatcher.header.redirect({
      link: link,
      params: {}
    });
  };

  handleClick = (e) => {
    const link = e.item.props.link;
    if ((/^(http|https):\/\//).test(link)) {
      window.open(link);
    } else {
      this.togglePageRedirect(e.key, link);
    }
  };

  render () {
    return (
      <div className={styles['g-header']}>
        <div className={styles['m-logo']}>
          <img className={styles['inner']}
               src={require('../../assets/patent-vis-logo.png')}
               alt={'logo'}/>
        </div>
        <div className={styles['m-nav']}>
          <Menu onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                theme={'dark'}
                mode={'horizontal'}
          >
            {
              navItems.map(({key, tlt, link}) => (
                <Menu.Item key={key} link={link}>
                  <strong>{tlt}</strong>
                </Menu.Item>
              ))
            }
          </Menu>
        </div>
      </div>
    );
  }
}

GlobalHeader.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalHeader);

