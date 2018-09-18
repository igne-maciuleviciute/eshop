import React, { Component } from 'react';
import { Layout } from 'antd';
import './GlobalFooter.less';

const { Footer } = Layout;

class GlobalFooter extends Component {

    render() {
        return (
            <Layout>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Igne Maciuleviciute
                </Footer>
            </Layout>
        )
    }
}

export default GlobalFooter;