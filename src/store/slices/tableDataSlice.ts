import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { TableData } from '../../shared/types'

interface State {
   isLoading: boolean,
   errorMessage: string,
   data: TableData[],
}

const initialState: State = {
   isLoading: false,
   errorMessage: '',
   data: []
}

const tableDataSlice = createSlice({
   name: 'tableData',
   initialState,
   reducers: {
      setDataLoading(state, action: PayloadAction<string>) {
         state.isLoading = true
      },
      setAddDataLoading(state, action: PayloadAction<[TableData, string]>) {
         state.isLoading = true
      },
      setDeleteDataLoading(state, action: PayloadAction<[string, string]>) {
         state.isLoading = true
      },
      setUpdateDataLoading(state, action: PayloadAction<[TableData, string, string]>) {
         state.isLoading = true
      },
      setData(state, action: PayloadAction<TableData[]>) {
         state.isLoading = false
         state.data = action.payload
      },
      setDataFailure(state, action: PayloadAction<string>) {
         state.isLoading = false
         state.errorMessage = action.payload
      },
      addData(state, action: PayloadAction<TableData>) {
         state.isLoading = false
         state.data.push(action.payload)
      },
      removeData(state, action: PayloadAction<string>) {
         state.isLoading = false
         state.data.splice(state.data.findIndex(item => item.id === action.payload), 1)
      },
      updateData(state, action: PayloadAction<TableData>) {
         state.isLoading = false
         const elIndex = state.data.findIndex(item => item.id === action.payload.id);
         state.data[elIndex] = action.payload;
      },
   }
})

export const { setDataLoading, setAddDataLoading, setDeleteDataLoading, setUpdateDataLoading, setData, setDataFailure, addData, removeData, updateData } = tableDataSlice.actions

export default tableDataSlice.reducer