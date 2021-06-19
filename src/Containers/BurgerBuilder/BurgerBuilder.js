import React, {Component} from 'react'
import Aux from '../../hoc/myAux/myAux'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import Modal from '../../Components/UI/Modal/Modal'
import axios from '../../axios-orders'
import Spinner from '../../Components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'



class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {...}
    // }
    state = {
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        this.props.onInitIngredients()
        // axios.get('https://react-my-burger-545ae-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})
        //         console.log("1")
        //     })
        //     .catch(err => {
        //         this.setState({error: true})
        //     })

    }


    addIngredientHandler = (type) => {
        // const oldCount = this.state.ingredients[type]
        // const updateCount = oldCount + 1

        // const updateIngredient = {...this.state.ingredients}
        // updateIngredient[type] = updateCount
        // const updateTotalPrice = this.state.totalPrice + INGREDIENT_PRICE[type]

        // this.setState({ingredients: updateIngredient, totalPrice: updateTotalPrice})
        // this.updatePurchaseable(updateIngredient)
    }

    removeIngredientHandler = (type) => {
        // const oldCount = this.state.ingredients[type]

        // if(oldCount <= 0) {
        //     return
        // }

        // const updateCount = oldCount - 1

        // const updateIngredient = {...this.state.ingredients}
        // updateIngredient[type] = updateCount
        // const updateTotalPrice = this.state.totalPrice - INGREDIENT_PRICE[type]

        // this.setState({ingredients: updateIngredient, totalPrice: updateTotalPrice})
        // this.updatePurchaseable(updateIngredient)
    }

    updatePurchaseable = (ingredients) => {
        const sum = Object.keys(ingredients).map(key => ingredients[key]).reduce((sum, ele) => sum + ele , 0)
        return sum > 0
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true})
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit()
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = {
            // ...this.state.ingredients
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null


        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>
        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        purchaseable={this.updatePurchaseable(this.props.ings)}/>      
                </Aux>
            )
            orderSummary = <OrderSummary ingredients={this.props.ings}
                                price={this.props.price}
                                purchaseCancelHandler={this.purchaseCancelHandler}
                                purchaseContinueHandler={this.purchaseContinueHandler}/>
        }
        // if(this.state.loading){
        //     orderSummary = <Spinner/>
        // }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))