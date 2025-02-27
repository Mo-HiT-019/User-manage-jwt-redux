import { createSlice } from "@reduxjs/toolkit";


const initialState={
    currentUser:null,
    users:[],
    loading:false,
    error:false
};

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        
        adminSigninStart:(state)=>{
            state.loading=true;
        },
        adminSigninSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=false;
        },
        adminSigninFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
       

        getUsersStart:(state)=>{
            state.loading=true;
        },

        getUsersSuccess:(state,action)=>{
            state.users=action.payload;
            state.loading=false;
            state.error=false;
        },

        getUsersFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        adminSignOut:(state)=>{
            state.currentUser=null;
            state.users=[];
            state.loading=false;
            state.error=false
        },
        deleteUserStart:(state)=>{
            state.loading=true;
            state.error=false;
        },
        deleteUserSuccess:(state,action)=>{
            state.loading=false;
            state.users=action.payload;
            state.error=false;
        },
        deleteUserFail:(state)=>{
            state.loading=false;
            state.error=false;
        }

    }
})

export const{
    adminSigninStart,
    adminSigninSuccess,
    adminSigninFail,
    getUsersStart,
    getUsersSuccess,
    getUsersFail,
    adminSignOut,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFail

}=adminSlice.actions;

export default adminSlice.reducer;