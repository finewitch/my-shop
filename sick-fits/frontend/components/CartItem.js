import React from 'react';
import formatMoney from '../lib/formatMoney';
import RemoveFromCart from './RemoveFromCart';


const CartItem = ({item}) => {
    if(!item.item)return <p>This item has been removed</p>;
    return (
        <div className="cart-product">
            <div className="cart-product-title">{formatMoney(item.item.price * item.quantity)}</div>
            <div className="cart-product-index">{item.quantity} x {formatMoney(item.item.price)}</div>
            <div className="cart-product-price">{item.item.title}</div>
            <RemoveFromCart id={item.id}/>
        </div>
    );
};

export default CartItem;