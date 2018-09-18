import React, { Component } from 'react';
import {
    Icon,
    Card,
    notification,
} from 'antd';

import './ProductCard.less';

const { Meta } = Card;
class ProductCard extends Component {

    state = {
        productsWithFilledHeart: false,
        productsWithFilledCart: false
    };

    openNotification = (message) => {
        notification['success']({
            message: message
        });
    };

    handleHeartButtonClick = (product) => {
        let products = [];
        if (localStorage.getItem("wishlist") !== null) {
            products = JSON.parse(localStorage.getItem("wishlist"));
            let found = products.some(el => {
                return el.id === product.id;

            });
            if (!found) {
                products.push(product);
                this.openNotification("Item was liked");
            }
            else {
                products = products.filter(element => {
                    if (product.id !== element.id) {
                        return element;
                    }
                });
                this.openNotification("Item was disliked");
            }
        }
        else {
            products.push(product);
            this.openNotification("Item was liked");
        }
        localStorage.setItem("wishlist", JSON.stringify(products));
    }

    handleShoppingBagClick = (product) => {
        let products = [];
        if (localStorage.getItem("shoppingBag") !== null) {
            products = JSON.parse(localStorage.getItem("shoppingBag"));
            let found = products.some(el => {
                return el.id === product.id;

            });
            if (!found) {
                products.push(product);
                this.openNotification(`${product.title} was added to shopping cart!`);
            } else {
                this.openNotification(`${product.title} already exist in shopping cart!`);
            }
        } else {
            products.push(product);
            this.openNotification(`${product.title} was added to shopping cart!`);
        }
        localStorage.setItem("shoppingBag", JSON.stringify(products));
    };

    handleHoverOnHeartIcon = () => {
        this.setState({
            productsWithFilledHeart: !this.state.productsWithFilledHeart
        });
    };

    handleHoverOnCartIcon = () => {
        this.setState({
            productsWithFilledCart: !this.state.productsWithFilledCart
        });
    };


    render() {
        const { product } = this.props;
        let heartIconTheme = this.state.productsWithFilledHeart ? "filled" : "outlined";
        if (localStorage.getItem("wishlist") !== null) {
            let products = JSON.parse(localStorage.getItem("wishlist"));
            let found = products.some(el => {
                return el.id === product.id;
            });
            if (found) heartIconTheme = "filled";
        }

        let cartIconTheme = this.state.productsWithFilledCart ? "filled" : "outlined";
        if (localStorage.getItem("shoppingBag") !== null) {
            let products = JSON.parse(localStorage.getItem("shoppingBag"));
            let found = products.some(el => {
                return el.id === product.id;
            });
            if (found) cartIconTheme = "filled";
        }
        return (
            <Card
                key={product.id}
                className="content-card"
                cover={<img alt="example" src={product.image} />}
            >
                <Icon
                    className="shopping-cart-icon"
                    type="shopping"
                    onMouseEnter={() => this.handleHoverOnCartIcon()}
                    onMouseLeave={() => this.handleHoverOnCartIcon()}
                    onClick={() => this.handleShoppingBagClick(product)}
                    theme={cartIconTheme}
                />

                <Icon
                    className="content-icon"
                    onClick={() => this.handleHeartButtonClick(product)}
                    onMouseEnter={() => this.handleHoverOnHeartIcon()}
                    onMouseLeave={() => this.handleHoverOnHeartIcon()}
                    type="heart"
                    theme={heartIconTheme}
                />
                <Meta
                    title={product.title}
                    description={`${product.price} €`}
                />
            </Card>
        );
    }
}

export default ProductCard;