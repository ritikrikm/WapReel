import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user:null, //will store user info
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        register:(state,action)=>{
            state.user = action.payload
        },
        login:(state,action)=>{
            state.user = action.payload
        },
        logout:(state)=>{
            state.user = null;
        },
    },
});
export const {register , login , logout} = authSlice.actions;
export default authSlice.reducer;