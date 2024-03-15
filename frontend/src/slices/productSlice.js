import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false, // this is kept because if we refresh a page website must take some time to take the data so that time a loading spinner will set true and after the data is displayed it set to false that will control by loading,
        product: {},
        isReviewsubmitted: false,
        isProductCreated: false,
        isProductDeleted: false,
        isProductUpdated: false,
        isReviewDeleted: false,
        reviews: []
    },
    reducers: { // it will hold the function which will change the state
        productRequest(state, action) { // state will have the current state 
            return {
                ...state,
                loading: true

            }
        },
        productSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            return {
                ...state,
                loading: false,
                product: action.payload//after that we needed to take the data that data is been taken by creating the action with the function name in that action we get the products

            }

        },
        productFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        createReviewRequest(state, action) { // state will have the current state 
            return {
                ...state,
                loading: true

            }
        },
        createReviewSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            return {
                loading: false,
                isReviewsubmitted: true

            }

        },
        createReviewFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearReviewSubmitted(state, action) {
            return {
                ...state,
                isReviewsubmitted: false
            }

        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        clearProduct(state, action) {
            return {
                ...state,
                product: {}
            }
        },
        newProductRequest(state, action) { // state will have the current state 
            return {
                ...state,
                loading: true

            }
        },
        newProductSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            return {
                ...state,
                loading: false,
                product: action.payload.product,//after that we needed to take the data that data is been taken by creating the action with the function name in that action we get the products
                isProductCreated: true


            }

        },
        newProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isProductCreated: false
            }
        },

        clearProductCreated(state, action) {
            return {
                ...state,
                isProductCreated: false
            }
        },
        deleteProductRequest(state, action) { // state will have the current state 
            return {
                ...state,
                loading: true

            }
        },
        deleteProductSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            return {
                ...state,
                loading: false,

                isProductDeleted: true


            }

        },
        deleteProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isProductDeleted: false
            }
        },
        clearProductDeleted(state, action) {
            return {
                ...state,
                isProductDeleted: false
            }
        },
        updateProductRequest(state, action) { // state will have the current state 
            return {
                ...state,
                loading: true

            }
        },
        updateProductSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            return {
                ...state,
                loading: false,
                product: action.payload.product,//after that we needed to take the data that data is been taken by creating the action with the function name in that action we get the products
                isProductUpdated: true


            }

        },
        updateProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,

            }
        },

        clearProductUpdated(state, action) {
            return {
                ...state,
                isProductUpdated: false
            }
        },
        reviewsRequest(state, action) { // state will have the current state 
            return {
                ...state,
                loading: true

            }
        },
        reviewsSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            return {
                ...state,
                loading: false,
                reviews: action.payload.reviews//after that we needed to take the data that data is been taken by creating the action with the function name in that action we get the products

            }

        },
        reviewsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },

        deleteReviewsRequest(state, action) { // state will have the current state 
            return {
                ...state,
                loading: true

            }
        },
        deleteReviewsSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            return {
                ...state,
                loading: false,

                isReviewDeleted: true


            }

        },
        deleteReviewsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isReviewDeleted: false
            }
        },
        clearReviewDeleted(state, action) {
            return {
                ...state,
                isReviewDeleted: false
            }
        },

    }
});

const { actions, reducer } = productSlice;
export const { productRequest,
    productSuccess,
    productFail,
    createReviewRequest,
    createReviewSuccess,
    createReviewFail,
    clearError,
    clearReviewSubmitted,
    clearProduct,
    newProductRequest,
    newProductSuccess,
    newProductFail,
    clearProductCreated,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFail,
    clearProductDeleted,
    updateProductRequest,
    updateProductSuccess,
    updateProductFail,
    clearProductUpdated,
    reviewsFail,
    reviewsRequest,
    reviewsSuccess,
    deleteReviewsFail,
    deleteReviewsRequest,
    deleteReviewsSuccess,
    clearReviewDeleted } = actions; // these are the action creator will responsible for changing the state 
export default reducer;