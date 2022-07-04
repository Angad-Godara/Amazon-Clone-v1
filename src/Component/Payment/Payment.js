import React from 'react'
import { useStateValue } from '../../State/StateProvider'
import './Payment.css'
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import { getBasketTotal } from '../../State/Reducers/reducer';
import { CardElement } from '@stripe/react-stripe-js';

function Payment() {

    const [{ basket }, dispatch] = useStateValue();

    return (
        <div className='payment'>
            <h1>Checkout ({basket.length} items)</h1>
            <div className='input__row'>
                <div className='delivery__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='delivery__address'>
                    <p>BH-07 SLIET Longowal,</p>
                    <p>Sangrur</p>
                </div>
            </div>
            <div className='input__row'>
                <div className='delivery__title'>
                    <h3>Review Items for delivery</h3>
                </div>
                <div className='delivery__address'>
                    {
                        basket.length === 0 ?
                            <h4>Oops, Your cart is empty!</h4>
                            :
                            basket.map((item, idx) => {
                                return <CheckoutProduct key={idx + item.id} item={item} />
                            })
                    }
                </div>
            </div>
            <div className='input__row'>
                <div className='delivery__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='delivery__address'>
                    <form>
                        <div className='payment__details'>
                            <CardElement />
                            <h4>Order Total: INR {getBasketTotal(basket)}</h4>
                            <button className='buy__now'>Buy now</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Payment