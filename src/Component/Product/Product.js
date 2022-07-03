import React from 'react'
import './Product.css'
import { useStateValue } from '../../State/StateProvider'

function Product({ item }) {
    const { title, price, image } = item
    const [{ }, dispatch] = useStateValue();

    return (
        <div className='product'>
            <div className='product__info'>
                <p className='title'> {title}</p>
                <p className='price'>₹ <strong>{price}</strong></p>
                <p className='rating'> ⭐ </p>
            </div>
            <img className='product__image' src={image} alt='productImg' />
            <button onClick={() => dispatch({ type: 'ADD_TO_BASKET', item: item })} className='add__to__cart'>Add to cart</button>
        </div >
    )
}

export default Product