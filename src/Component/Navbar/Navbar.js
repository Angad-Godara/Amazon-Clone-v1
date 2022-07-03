import React from 'react'
import './Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStateValue } from '../../State/StateProvider'

function Navbar() {
    const [{ basket }, dispatch] = useStateValue();

    return (
        <div className='nav__bar'>
            <img className='logo' src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='logo' />
            <div className='nav__search'>
                <input className='search__input' type='text' />
                <SearchIcon className='search__icon' />
            </div>
            <div className='option__container'>
                <div className='nav__options'>
                    <div className='upper'>
                        <span>Hello Guest</span>
                    </div>
                    <div className='lower'>
                        <span>Sign IN</span>
                    </div>
                </div>
                <div className='nav__options'>
                    <div className='upper'>
                        <span>Returns</span>
                    </div>
                    <div className='lower'>
                        <span>& Orders</span>
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
                <div className='cart'>
                    <ShoppingCartIcon />
                    <span className='items'>{basket.length}</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar