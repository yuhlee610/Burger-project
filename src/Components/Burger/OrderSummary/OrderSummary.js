import React from 'react'
import Aux from '../../../hoc/myAux/myAux'
import Button from '../../UI/Button/Button'

class OrderSummary extends React.Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igkey => {
            return (
                <li key={igkey}><span style={{textTransform: 'capitalize'}}>{igkey}</span>: {this.props.ingredients[igkey]}</li>
            )
        })

        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicous burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Price: <strong>{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout ?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelHandler}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinueHandler}>Continue</Button>
            </Aux>
        )
    }
} 

export default OrderSummary