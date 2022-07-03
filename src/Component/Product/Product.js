import React from 'react'
import './Product.css'

function Product() {
    return (
        <div className='product'>
            <div className='product__info'>
                <p className='title'> New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)</p>
                <p className='price'>₹ <strong>70000</strong></p>
                <p className='rating'> ⭐ </p>
            </div>
            <img className='product__image' src='https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg' alt='productImg' />
            <button className='add__to__cart'>Add to cart</button>
        </div >
    )
}

export default Product