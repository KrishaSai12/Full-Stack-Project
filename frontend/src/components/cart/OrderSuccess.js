import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
//import { useNavigate } from "react-router-dom";
import { createOrder } from "../../actions/orderActions";
import { Link } from "react-router-dom";
import { orderCompleted } from "../../slices/cartSlice";

export default function OrderSuccess (){
    //const {user}= useSelector((state)=> state.authState);
    const dispatch = useDispatch();
    //const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const {items:cartItems , shippingInfo} = useSelector((state) => state.cartState);

    const order = {
        orderItems : cartItems,
        shippingInfo
    }
    if(orderInfo){
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }
    useEffect(()=>{
        dispatch(orderCompleted())
        dispatch(createOrder(order))
    },[dispatch])
    return (
        <div className="row justify-content-center">
        <div className="col-6 mt-5 text-center">
            <img className="my-5 img-fluid d-block mx-auto" src="/images/success.png" alt="Order Success" width="200" height="200" />

            <h2>Your Order has been placed successfully.</h2>

            <Link to={"/orders"}> Go to Orders</Link>
        </div>

    </div>
    )
}