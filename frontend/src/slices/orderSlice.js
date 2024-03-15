
import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderDetail: {},
        userOrders: [],
        adminOrders: [],
        isOrderDeleted: false,
        isOrderUpdated: false,
        loading: false
    },
    reducers: { // it will hold the function which will change the state
        createOrderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        createOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                orderDetail: action.payload.order
            }
        },
        createOrderFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        userOrdersRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        userOrdersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                userOrders: action.payload.orders
            }
        },
        userOrdersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        orderDetailRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        orderDetailSuccess(state, action) {
            return {
                ...state,
                loading: false,
                orderDetail: action.payload.order
            }
        },
        orderDetailFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        adminOrdersRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        adminOrdersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                adminOrders: action.payload.orders
            }
        },
        adminOrdersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        deleteOrderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        deleteOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isOrderDeleted: true
            }
        },
        deleteOrderFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        upadateOrderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        updateOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isOrderUpdated: true
            }
        },
        updateOrderFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearOrderDeleted(state, action) {
            return {
                ...state,
                isOrderDeleted: false
            }
        },
        clearOrderUpdated(state, action) {
            return {
                ...state,
                isOrderUpdated: false
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

const { actions, reducer } = orderSlice;
export const {
    createOrderRequest,
    createOrderSuccess,
    createOrderFail,
    userOrdersRequest,
    userOrdersSuccess,
    userOrdersFail,
    orderDetailRequest,
    orderDetailSuccess,
    orderDetailFail,
    adminOrdersFail,
    adminOrdersRequest,
    adminOrdersSuccess,
    deleteOrderFail,
    deleteOrderRequest,
    deleteOrderSuccess,
    upadateOrderRequest,
    updateOrderFail,
    updateOrderSuccess,
    clearOrderDeleted,
    clearOrderUpdated,
    clearError } = actions; // these are the action creator will responsible for changing the state 
export default reducer;