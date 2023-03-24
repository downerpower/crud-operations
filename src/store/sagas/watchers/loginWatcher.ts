import { takeEvery } from "redux-saga/effects";
import { setLoading } from "../../slices/loginSlice";
import { setAddDataLoading, setDataLoading, setDeleteDataLoading, setUpdateDataLoading } from "../../slices/tableDataSlice";
import { addTableDataHandler } from "../workers/addTableDataSaga";
import { deleteTableDataHandler } from "../workers/deleteTableDataSaga";
import { loginHandler } from "../workers/loginSaga";
import { tableDataHandler } from "../workers/tableDataSaga";
import { updateTableDataHandler } from "../workers/updateTableData";

export function* loginWatcher(): any {
   yield takeEvery(setLoading.type, loginHandler);
   yield takeEvery(setDataLoading.type, tableDataHandler);
   yield takeEvery(setAddDataLoading.type, addTableDataHandler);
   yield takeEvery(setDeleteDataLoading.type, deleteTableDataHandler);
   yield takeEvery(setUpdateDataLoading.type, updateTableDataHandler);
}