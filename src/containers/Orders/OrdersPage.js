import React, { Component } from 'react';
import { Layout } from 'antd';
import { Table } from 'antd';

import './OrdersPage.module.less';

const { Content } = Layout;
class OrdersPage extends Component {

    constructor(props) {
        super(props);
        if (JSON.parse(localStorage.getItem('orders')) !== null) {
            this.state = {
                products: this.props.products,
                orders: [...this.props.orders, ...JSON.parse(localStorage.getItem('orders'))],
                ordersLength: [...this.props.orders, ...JSON.parse(localStorage.getItem('orders'))].length
            };
        } else {
            this.state = {
                products: this.props.products,
                orders: this.props.orders,
                ordersLength: this.props.orders.length
            };
        }
    }

    componentDidUpdate() {
        if (this.state.orders) {
            if (this.state.orders.length !== this.props.orders.length) {
                let value = this.props.searchValue.trim();
                if (value !== '') {
                    this.setState({ orders: this.props.orders });
                }
            }
        }
    }

    expandedRowRender = (ordersProducts) => {
        const columns = [
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: 'Title', dataIndex: 'title', key: 'title' },
            { title: 'Amount', dataIndex: 'amount', key: 'amount' },
            { title: 'Price', dataIndex: 'price', key: 'price' },
        ];

        const productsList = ordersProducts.map((element, key) => {
            let index = this.state.products.map(product => { return product.id }).indexOf(element.id);
            let product = { ...this.state.products[index] };
            return ({
                id: element.id,
                key: key,
                title: product.title,
                amount: element.amount,
                price: (`${Math.round(product.price * element.amount * 100) / 100} €`),
            })
        });

        return (
            <Table
                columns={columns}
                dataSource={productsList}
                pagination={false}
            />
        );
    };


    render() {

        const columns = [
            { title: 'Order ID', dataIndex: 'id', key: 'id' },
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Lastname', dataIndex: 'lastname', key: 'lastname' },
            { title: 'Total price', dataIndex: 'totalprice', key: 'totalprice' }
        ];


        const ordersFilter = this.state.orders.map((order, key) => {
            return ({
                id: order.orderId,
                key: key,
                name: order.name,
                lastname: order.lastname,
                totalprice: (`${Math.round(order.totalPrice * 100) / 100} €`),
                products: order.products
            });
        });

        return (
            <Layout>
                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: '83vh' }}>
                    <Table
                        columns={columns}
                        expandedRowRender={(record) => this.expandedRowRender(record.products)}
                        dataSource={ordersFilter}
                        pagination={false}
                    />
                </Content>
            </Layout >
        )
    };
}

export default OrdersPage;

