import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
    email:null
}

export const userSlice = createSlice({
    name:'user',
    initialState:initialUserState,
    reducers:{
        logUser:(state, action)=>{
            state.email=action.payload
        },
        logOut:(state)=>{
            state.email=null
        }
    }
})

export const { logUser,logOut } = userSlice.actions;

export default userSlice.reducer;