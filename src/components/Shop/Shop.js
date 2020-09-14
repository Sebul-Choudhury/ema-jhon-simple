import React, { useEffect } from 'react';
import fakeData from '../../fakeData';
import { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';



const Shop = () => {
    
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = saveCart[existingKey];
            return product;
        })
            setCart(previousCart);
    },[])

    const handleAddProduct = (Product) =>{
        const toBeAddedKey = Product.key;
        const sameProduct = cart.find(pd=>pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct){
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey )
            newCart = [...others, sameProduct];
        }
        else{
            Product.quantity = 1;
            newCart = [...cart, Product]
        }
       
        setCart(newCart);
        addToDatabaseCart(Product.key, count);
    };
 
   
    return (
        <div className = "twin-container">
         
           
            <div className="product-container">
           
             {
            products.map(pd => <Product 
                key={pd.key}
                showAddToCart = {true}
                handleAddProduct = {handleAddProduct}
                Product={pd}></Product>)
              }
         
            </div>
            <div className="cart-container">
         
            <Cart cart= {cart}>
                <Link to="/review">
                <button className="main-button">Review your order</button>
                </Link>
            </Cart>
            </div>
         
        </div>
        
    );
};

export default Shop;