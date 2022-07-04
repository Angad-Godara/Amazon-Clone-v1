import React, { useContext, useEffect, useState } from 'react'
import { useStateValue } from '../../State/StateProvider'
import { db } from '../Firebase/Firebase'
import Order from './innercomponent/Order'
import './Orders.css'
import { LoaderContext } from '../../TopBarContext/loaderContext'
import { Link } from 'react-router-dom'

function Orders() {

    const [Orders, setOrders] = useState([])
    const [{ user }, dispatch] = useStateValue();

    const { setProgress } = useContext(LoaderContext)

    useEffect(() => {
        setProgress(20)

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
            setProgress(70)
        } else {
            setOrders([])
        }
        setProgress(100)

    }, [user])

    return (
        <div className='orders'>
            {!user
                ?
                <div style={{ height: `calc(100vh - 130px)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h1>Kindly <Link style={{ color: 'inherit' }} to='/Signin'>Sign IN</Link> to see your orders</h1>
                </div>
                :
                <>
                    <h1>Your Orders</h1>
                    {
                        Orders.map((order, idx) => {
                            return (
                                <Order key={idx} order={order} />
                            )
                        })
                    }
                </>
            }
        </div>
    )
}

export default Orders;