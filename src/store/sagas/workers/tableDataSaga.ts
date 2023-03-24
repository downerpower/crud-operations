import { call, put } from "redux-saga/effects";
import { getTableData } from "../../../api";
import { ERRORS } from "../../../shared/constants";
import { setData, setDataFailure } from "../../slices/tableDataSlice";

export function* tableDataHandler(token: any): any {
   try {
      const data = yield call(getTableData, token.payload);
      yield put(setData(data.data));
   } catch {
      yield put(setDataFailure(ERRORS[404]))
   }
}