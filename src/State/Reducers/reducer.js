export const initialState = {
    basket: [],
    user: null,
    products: [
        {
            id: 12321341,
            title: "The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback",
            price: 110.96,
            rating: 5,
            image: "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
        },
        {
            id: 49538094,
            title: "Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl",
            price: 2390.0,
            rating: 4,
            image: "https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
        },
        {
            id: 4903850,
            title: "Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor",
            price: 1990.99,
            rating: 4,
            image: "https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
        },
        {
            id: 23445930,
            title: "Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric",
            price: 6999.99,
            rating: 4,
            image: "https://i.pcmag.com/imagery/reviews/00EU3U5rRoe9swRlkJE2yDa-1.fit_lim.size_1200x630.v1601052236.jpg"
        },
        {
            id: 3254354345,
            title: "New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)",
            price: 59800.99,
            rating: 4,
            image: "https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
        },
        {
            id: 90829332,
            title: "Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440",
            price: 109499.98,
            rating: 4,
            image: "https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
        }
    ]
}

// selector
export const getBasketTotal = (basket) =>
    basket?.reduce((acc, item) => acc + item.price, 0)

const reducer = (state, action) => {
    // console.log(action);
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            };

        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }

        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    `Can't remove product (id: ${action.id}) as it is not in the basket! `
                )
            }

            return {
                ...state,
                basket: newBasket
            }

        case "SET_USER":
            return {
                ...state,
                user: action.user,
            }

        default:
            return state;
    }
};

export default reducer;