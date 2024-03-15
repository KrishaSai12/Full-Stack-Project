import {combineReducers, configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import  productsReducer   from './slices/productsSlice';
import productReducer from './slices/productSlice'
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'
import orderReducer from './slices/orderSlice'
import userReducer from './slices/UsersSlice'

const reducer  = combineReducers({ //will combine all the reducers using combine reducers function
   productsState: productsReducer,
   productState :productReducer,
   authState :authReducer,
   cartState : cartReducer,
   orderState: orderReducer,
   userState:userReducer


})

const store  = configureStore({
    reducer,
    middleware : [thunk]

})

export default store ;
    
