import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Products from "./components/views/products/Products";
import Layout from "./components/layouts/Layout";
import Cart from "./components/views/cart/Cart";
import * as stateService from "./services/stateService";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = stateService.initiateState();
    }

    onClearCart() {
        this.setState(stateService.clearCart(this.state));
    }

    onAddProduct(productId) {
        this.setState(stateService.addProductToCart(this.state, productId));
    };

    onRemoveCartRow(productId) {
        this.setState(stateService.removeProductTypeFromCart(this.state, productId));
    }

    onRemoveCartProduct(productId) {
        this.setState(stateService.removeProductFromCart(this.state, productId));
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route exact path="/"
                                   render={() =>
                                       <Products products={this.state.products}
                                                 onAddProduct={productId => this.onAddProduct(productId)}/>}
                            />
                            <Route exact path="/cart"
                                   render={() =>
                                       <Cart cart={this.state.cart}
                                             products={this.state.products}
                                             onClearCart={() => this.onClearCart()}
                                             onRemoveCartRow={productId => this.onRemoveCartRow(productId)}
                                             onRemoveCartProduct={productId => this.onRemoveCartProduct(productId)}/>}
                            />
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
