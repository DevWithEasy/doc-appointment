import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth : false,
        user:{},
    },
    reducers: {
        addUser:(state,action)=>{
            state.isAuth = true
            state.user = action.payload
        },
        removeUser:(state,action)=>{
            state.isAuth = false
            state.user = {}
        },
    }
})
export const {addUser, removeUser} = authSlice.actions
export default authSlice.reducer