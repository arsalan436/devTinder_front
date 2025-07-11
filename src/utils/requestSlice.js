import { createSlice } from "@reduxjs/toolkit";


const RequestSlice = createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addRequests:(state,action)=>{
            return action.payload;
        },
        removeRequest:(state,action)=>{
            const newArr = state.filter(user=>user._id !== action.payload);
            return newArr;
        }
    }
})

export const {addRequests,removeRequest} = RequestSlice.actions;

export default RequestSlice.reducer;

