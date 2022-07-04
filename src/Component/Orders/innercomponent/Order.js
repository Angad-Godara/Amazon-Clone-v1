import React from 'react'
import CheckoutProduct from '../../CheckoutProduct/CheckoutProduct'
import moment from 'moment'
import './Order.css'

function Order({ order }) {
    return (
        <div className='order'>
            <div className='heading'>Order Amount: INR {order.data.amount / 100}</div>
            <div className='order__details'>
                <p><strong>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</strong></p>
                <p className='order__id'>{order.id.id}</p>
            </div>
            {
                order.data.basket.map((item, idx) => {
                    return <CheckoutProduct remove={true} key={idx + item.id} item={item} />
                })
            }
        </div>
    )
}

export default Order