import { createSlice } from "@reduxjs/toolkit";
// admin based

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false, // this is kept because if we refresh a page website must take some time to take the data so that time a loading spinner will set true and after the data is displayed it set to false that will control by loading,
        user: {},
        users:[],
        isUserUpdated:false,
        isUserDeleted:false
    },
    reducers: { // it will hold the function which will change the state
       usersRequest(state, action) { // state will have the current state 
            return {
                ...state,
                loading: true

            }
        },
        usersSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            return {
                ...state,
                loading: false,
                users:action.payload.users//after that we needed to take the data that data is been taken by creating the action with the function name in that action we get the products
            }
        },
        usersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        userRequest(state, action) { // state will have the current state 
            return {
                ...state,
                loading: true

            }
        },
        userSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            return {
                ...state,
                loading: false,
                user:action.payload.user//after that we needed to take the data that data is been taken by creating the action with the function name in that action we get the products
            }
        },
        userFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        deleteUserRequest(state, action) { // state will have the current state 
            return {
                ...state,
                loading: true

            }
        },
        deleteUserSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            return {
                ...state,
                loading: false,
                isUserDeleted:true
            }
        },
        deleteUserFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updateUserRequest(state, action) { // state will have the current state 
            return {
                ...state,
                loading: true

            }
        },
        updateUserSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            return {
                ...state,
                loading: false,
                isUserUpdated:true
            }
        },
        updateUserFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearUserDeleted(state, action) {
            return {
                ...state,
                isUserDeleted:false,

                
            }
        },
        clearUserUpdated(state, action) {
            return {
                ...state,
                isUserUpdated:false
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

const { actions, reducer } = userSlice;
export const { productsRequest,
    usersRequest,
    usersSuccess,
    usersFail,
    userRequest,
    userSuccess,
    userFail,
    updateUserFail,
    updateUserRequest,
    updateUserSuccess,
    deleteUserFail,
    deleteUserRequest,
    deleteUserSuccess,
    clearUserDeleted,
    clearUserUpdated,
    clearError } = actions; // these are the action creator will responsible for changing the state 

export default reducer;