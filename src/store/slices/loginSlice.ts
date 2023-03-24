import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { FormData } from "../../shared/types";

interface State {
   isLogin: boolean,
   isLoading: boolean,
   errorCode: any,
   token: string,
}

const initialState: State = {
   isLogin: !!localStorage.getItem("isLoggin") || false,
   isLoading: false,
   token: '',
   errorCode: 0
}

const loginSlice = createSlice({
   name: 'login',
   initialState,
   reducers: {
      setLoading(state, action: PayloadAction<FormData>) {
         state.isLoading = true
      },
      setToken(state, action: PayloadAction<any>) {
         state.errorCode = 0
         state.isLogin = true
         state.isLoading = false;
         const token = action.payload.data.token

         state.token = token
         localStorage.setItem('token', token)
         localStorage.setItem("isLoggin", "true");
      },
      setLoginFailure(state, action: PayloadAction<number>) {
         state.isLoading = false
         state.errorCode = action.payload
      },
      setLogOut(state) {
         state.isLogin = false;
         localStorage.removeItem("isLoggin");
      }
   }
})

export const { setLoading, setToken, setLoginFailure, setLogOut } = loginSlice.actions;

export default loginSlice.reducer;