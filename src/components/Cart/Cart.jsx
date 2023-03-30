import React from 'react';
import './Cart.css';

const Cart = ({cart}) => {
    // const cart = props.cart; // Way - 1
    // const {cart} = props; // way -2

    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    for(let product of cart) {
        // product.quantity = product.quantity || 1;

        totalPrice =  totalPrice + product.price * product.quantity; 
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity;
    }

    // console.log(quantity);

    const tax = totalPrice * 7 / 100;
    const grandTotal = totalPrice + totalShipping + tax;

    return (
        <div className='cart'>
            <h2>Order Summary</h2>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: {totalPrice}</p>
            <p>Total Shipping Charge: {totalShipping}</p>
            <p>Tax: {tax.toFixed(2)}</p>
            <h4>Grand Total: {grandTotal.toFixed(2)}</h4>
        </div>
    );
};

export default Cart;