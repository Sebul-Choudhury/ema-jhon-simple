import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';
const Product = (props) => {
  
   const {img, name, seller, price, stock , key } = props.Product;
    return (
        <div className='product'> 
         <div className = "img-container">
           <img src={img}alt=""/>
         
        </div>
        <div>
    <h4 className='product-name'><Link to = {"/Product/" + key} > {name}</Link></h4>
        <br/>
        <p><small>by:{seller}</small></p>
        <p>${price}</p>
        <p><small>Only {stock} left in the stock - order soon</small></p>
        {props.showAddToCart === true && <button
         className="main-button"
         onClick={() => props.handleAddProduct(props.Product)}
         >
             <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}
        </div>
        
        </div>
    );
};

export default Product;