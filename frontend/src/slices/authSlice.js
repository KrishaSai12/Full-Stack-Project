import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: true, // this is kept because if we refresh a page website must take some time to take the data so that time a loading spinner will set true and after the data is displayed it set to false that will control by loading,
        isAuthenticated: false,
        isUpdated:false,
        user: {}
    },
    reducers: { // it will hold the function which will change the state
        loginRequest(state, action) { // state will have the current state 
            return {
                ...state,
                loading: true,
            }
        },
        loginSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user//after that we needed to take the data that data is been taken by creating the action with the function name in that action we get the products

            }


        },
        loginFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        registerRequest(state, action) { // state will have the current state 
            return {
                ...state,
                loading: true,
            }
        },
        registerSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user//after that we needed to take the data that data is been taken by creating the action with the function name in that action we get the products

            }


        },
        registerFail(state, action) {
            return {
                ...state, //isAuthenticated false
                loading: false,
                error: action.payload
            }
        },
        loadUserRequest(state, action) { // state will have the current state 
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
            }
        },
        loadUserSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user//after that we needed to take the data that data is been taken by creating the action with the function name in that action we get the products

            }


        },
        loadUserFail(state, action) {
            return {
                ...state, //isAuthenticated false
                loading: false,
            }
        },
        logoutSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            return {
                loading: false,
                isAuthenticated: false,


            }


        },
        logoutFail(state, action) {
            return {
                ...state, //isAuthenticated false
                error: action.payload
            }
        },
        updateProfileRequest(state, action) { // state will have the current state 
            return {
                ...state,
                loading: true,
            }
        },
        updateProfileSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,//after that we needed to take the data that data is been taken by creating the action with the function name in that action we get the products
                isUpdated: true

            }


        },
        updateProfileFail(state, action) {
            return {
                ...state, //isAuthenticated false
                loading: false,
                error: action.payload
            }
        },
        clearUpdateProfile(state, action) {
            return {
                ...state, //isAuthenticated false
                isUpdated: false

            }
        },
        updatePasswordRequest(state, action) { // state will have the current state 
            return {
                ...state,
                loading: true,
                isUpdated: false
            }
        },
        updatePasswordSuccess(state, action) { // this reducer will work if the data is retrived succesfully
            return {
                loading: false,
                isAuthenticated: true,
                isUpdated: true,
                user:action.payload.user
            }

        },
        updatePasswordFail(state, action) {
            return {
                ...state, //isAuthenticated false
                loading: false,
                error: action.payload
            }
        },

    }
});

const { actions, reducer } = authSlice;
export const {
    loginRequest,
    loginSuccess,
    loginFail,
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutFail,
    logoutSuccess,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    clearUpdateProfile } = actions; // these are the action creator will responsible for changing the state 

export default reducer;