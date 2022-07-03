import React from 'react'
import { useStateValue } from '../../State/StateProvider'
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct'
import './Checkout.css'

function Checkout() {

    const [{ basket }, dispatch] = useStateValue();

    return (
        <div className='checkout'>
            <div className='left'>
                <img className='advertisement' src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
                    alt='adertisement' />
                <div className='checkout__user'>
                    <h3>Hello Guest</h3>
                    <h2>Your Shopping Cart</h2>
                </div>

                {
                    basket.length === 0 ?
                        <div className='empty__note'><h2>Oops, Your cart is empty!</h2></div>
                        :
                        basket.map((item, idx) => {
                            return <CheckoutProduct key={idx + item.id} item={item} />
                        })
                }
            </div>
            <div className='right'>
                <div className='subtotal'>
                    <div className='subtotal__amount'>Subtotal(x items): <strong>INR 2313</strong></div>
                    <div className='subtotal__checkbox'>
                        <input type='checkbox' />This order contains a gift
                    </div>
                    <button>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default Checkout