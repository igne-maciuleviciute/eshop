import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Input } from 'antd';
import './GlobalHeader.less';

const Search = Input.Search;
const { Header } = Layout;

class GlobalHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuItemsClicked: []
        };
    }

    handleMenuItemClick(event) {
        this.setState({
            menuItemsClicked: [event.key]
        });
    };

    handleLogoClick = () => {
        this.setState({
            menuItemsClicked: []
        });
    };

    handleSearchInput = (e) => {
        this.props.handleSearch(e.target.value);
    };

    render() {

        return (
            <Layout>
                <Header className="header" theme="dark">
                    <span className="header-logo">Eshop</span>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ lineHeight: '64px' }}
                        defaultSelectedKeys={[]}
                        selectedKeys={this.state.menuItemsClicked}
                        className="header-menu"
                    >
                        <Menu.Item
                            className="header-menu-item border-left"
                            key="Orders"
                            onClick={this.handleMenuItemClick.bind(this)}
                        >
                            <Link to='/orders'>Orders</Link>
                        </Menu.Item>
                        <Menu.Item
                            className="header-menu-item border-right border-left"
                            key="Products"
                            onClick={this.handleMenuItemClick.bind(this)}
                        >
                            <Link to='/products'>Products</Link>
                        </Menu.Item>
                    </Menu >
                    <div className="header-search">
                        <Search
                            className="header-search-input"
                            placeholder="Search..."
                            onChange={this.handleSearchInput}
                        />
                    </div>
                    <div className="header-icon">
                        <div className="header-icon-whislist">
                            <Link to='/whislist'><Icon type="heart-o" /></Link>
                        </div>
                        <div className="header-icon-shopping-cart">
                            <Link to='/cart'><Icon type="shopping-cart" /></Link>
                        </div>
                    </div>
                </Header>

            </Layout >
        );
    }
}

export default GlobalHeader;