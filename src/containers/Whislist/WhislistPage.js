import React, { Component } from 'react';
import {
    Layout,
    Icon
} from 'antd';

import './WhislistPage.module.less';
import '../Home/HomePage';
import ProductCard from '../../components/ProductCard/ProductCard';

const { Content } = Layout;
class WishlistPage extends Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem("wishlist") !== null) {
            this.state = {
                productsWithFilledHeart: [],
                products: JSON.parse(localStorage.getItem("wishlist"))
            };
        }
    }


    render() {
        const cardList = this.state.products.map((product, key) => {
            return (
                <ProductCard product={product} key={product.id} />
            );
        });
        const warningMsg = (
            <div className="warningMsg">
                <Icon
                    className="warningMsgIcon"
                    type="heart"
                    theme="outlined" />
                <h1>You haven't saved any products to your Wishlist</h1>
                <h1 className="warningMsg2">Start saving as you shop by selecting the little heart. </h1>
                <Icon
                    className="warningMsgIcon"
                    type="heart"
                    theme="outlined" />
            </div>
        );

        return (
            <Layout>
                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: '83vh' }}>
                    {this.state.products.length ? cardList : warningMsg}
                </Content>
            </Layout>
        )
    }
}

export default WishlistPage;