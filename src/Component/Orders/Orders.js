import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../State/StateProvider'
import { db } from '../Firebase/Firebase'
import Order from './innercomponent/Order'
import './Orders.css'

function Orders() {

    const [Orders, setOrders] = useState([])
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (user) {
            db
                .collection('users')
                .doc(user?.uid)
                .collection("orders")
                .onSnapshot(snapshot => {
                    setOrders(snapshot.docs.map(order => (
                        {
                            id: order,
                            data: order.data()
                        })))
                })
        } else {
            setOrders([])
        }

    }, [user])

    console.log(Orders)
    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            {
                Orders.map((order, idx) => {
                    return (
                        <Order key={idx} order={order} />
                    )
                })
            }
        </div>
    )
}

export default Orders;