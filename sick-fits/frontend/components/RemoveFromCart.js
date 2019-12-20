import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';


const REMOVE_CART_MUTATION =    gql`
mutation removeFromCart($id: ID!){
    removeFromCart(id: $id){
        id
    }
}
`
class RemoveFromCart extends Component {
    render() {
        return (
            <Mutation 
                refetchQueries= {[{query: CURRENT_USER_QUERY}]}
                mutation={REMOVE_CART_MUTATION}
                variables={{id: this.props.id}}>
                    {(removeFromCart, {loading, error})=>{
                        return(
                            <button 
                                disabled={loading}
                                className="cart-product-title remove" 
                                onClick={()=>{
                                removeFromCart().catch(err=> alert(err.message))
                            }}>✖</button>
                        )
                    }}
            </Mutation>
        );
    }
}

export default RemoveFromCart;