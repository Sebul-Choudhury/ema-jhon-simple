import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {ProductKey} = useParams();
    const product = fakeData.find(pd =>pd.key === ProductKey)
  //  console.log(product);
    return (
        <div>
            <h2> Your Product Details. </h2>
            <Product showAddToCart={false} Product={product}></Product>
        </div>
    );
};

export default ProductDetail;