import React, { useContext } from 'react'
import './Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStateValue } from '../../State/StateProvider';
import {
    Link
} from "react-router-dom";
import { auth } from '../Firebase/Firebase';
import { LoaderContext } from '../../TopBarContext/loaderContext'

function Navbar() {
    const [{ basket, user }, dispatch] = useStateValue();

    const { setProgress } = useContext(LoaderContext)

    const handleSignOut = (e) => {
        setProgress(50)
        e.preventDefault();
        auth
            .signOut()
        setProgress(100)
    }

    return (
        <div className='nav__bar'>
            <Link to='/'>
                <img className='logo' src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='logo' />
            </Link>
            <div className='nav__search'>
                <input className='search__input' type='text' />
                <SearchIcon className='search__icon' />
            </div>
            <div className='option__container'>
                <div className='nav__options'>
                    <div className='upper'>
                        <span>Hello {user ? user?._delegate.email : 'Guest'}</span>
                    </div>
                    <div className='lower'>
                        {user ?
                            <span className='signout' onClick={handleSignOut}>Sign Out</span> :
                            <Link className='links' to='/signIn'><span>Sign IN</span></Link>
                        }
                    </div>
                </div>
                <div className='nav__options'>
                    <div className='upper'>
                        <span>Returns</span>
                    </div>
                    <div className='lower'>
                        <Link className='links' to='/orders'><span>& Orders</span></Link>
                    </div>
                </div>
                <div className='nav__options'>
                    <div className='upper'>
                        <span>Your</span>
                    </div>
                    <div className='lower'>
                        <span>Prime</span>
                    </div>
                </div>
                <Link className='cart' to='/checkout'>
                    <ShoppingCartIcon />
                    <span className='items'>{basket.length}</span>
                </Link>
            </div>
        </div >
    )
}

export default Navbar