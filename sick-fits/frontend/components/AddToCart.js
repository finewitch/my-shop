import React from 'react';
import {Query, Mutation} from 'react-apollo'; 
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';


const ADD_TO_CART = gql`
    mutation addToCart($id: ID!){
        addToCart(id: $id){
            id
            quantity
        }
    }`


class AddToCart extends React.Component {
    render() {
        const { id } = this.props;
        // console.log(id, '<--')
        return (
            <div>
                <Mutation refetchQueries= {[{query: CURRENT_USER_QUERY}]} mutation={ ADD_TO_CART } variables={ {id} }>

                    {(addToCart, {error, loading})=>(<button disabled={loading} onClick={addToCart}>add to cart</button>)}
                    
                </Mutation>
            </div>
        );
    }
}

export default AddToCart;
