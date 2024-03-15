// this file handles the data should be taken from the backend and how should change the state based on the response of the action creator which is responsible for changing the state 
import axios from 'axios';
import { createReviewFail, createReviewRequest, createReviewSuccess, deleteProductFail, deleteProductRequest, deleteProductSuccess, newProductFail, newProductRequest, newProductSuccess, productFail, productRequest, productSuccess, updateProductRequest, updateProductSuccess,updateProductFail, reviewsRequest, reviewsSuccess, reviewsFail, deleteReviewsRequest, deleteReviewsSuccess, deleteReviewsFail } from '../slices/productSlice';


// it will take multiple data 
export const getProduct = (id) => async (dispatch) => { // dispatch is the hook so we should import in a components
   try {
      dispatch(productRequest());
      const response = await axios.get(`/api/v1/product/${id}`); // will get the data from the url given here
      const product = response.data.product;
      dispatch(productSuccess(product)) // here the data is payload

   } catch (error) {
      // handle error

      dispatch(productFail(error.response.data.message)) // which has the error message from the data response this will happen if axois fails any error 
   }
}

export const createReview = (reviewData) => async (dispatch) => {
   try {
      dispatch(createReviewRequest());
      const config = {
         headers: {
            'Content-type': 'application/json'
         }
      }
      const { data } = await axios.put(`/api/v1/review`, reviewData,config);
      dispatch(createReviewSuccess(data))
   }catch(error){
      dispatch(createReviewFail(error.response.data.message))

   }
}

export const createNewProduct = (productData) => async(dispatch)=>{
   try {
      dispatch(newProductRequest());
      const {data} = await axios.post(`/api/v1/admin/product/new`,productData);
      dispatch(newProductSuccess(data))
   } catch (error) {
      dispatch(newProductFail(error.response.data.message))
   }
}

export const deleteProduct = (id) => async(dispatch)=>{
   try {
      dispatch(deleteProductRequest());
      await axios.delete(`/api/v1/admin/product/${id}`);
      dispatch(deleteProductSuccess())
   } catch (error) {
      dispatch(deleteProductFail(error.response.data.message))
   }
}


export const updateProduct = (id,productData) => async(dispatch)=>{
   console.log(productData)
   try {
      dispatch(updateProductRequest());
      const {data} = await axios.put(`/api/v1/admin/product/${id}`,productData);
      console.log(data)
      dispatch(updateProductSuccess(data))
   } catch (error) {
      dispatch(updateProductFail(error.response.data.message))
   }
}


export const getReviews = (id) => async (dispatch) => { // dispatch is the hook so we should import in a components
   try {
      dispatch(reviewsRequest());
      const {data} = await axios.get(`/api/v1/admin/reviews`,{params:{id}}); // will get the data from the url given here
      
      dispatch(reviewsSuccess(data)) // here the data is payload

   } catch (error) {
      // handle error

      dispatch(reviewsFail(error.response.data.message)) // which has the error message from the data response this will happen if axois fails any error 
   }
}

export const deleteReview = (productId,id) => async (dispatch) => { // dispatch is the hook so we should import in a components
   try {
      dispatch(deleteReviewsRequest());
        await axios.delete(`/api/v1/admin/review`,{params:{productId,id}}); // will get the data from the url given here
      
      dispatch(deleteReviewsSuccess()) // here the data is payload

   } catch (error) {
      // handle error

      dispatch(deleteReviewsFail(error.response.data.message)) // which has the error message from the data response this will happen if axois fails any error 
   }
}