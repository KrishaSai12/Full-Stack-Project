import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false, // this is kept because if we refresh a page website must take some time to take the data so that time a loading spinner will set true and after the data is displayed it set to false that will control by loading,
        products: [],
        countOfProducts: {},
        resPerPage: {}



    },
    reducers: { // it will hold the function which will change the state
        productsRequest(state, action) { // state will have the current state 
            return {
                loading: true

            }
        },
        productsSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            return {
                loading: false,
                products: action.payload,//after that we needed to take the data that data is been taken by creating the action with the function name in that action we get the products


            }


        },
        productsFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        },
        adminProductsRequest(state, action) { // state will have the current state 
            return {
                loading: true

            }
        },
        adminProductsSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            return {
                loading: false,
                products: action.payload.products,//after that we needed to take the data that data is been taken by creating the action with the function name in that action we get the products


            }


        },
        adminProductsFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        }

    }
});

const { actions, reducer } = productsSlice;
export const { productsRequest,
    productsSuccess,
    productsFail,
    adminProductsRequest,
    adminProductsSuccess,
    adminProductsFail,
    clearError } = actions; // these are the action creator will responsible for changing the state 

export default reducer;