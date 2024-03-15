// this file handles the data should be taken from the backend and how should change the state based on the response of the action creator which is responsible for changing the state 
import axios from 'axios';
import { adminProductsFail, adminProductsRequest, adminProductsSuccess, productsFail, productsRequest, productsSuccess } from '../slices/productsSlice';


// it will take multiple data 
export const  getProducts  =  (keyword,price,category,rating) => async (dispatch) =>{ // dispatch is the hook so we should import in a components
   try{
    dispatch(productsRequest());
    let link = `/api/v1/products`
    if(keyword){
      link += `?keyword=${keyword}`
    }
    if(price){
      link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
    }
    if(category){
      link += `&category=${category}`
    }
    if(rating){
      link += `&ratings=${rating}`
    }
    
    const response = await axios.get(link); // will get the data from the url given here
    const products  = response.data.products; 
    console.log( 'from action',products)
    //const countOfProducts = response.data.countOfProducts
    dispatch(productsSuccess(products)) // here the data is payload
   // dispatch(productsSuccess(countOfProducts))

   }catch(error){
    // handle error
    
    dispatch(productsFail( error.response.data.message)) // which has the error message from the data response this will happen if axois fails any error 
   }
}

export const  getAdminProducts = async (dispatch)=>{
  try {
    dispatch(adminProductsRequest());
    const {data} =  await axios.get(`/api/v1/admin/products`);
    dispatch(adminProductsSuccess(data))
  } catch (error) {
    dispatch(adminProductsFail(error.response.data.message))
  }
}