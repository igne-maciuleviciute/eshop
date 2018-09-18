import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Homepage from '../../containers/Home/HomePage';
import Productspage from '../../containers/Products/ProductsPage';
import Orderspage from '../../containers/Orders/OrdersPage';
import GlobalHeader from '../GlobalHeader/GlobalHeader';
import Backend from './../../backend/Backend';
import WhislistPage from '../../containers/Whislist/WhislistPage';
import CartPage from '../../containers/ShoppingCart/CartPage';
import './App.less';
import FooterNavigation from '../FooterNavigation/FooterNavigation';

class App extends Component {

  constructor(props) {
    super(props);
    if (JSON.parse(localStorage.getItem('orders')) !== null) {
      this.state = {
        products: [...Backend.products, ...JSON.parse(localStorage.getItem('orders'))],
        orders: Backend.orders,
        searchValue: ''
      }
    } else {
      this.state = {
        products: Backend.products,
        orders: Backend.orders,
        searchValue: ''
      }
    }
  }

  fetchOrdersFromLocalStorage = () => {
    if (JSON.parse(localStorage.getItem('orders')) !== null) {
      return JSON.parse(localStorage.getItem('orders'));
    } else {
      return [];
    }
  };

  handleSearchInputChange = (val) => {
    const products = [...Backend.products];
    const orders = [...Backend.orders, ...this.fetchOrdersFromLocalStorage()];

    const re = new RegExp(val.toLowerCase());

    //Searching in products according: title
    const filteredProducts = products.filter(product => {
      let title = product.title.toLowerCase();
      if (title.search(re) !== -1) {
        return product;
      }
    });
    //Searching in orders according: orderId, name, lastname
    const filteredOrders = orders.filter(order => {
      let orderId = order.orderId.toLowerCase();
      let name = order.name.toLowerCase();
      let lastname = order.lastname.toLowerCase();
      if (orderId.search(re) !== -1 || name.search(re) !== -1 || lastname.search(re) !== -1) {
        return order;
      }
    });

    this.setState({
      products: filteredProducts,
      orders: filteredOrders,
      searchValue: val
    })
  };

  render() {
    return (
      <div className="App">
        <GlobalHeader
          handleSearch={this.handleSearchInputChange}
        />
        <Switch>
          <Route exact path='/' render={() => <Homepage products={this.state.products} />} />
          <Route exact path='/products' render={() => <Productspage products={this.state.products} />} />
          <Route exact path='/orders' render={() => <Orderspage products={this.state.products}
            orders={this.state.orders}
            searchValue={this.state.searchValue}
          />} />
          <Route exact path='/whislist' component={WhislistPage} />
          <Route exact path='/cart' component={CartPage} />
        </Switch>
        <FooterNavigation />
      </div>
    );
  }
}

export default App;