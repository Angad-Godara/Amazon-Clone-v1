import './App.css';
import Home from './Component/Home/Home';
import Navbar from './Component/Navbar/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Checkout from './Component/Checkout/Checkout'
import Payment from './Component/Payment/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Signin from './Component/SignIn/Signin';
import { useEffect } from 'react';
import { auth } from './Component/Firebase/Firebase';
import { useStateValue } from './State/StateProvider';
import Orders from './Component/Orders/Orders';

function App() {

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE)

  const [{ }, dispatch] = useStateValue();

  useEffect(() => {

    auth.onAuthStateChanged(authuser => {

      if (authuser) {
        dispatch({
          type: 'SET_USER',
          user: authuser
        })
      }
      else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }

    })

  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<Signin />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment" element={
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
