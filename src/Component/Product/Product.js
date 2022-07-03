import React from 'react'
import './Product.css'

function Product({ title, price, image }) {
    console.log(title)
    return (
        <div className='product'>
            <div className='product__info'>
                <p className='title'> {title}</p>
                <p className='price'>₹ <strong>{price}</strong></p>
                <p className='rating'> ⭐ </p>
            </div>
            <img className='product__image' src={image} alt='productImg' />
            <button className='add__to__cart'>Add to cart</button>
        </div >
    )
}

export default Product