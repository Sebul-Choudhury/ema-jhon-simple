import React, {  useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory()
    

    const handleProceedCheckout = () => {
        history.push('/shipment')
    }

    const removeProduct = (productKey) =>{
    const newCart = cart.filter(pd => pd.key !== productKey);
    setCart (newCart);
    removeFromDatabaseCart(productKey)
    }

    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);

       const cartProduct = productKeys.map( key => {
           const product = fakeData.find(pd=> pd.key === key);
           product.quantity = saveCart[key];
           return product;
       });
       setCart(cartProduct);
    },[]);

    let thankYou ;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt=""/>
    }
    return (
        <div className = "twin-container">
          <div className = "product-container"> 
            {
                cart.map(pd =><ReviewItem 
                    key = {pd.key}
                    removeProduct = {removeProduct}
                        product = {pd}></ReviewItem>) 
            }
           {
               thankYou
           }
         
          </div> 
          <div className = "cart-container">
                <Cart cart={cart}>
                    <button
                     onClick = {handleProceedCheckout} className="main-button">Proceed Checkout
                     </button>
                </Cart>
          </div>    
        </div>
    );
};

export default Review;