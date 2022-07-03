import userEvent from '@testing-library/user-event'
import React from 'react'
import { useStateValue } from '../../State/StateProvider'
import Product from '../Product/Product'
import './Home.css'

function Home() {

    const [state, dispatch] = useStateValue();

    return (
        <div className='home'>
            <div className='home__container'>
                <img src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg' alt='PrimeImg' />

                <div className='home__row'>
                    {
                        state.products.map((item, idx) => {
                            if (idx >= 2) {
                                return
                            }
                            return <Product key={idx + item.id} item={item} />
                        })
                    }
                </div>
                <div className='home__row'>
                    {
                        state.products.map((item, idx) => {
                            if (idx < 2 || idx > 4) {
                                return
                            }
                            return <Product key={idx + item.id} item={item} />
                        })
                    }
                </div>
                <div className='home__row'>
                    {
                        state.products.map((item, idx) => {
                            if (idx < 5) {
                                return
                            }
                            return <Product key={idx + item.id} item={item} />
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Home