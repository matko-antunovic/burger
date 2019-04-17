import React, { Component } from 'react';
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"


class BurgerBuilder extends Component {
    
    state = {
        purchasing: false
        
    } 

     componentDidMount(){
        console.log(this.props); 
       this.props.onInitIngredients();
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients ).map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0 ;
    }

    purchaseHandler=()=> {
        this.setState({purchasing :true})
    }

    closedHandler=()=> {
    this.setState({purchasing: false});
    }

    continueHandler=() => {
        this.props.onInitPurchase();
       this.props.history.push("/checkout");
       

    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary= "null";
        let burger=this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>

        if (this.props.ings) {
            burger= (
                <Aux>
            <Burger ingredients={this.props.ings} />
            <BuildControls
                ordered={this.purchaseHandler}
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientRemoved}
                disabled={disabledInfo}
                purchasable={this.updatePurchaseState(this.props.ings)}
                price={this.props.price} />
                </Aux>
            );
            orderSummary = <OrderSummary 
            price={this.props.price}
            purchaseCancelled={this.closedHandler}
            purchaseContinued={this.continueHandler}
            ingredients={this.props.ings}/>
        }
        
        return (
            <Aux>
               <Modal 
               modalClosed={this.closedHandler}
               show={this.state.purchasing}>
               {orderSummary}
               </Modal>
               {burger}
            </Aux>
        );
    }
} 

const mapStateToProps= state => {
    return {
        error:state.burgerBuilder.error,
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice
    }
}

const mapDispatchToProps= dispatch => {
    return {
        onIngredientAdded:(ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved:(ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(actions.initIngredients()),
        onInitPurchase:()=>dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));