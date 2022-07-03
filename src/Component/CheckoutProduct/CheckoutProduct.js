import React from 'react'
import { useStateValue } from '../../State/StateProvider';
import './CheckoutProduct.css'

function CheckoutProduct({ item }) {
    const { title, price, image, id } = item

    const [{ }, dispatch] = useStateValue();

    return (
        <div className='checkoutproduct'>
            <img className='checkoutproduct__image' src={image} alt='productImg' />
            <div className='checkoutproduct__info'>
                <p className='checkout__title'> {title}</p>
                <p className='checkout__price'>₹ <strong>{price}</strong></p>
                <p className='checkout__rating'> ⭐ </p>
                <button onClick={() => dispatch({ type: 'REMOVE_FROM_BASKET', id: id })} className='remove__item'>Remove item</button>
            </div>
        </div >
    )
}

export default CheckoutProduct