import { call, put } from "redux-saga/effects";
import { deleteTableData } from "../../../api";
import { ERRORS } from "../../../shared/constants";
import { removeData, setDataFailure } from "../../slices/tableDataSlice";

export function* deleteTableDataHandler(tableData: any): any {
   try {
      const data = yield call(deleteTableData, tableData.payload);
      yield put(removeData(data.data));
   } catch(err) {
      yield put(setDataFailure(ERRORS[404]))
   }
}