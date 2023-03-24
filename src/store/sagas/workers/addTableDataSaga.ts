import { call, put } from "redux-saga/effects";
import { addTableData } from "../../../api";
import { ERRORS } from "../../../shared/constants";
import { addData, setDataFailure } from "../../slices/tableDataSlice";

export function* addTableDataHandler(formData: any): any {
   try {
      const data = yield call(addTableData, formData.payload);
      if (data) {
         yield put(addData(data.data));
      }
   } catch {
      yield put(setDataFailure(ERRORS[404]))
   }
}