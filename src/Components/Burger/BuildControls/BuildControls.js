import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
]

const buildControls = (props) => {
    return (
        <div className={classes.BuildControl}>
            <h3>Total prices: <strong>{props.price.toFixed(2)}</strong></h3>
            {controls.map(ele => 
                <BuildControl 
                    key={ele.label} 
                    label={ele.label} 
                    added={() => props.ingredientAdded(ele.type)}
                    removed={() => props.ingredientRemoved(ele.type)}
                    disabled={props.disabledInfo[ele.type]}
                    />
            )}
            <button className={classes.OrderButton} 
                disabled={!props.purchaseable} 
                onClick={props.ordered}>
                {props.isAuth ? 'ORDER' : 'SIGN UP TO ORDER'}
                </button>
        </div>

    )
}

export default buildControls