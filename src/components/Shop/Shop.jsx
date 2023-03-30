import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';


const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    useEffect(() => {
        const shoppingCart = getShoppingCart();
        let savedCart = [];
        for(let id in shoppingCart) {
            const addedProduct = products.find(product => product.id === id)
            if(addedProduct) {
                const quantity = shoppingCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (product) => {
        // setCart([...cart, product]);
        // const newCart = [...cart, product];
        let newCart = [];
        const exist = cart.find(pd => pd.id === product.id)

        if(!exist) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exist.quantity = exist.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exist];
        }

        setCart(newCart);
        addToDb(product.id);
    }

    return (
        <div className='shop'>
            <div className="products-container">
                {
                    products.map(product => <Product
                            key={product.id} 
                            product={product}
                            handleAddToCart={handleAddToCart}
                        >
                        </Product>)
                }
            </div>
            <div className='order-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;