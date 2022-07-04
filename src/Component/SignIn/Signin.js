import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStateValue } from '../../State/StateProvider'
import { LoaderContext } from '../../TopBarContext/loaderContext'
import { auth } from '../Firebase/Firebase'
import './Signin.css'

function Signin() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const navigate = useNavigate();

    const { setProgress } = useContext(LoaderContext);

    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        setProgress(10);
        if (user) {
            navigate('/')
            setProgress(50);
        }
        setProgress(100)
    }, [])

    const handleSignin = (e) => {
        setProgress(20)
        e.preventDefault();
        setProgress(50)
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                if (auth) {
                    navigate('/')
                }
            })
            .catch(err => {
                alert("Please Enter Valid Credentials");
                // console.warn(err) 
            })
        setProgress(100)
    }

    const handleRegister = (e) => {
        setProgress(20);
        e.preventDefault();
        setProgress(50);
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(auth => {
                if (auth) {
                    navigate('/')
                }
            })
            .catch(err => {
                alert("Please Enter Valid Credentials");
                // console.warn(err) 
            })
        setProgress(100);
    }



    return (
        <div className='signin'>
            <Link to='/'><img className='signin__logo' src='	https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt='amazon-clone' /></Link>

            <div className='form__div'>
                <h1>Sign In</h1>
                <form className='signin__form' onSubmit={handleSignin}>
                    <h5 className='signin__labels' htmlFor="email">E-mail</h5>
                    <input className='signin__inputs' type='email' required onChange={(e) => setemail(e.target.value)} />
                    <h5 className='signin__labels' htmlFor="password">Password</h5>
                    <input className='signin__inputs' type='password' required onChange={(e) => setpassword(e.target.value)} />
                    <button className='signin__button' type='submit'>Sign In</button>
                </form>
                <p className='signin__tc'>By signing-in you agree to the AMAZON CLONE Conditions of Use & Sale. Please see out Privacy Notice, our Cookies Notice and our Intereset-Based Ads Notice.</p>
                <button onClick={handleRegister} className='signin__button'> Create an Amazon Account</button>
            </div>
        </div>
    )
}

export default Signin