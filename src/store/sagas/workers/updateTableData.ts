import { call, put } from "redux-saga/effects";
import { modifyTableData } from "../../../api";
import { ERRORS } from "../../../shared/constants";
import { setDataFailure, updateData } from "../../slices/tableDataSlice";

export function* updateTableDataHandler(tableData: any): any {
   try {
      const data = yield call(modifyTableData, tableData.payload);
      yield put(updateData(data.data));
   } catch {
      yield put(setDataFailure(ERRORS[404]))
   }
}