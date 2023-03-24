import { call, put } from "redux-saga/effects";
import { login } from "../../../api";
import { setLoginFailure, setToken } from "../../slices/loginSlice";

export function* loginHandler(formData: any): any {
   try {
      const data = yield call(login, formData.payload);
      if (data.error_code === 0) {
         yield put(setToken(data));
      } else {
         yield put(setLoginFailure(data.error_code))
      }
   } catch (err: any) {
      yield put(setLoginFailure(err.message))
   }
}