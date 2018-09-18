import React, { Component } from 'react'
import { Icon } from 'antd';
import { Link } from 'react-router-dom';

import './FooterNavigation.less';

class FooterNavigation extends Component {

    render() {
        return (
            <div className="footerNavigation">
                <Link to='/products'>
                    <span className="footerNavigation-icon">
                        <Icon type="skin" />
                    </span>
                </Link>
                <Link to='/orders'>
                    <span className="footerNavigation-icon">
                        <Icon type="wallet" />
                    </span>
                </Link>
                <Link to='/whislist'>
                    <span className="footerNavigation-icon">
                        <Icon type="heart-o" />
                    </span>
                </Link>
                <Link to='/cart'>
                    <span className="footerNavigation-icon">
                        <Icon type="shopping-cart" />
                    </span>
                </Link>
            </div>
        );
    }
}

export default FooterNavigation;