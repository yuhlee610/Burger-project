import React from 'react'
import Order from '.././../Components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../Components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'

class Orders extends React.Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        // axios.get('/orders.json')
        //     .then(res => {
        //         const fetchOrders = []
        //         for (let key in res.data){
        //             fetchOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             })
        //         }
        //         this.setState({orders: fetchOrders, loading: false})
        //     })
        //     .catch(err => {
        //         this.setState({loading:false})
        //     })

        this.props.onFetchOrders()
    }

    render() {

        let orders = <Spinner/>
        console.log(this.props.orders)
        if(!this.props.loading) {
            orders = this.props.orders.map(order => (
                    <Order key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}/>
                ))
            
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))