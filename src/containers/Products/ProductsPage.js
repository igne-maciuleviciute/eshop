import React, { Component } from 'react';
import {
    Layout,
    Menu,
    Icon,
    Card,
    Pagination,
    notification,
} from 'antd';

import FiltersHeader from '../../components/FiltersHeader/FiltersHeader';
import './ProductsPage.module.less';
import ProductCard from '../../components/ProductCard/ProductCard';

const { Meta } = Card;
const { Content } = Layout;
class ProductsPage extends Component {
    constructor(props) {
        super(props);
        const totalPages = (this.props.products.length / 12 > parseInt(this.props.products.length / 12)) ?
            parseInt(this.props.products.length / 12) + 1 :
            parseInt(this.props.products.length / 12)
            ;
        this.state = {
            products: this.props.products.filter((element, key) => { if (key < 12) return element }),
            filteredProducts: [],
            currentPage: 1,
            totalPages: totalPages,
            allProducts: this.props.products,
            sliderValue: [0, 100],
            totalProductsCount: this.props.products.length,
        };
    }

    openNotification = (message) => {
        notification['success']({
            message: message
        });
    };

    handleTypeDropdown = (menuItemValue) => {
        const products = [...this.state.allProducts];
        const filteredProducts = products.filter(pr => {
            if (pr.type === menuItemValue) {
                return pr;
            }
        });

        this.recalculateTotalPages(filteredProducts);
    }

    handleSizeDropdown = (menuItemValue) => {
        const products = [...this.state.allProducts];
        const filteredProducts = products.filter(prod => {
            if (menuItemValue in prod.size) {
                return prod;

            }
        });

        this.recalculateTotalPages(filteredProducts);
    }

    handlePriceSlider = (sliderValue) => {
        const products = [...this.state.allProducts];
        let filteredProducts = products.filter(product => {
            if (product.price >= sliderValue[0] && product.price <= sliderValue[1]) {
                return product;
            }
        });
        this.recalculateTotalPages(filteredProducts);
    };

    componentDidUpdate() {
        if (this.state.products) {
            if (this.state.allProducts.length !== this.props.products.length
                && this.props.products.length < this.state.totalProductsCount) {
                this.recalculateTotalPages(this.props.products, false);
            }
        }
    }

    recalculateTotalPages = (filteredProducts, filtering = true) => {
        const totalPages = (filteredProducts.length / 12 > parseInt(filteredProducts.length / 12)) ?
            parseInt(filteredProducts.length / 12) + 1 :
            parseInt(filteredProducts.length / 12)
            ;
        const from = 0;
        const till = 12;
        const products = filteredProducts.filter((product, key) => {
            if (key >= from && key < till) {
                return product
            }
        });
        if (filtering) {
            this.setState({
                currentPage: 1,
                products,
                totalPages
            });
        } else {
            this.setState({
                currentPage: 1,
                products,
                totalPages,
                allProducts: filteredProducts
            });
        }
    };

    handlePaginationClick = (currentPage) => {
        const allProducts = [...this.state.allProducts];
        const from = (currentPage - 1) * 12;
        const till = from + 12;
        const products = allProducts.filter((product, key) => {
            if (key >= from && key < till) {
                return product
            }
        });

        this.setState({
            currentPage,
            products
        });
    };

    handleRemoveFilters = () => {
        this.recalculateTotalPages(this.props.products);
    }

    render() {
        const cardList = this.state.products.map((product, key) => {
            return <ProductCard product={product} key={product.id} />
        })

        return (
            <Layout>
                <FiltersHeader handleSlider={this.handlePriceSlider}
                    handleType={this.handleTypeDropdown}
                    handleSize={this.handleSizeDropdown}
                    handleRemoveFilters={this.handleRemoveFilters}
                />
                <Content
                    className="content"
                >
                    {cardList}
                    <div className="productPagination">
                        <Pagination
                            current={this.state.currentPage}
                            total={this.state.totalPages * 10}
                            onChange={this.handlePaginationClick}
                        />
                    </div>
                </Content>
            </Layout >
        )
    }
}

export default ProductsPage;