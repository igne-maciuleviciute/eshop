import React, { Component } from 'react';
import { Input, InputNumber, Button, Layout, Table } from 'antd';
import { Menu, Dropdown, Icon, notification } from 'antd';
import ReactRouter from 'react-router-dom'

import './CartPage.module.less';

const { Content } = Layout;

class CartPage extends Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem("shoppingBag") !== null) {
            const products = JSON.parse(localStorage.getItem("shoppingBag"));
            this.state = {
                products: products,
                productsSizes: products.map(el => { return "-" }),
                productsAmount: products.map(el => { return 0 }),
                productsAmountInserted: products.map(el => { return 0 }),
                amountInputDisabled: products.map(el => { return true }),
                totalProductPrice: products.map(el => { return 0 }),
                totalPrice: 0,
                name: '',
                lastname: ''
            };
        } else {
            this.state = {
                products: [],
                productsSizes: [],
                productsAmount: [],
                productsAmountInserted: [],
                amountInputDisabled: [],
                totalProductPrice: [],
                totalPrice: 0,
                name: '',
                lastname: ''
            }
        }
    }
    openNotification = (message) => {
        notification['info']({
            message: message
        });
    };

    openSuccessNotification = (message) => {
        notification['success']({
            message: message
        });
    };

    handleSelectionBySize = (e) => {
        const chosenSize = e.key;
        const productSizes = e.item.props.product.size;
        const productIndex = e.item.props.indexofproduct;

        let productTotalAmount = 0;
        if (productSizes.hasOwnProperty(chosenSize)) {
            productTotalAmount = productSizes[chosenSize];
        }

        let stateAmountInputDisabled = [...this.state.amountInputDisabled];
        stateAmountInputDisabled[productIndex] = false;
        let stateProductAmount = [...this.state.productsAmount];
        stateProductAmount[productIndex] = productTotalAmount;
        let stateProductSizes = [...this.state.productsSizes];
        stateProductSizes[productIndex] = chosenSize.toUpperCase();

        this.setState({
            productsSizes: stateProductSizes,
            productsAmount: stateProductAmount,
            amountInputDisabled: stateAmountInputDisabled,
        })
    }

    handleLastnameInputValue = (e) => { this.setState({ lastname: e.target.value }) };
    handleNameInputValue = (e) => { this.setState({ name: e.target.value }) };

    onChangeAmountNumber = (price, index, inputValue) => {
        let totalPricesArray = [...this.state.totalProductPrice];
        let productsAmountInserted = [...this.state.productsAmountInserted];
        productsAmountInserted[index] = inputValue;
        totalPricesArray[index] = Math.round((inputValue * price) * 100) / 100
        const totalPriceSum = totalPricesArray.reduce((accumulator, currentValue) => accumulator + currentValue);
        this.setState({
            productsAmountInserted,
            totalProductPrice: totalPricesArray,
            totalPrice: Math.round(totalPriceSum * 100) / 100
        });

    }

    handleDeleteAction = index => {
        let products = [...this.state.products];
        products.splice(index, 1)
        this.openNotification("Product was removed")
        localStorage.setItem("shoppingBag", JSON.stringify(products));
        this.setState({
            products
        });
    }
    makeOrderId() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 18; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    handleBuyButtonClick = () => {
        if (this.state.products.length == 0) {
            this.openNotification("Add more products to the shopping cart!");
        } else {
            if (this.state.name.length > 0 && this.state.lastname.length > 0) {
                const productsPrices = [...this.state.totalProductPrice];
                const productsAmountInserted = [...this.state.productsAmountInserted];
                const priceFound = productsPrices.every(el => {
                    return el > 0;
                });

                const amountFound = productsAmountInserted.every(el => {
                    return el > 0;
                });

                if (!priceFound && !amountFound) {
                    this.openNotification('Product(-s) sizes, amounts not selected!');
                } else {
                    let orders = [];
                    if (localStorage.getItem("orders") !== null) {
                        orders = JSON.parse(localStorage.getItem("orders"));
                    }
                    const products = [...this.state.products];
                    orders.push({
                        orderId: this.makeOrderId(),
                        name: this.state.name,
                        lastname: this.state.lastname,
                        products: products.map((product, key) => { return { id: product.id, amount: this.state.productsAmountInserted[key] } }),
                        totalPrice: this.state.totalPrice
                    });
                    localStorage.setItem("orders", JSON.stringify(orders));
                    localStorage.setItem("shoppingBag", JSON.stringify([]));
                    this.props.history.push('/products')

                    this.openSuccessNotification('Your products have been ordered!');
                }
            } else {
                this.openNotification('User credentials not filled!');
            }
        }
    };

    render() {
        const columns = [
            { title: '#', dataIndex: 'num', key: 'num' },
            { title: 'Product', dataIndex: 'productTitle', key: 'productTitle' },
            { title: 'Unit price', dataIndex: 'unitPrice', key: 'unitPrice' },
            { title: 'Size', dataIndex: 'size', key: 'size' },
            { title: 'Amount', dataIndex: 'amount', key: 'amount' },
            { title: 'Price', dataIndex: 'totalprice', key: 'totalprice' },
            { title: 'Delete', dataIndex: 'delete', key: 'delete' }
        ];


        const products = this.state.products.map((product, key) => {

            const productSizes = product.sizesExist.map((element, id) => {
                let upperCase = element.toUpperCase();
                return (
                    <Menu.Item
                        key={element} onClick={this.handleSelectionBySize} product={product} indexofproduct={key}>
                        {upperCase}
                    </Menu.Item>
                );
            });



            const sizeDropDownButton = (
                <div className="ProductSizes">
                    <Dropdown overlay={<Menu>{productSizes}</Menu>} trigger={['click']}>
                        <Button>
                            {this.state.productsSizes[key]} <Icon type="down" />
                        </Button>
                    </Dropdown>
                </div >
            );

            const amountInputNumber = (
                <span >
                    <InputNumber
                        className="amountInput"
                        size="large"
                        min={0}
                        max={this.state.productsAmount[key]}
                        disabled={this.state.amountInputDisabled[key]}
                        defaultValue={0}
                        onChange={(inputValue) => this.onChangeAmountNumber(product.price, key, inputValue)} /> / {this.state.productsAmount[key]}
                </span>
            )

            return ({
                num: key + 1,
                key: key,
                productTitle: product.title,
                unitPrice: product.price,
                size: sizeDropDownButton,
                amount: amountInputNumber,
                totalprice: (`${this.state.totalProductPrice[key]} €`),
                delete: <Icon onClick={() => this.handleDeleteAction(key)} type="close" theme="outlined" />
            });
        });

        return (
            <Layout>
                <Content className="shoppingCart"
                    style={{ background: '#fff', padding: 24, margin: 0, minHeight: '83vh' }}>
                    <div className="shoppingCart-container" >
                        <div className="shoppingCart-container-userInfo">
                            <div className="shoppingCart-number">1</div>
                            <span className="shoppingCart-container-title">Customer info</span>
                            <Input className="shoppingCart-container-userInfo-name"
                                size="default"
                                placeholder="Name"
                                onChange={this.handleNameInputValue}
                                value={this.state.name}
                            />
                            <Input className="shoppingCart-container-userInfo-lastname"
                                size="default"
                                placeholder="Last Name"
                                onChange={this.handleLastnameInputValue}
                                value={this.state.lastname}
                            />
                        </div>
                        <div className="shoppingCart-container-products">
                            <div className="shoppingCart-number2">2</div>
                            <span className="shoppingCart-container-title" style={{ marginLeft: "1.8%" }}>Products (choose size and amount)</span>
                            <div >
                                <div className="shoppingCart-table">
                                    <Table
                                        columns={columns}
                                        dataSource={products}
                                        pagination={false}
                                    />
                                </div>
                                <div className="totalPrice">
                                    <h1>Total price: {this.state.totalPrice} €</h1>
                                </div>
                            </div>
                        </div>
                        <div className="shoppingCart-button">
                            <Button type="primary"
                                onClick={this.handleBuyButtonClick}
                            >BUY</Button>
                        </div>
                    </div>
                </Content>
            </Layout >
        )
    };
}

export default CartPage;