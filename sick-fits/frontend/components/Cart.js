import React from 'react';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import User from './User';
import CartItem from './CartItem';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';



const LOCAL_STATE_QUERY = gql`
    query {
        cartOpen @client
    }`;

const LOCAL_STATE_MUTATION =  gql`
    mutation{ 
        toggleCart @client
    }`;


const Cart = () => {
    return (
        <User>
            {({data: { me }})=>{

                if(!me) return null;
                const cart = me.cart
                // console.log(cart, 'cart----')
                return(

                <Mutation mutation = { LOCAL_STATE_MUTATION }> 
                    {toggleCart=>(
                        <Query query={ LOCAL_STATE_QUERY }>
                            {({data})=>(
                                    <div className={data.cartOpen? 'cart open': 'cart'}>
                                        <div className="cart-title">
                                            <button className="close" onClick={toggleCart}>✖</button>
                                            <span>{me.name} cart</span>
                                        </div>

                                        <aside><span>{formatMoney(calcTotalPrice(me.cart))}</span> – you have {me.cart.length-1} item/s</aside>

                                        {!cart.length? null : (
                                        <div className="cart-product-tableheader">
                                            <div className="cart-product-title">price</div>
                                            <div className="cart-product-index">quantity</div>
                                            <div className="cart-product-price">title</div>
                                            <div className="cart-product-title"></div>
                                        </div>
                                        )}

                                        {!cart.length? null : (
                                              cart.map((item, index)=>(
                                                <CartItem key={index} item={ item }/>
                                            ))
                                        )}
                                      

                                        <footer>
                                            <button>checkout</button>
                                        </footer>
                                    </div>
                                )}
                        </Query>
                    )}
                </Mutation>
                    )
                }}
            </User>
    );
};

export default Cart;
export { LOCAL_STATE_QUERY, LOCAL_STATE_MUTATION }