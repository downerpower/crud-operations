import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from "@redux-saga/core";
import loginSlice from './slices/loginSlice';
import tableDataSlice from './slices/tableDataSlice';
import rootSaga from './sagas/root-saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    login: loginSlice,
    tableData: tableDataSlice,
  },
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
