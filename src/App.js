import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout'
import {Route, Switch, Redirect} from 'react-router-dom'
import Orders from './Containers/Orders/Orders'
import Auth from './Containers/Auth/Auth'
import Logout from './Containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'
import {connect} from 'react-redux'
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./Containers/Checkout/Checkout')
})
const asyncOrders = asyncComponent(() => {
  return import('./Containers/Orders/Orders')
})
const asyncAuth = asyncComponent(() => {
  return import('./Containers/Auth/Auth')
})

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth}/>
        <Route path="/" component={BurgerBuilder}/> 
        <Redirect to="/"/>
      </Switch>
    )
    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={asyncAuth}/>
          <Route path="/orders" component={asyncOrders}/>
          <Route path="/" component={BurgerBuilder}/> 
          <Redirect to="/"/>
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
