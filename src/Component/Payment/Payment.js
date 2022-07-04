import React, { useContext, useEffect, useState } from 'react'
import { useStateValue } from '../../State/StateProvider'
import './Payment.css'
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import { getBasketTotal } from '../../State/Reducers/reducer';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase/Firebase';
import { LoaderContext } from '../../TopBarContext/loaderContext';
import { Link } from 'react-router-dom'

function Payment() {

    const [{ basket, user }, dispatch] = useStateValue();

    const navigate = useNavigate();

    const [clientSecret, setclientSecret] = useState(null)
    const [processing, setprocessing] = useState(false);
    const [disabled, setdisabled] = useState(true);
    const [error, seterror] = useState(null)
    const [succeeded, setsucceeded] = useState(false)

    const { setProgress } = useContext(LoaderContext)

    useEffect(() => {
        setProgress(10);
        const getClientSecret = async () => {
            const url = "https://amazonerver.herokuapp.com/processing";
            var res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    total: getBasketTotal(basket) * 100
                })
            })

            res = await res.json();

            if (res.client_secret) {
                setclientSecret(res.client_secret);
            }
        }
        setProgress(100)
        getClientSecret();
    }, [basket])

    // console.log(clientSecret)

    const stripe = useStripe();
    const elements = useElements();

    const handlepayment = async (e) => {

        setProgress(20);

        e.preventDefault();

        setprocessing(true)

        setProgress(30);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })
            .then(({ paymentIntent }) => {
                if (paymentIntent.status === 'succeeded') {

                    setProgress(80);

                    setprocessing(false);
                    setsucceeded(true);

                    db
                        .collection('users')
                        .doc(user?.uid)
                        .collection('orders')
                        .doc(paymentIntent.id)
                        .set({
                            basket: basket,
                            amount: paymentIntent.amount,
                            created: paymentIntent.created
                            // this will give us the time stamp when the order was created
                        })

                    dispatch({
                        type: 'EMPTY_BASKET'
                    })

                    navigate('/orders')
                }
            }).catch(err => { alert("Payment Failed, Kindly try again"); setprocessing(false); console.warn(err) })
        setProgress(100);
    }

    const handleCardInput = (e) => {
        setdisabled(e.empty ? true : false)
        seterror(e.error ? e.error : null)
    }

    return (
        <>{(!user) ?
            <div style={{ height: `calc(100vh - 130px)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h1>Kindly <Link style={{ color: 'inherit' }} to='/Signin'>Sign IN</Link> to place orders</h1>
            </div>
            :
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
                                <CardElement onChange={handleCardInput} />
                                <h4>Order Total: INR {getBasketTotal(basket)}</h4>
                                <button disabled={processing || disabled || succeeded || (basket.length === 0)} onClick={handlepayment} className='buy__now'>{processing ? "Processing" : "Pay now"}</button>
                            </div>
                            <div>{error ? error.message : ""}</div>
                        </form>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Payment