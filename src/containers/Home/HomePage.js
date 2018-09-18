import React, { Component } from 'react';
import {
    Layout
} from 'antd';
import ReactRouter from 'react-router-dom'

import './HomePage.module.less';

const { Content } = Layout;


class Homepage extends Component {
    render() {
        return (
            <Layout>
                <Content>
                    <div>
                        <h1 className="welcome">Welcome to eshop.</h1>
                        <img className="homePageImg"
                            src='https://i.pinimg.com/originals/a8/d3/df/a8d3dff222403f7391cb575602f01523.jpg' />
                        <link href="https://fonts.googleapis.com/css?family=Cinzel|Dancing+Script|Great+Vibes|Tangerine|Nothing+You+Could+Do" rel="stylesheet"></link>

                    </div>
                </Content>
            </Layout >
        )
    }
}

export default Homepage;
