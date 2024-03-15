import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        loading: false,
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
    },
    reducers: { // it will hold the function which will change the state
        addCartItemRequest(state, action) { // state will have the current state 
            return {
                ...state,
                loading: true
            }
        },
        addCartItemSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            const item = action.payload;
            const isItemExists = state.items.find(i => i.product == item.product);
            if (isItemExists) {
                state = {
                    ...state,
                    loading: false,

                }
            }
            else {
                state = {
                    items: [...state.items, item],
                    loading: false
                }
                localStorage.setItem('cartItems', JSON.stringify(state.items))
            }
            return state;

        },
        increaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if (item.product == action.payload) {
                    item.quantity = item.quantity + 1
                }
                return item;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },
        decreaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if (item.product == action.payload) {
                    item.quantity = item.quantity - 1
                }
                return item;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },
        removeItemFromCart(state, action) {
            const filterItems = state.items.filter(item => {
                return item.product !== action.payload
            })
            localStorage.setItem('cartItems', JSON.stringify(filterItems))
            return {
                ...state,
                items: filterItems
            }
        },
        saveShippingInfo(state, action) {
            localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
            return {
                ...state,
                shippingInfo: action.payload
            }

        },
        orderCompleted(state, action) {
            localStorage.removeItem('cartItems');
            sessionStorage.removeItem('orderInfo');
            localStorage.removeItem('shippingInfo');
            
            return {
                items: [],
                loading: false,
                shippingInfo:{}
              
            }
        }

    }
});

const { actions, reducer } = cartSlice;
export const {
    addCartItemRequest,
    addCartItemSuccess,
    increaseCartItemQty,
    decreaseCartItemQty,
    removeItemFromCart,
    saveShippingInfo,
    orderCompleted } = actions; // these are the action creator will responsible for changing the state 
export default reducer;