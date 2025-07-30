import { createSlice } from "@reduxjs/toolkit";

const initialState={
    TextNotice:[]

}
const userDataSlice=createSlice({
   name:'TextNotice',
   initialState,
   reducers:{
    setTextData:(state,action)=>{
        // console.log(action.payload);
        console.log(action.payload);
        
        state.TextNotice=action.payload;

    },
    addText:(state,action)=>{
        state.TextNotice.push(action.payload);
    },
   },
})

export const {setTextData,addText}=userDataSlice.actions;
export default userDataSlice.reducer;