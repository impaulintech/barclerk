import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit'

import { AxiosResponseError } from '~/shared/types'
import { catchError } from '~/utils/handleAxiosError' 

type InitialState = {
  timeEntries: any
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  error: AxiosResponseError
}

const initialState: InitialState = {
  timeEntries: null, 
  isError: false,
  isSuccess: false,
  isLoading: true,
  error: {
    status: 0,
    content: null
  }
}

export const timeEntrySlice = createSlice({
  name: 'time-entry',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.error = {
        status: 0,
        content: null
      }
    } 
  },
  extraReducers: (builder: ActionReducerMapBuilder<InitialState>) => {
    builder
  }
})

export const { reset } = timeEntrySlice.actions
export default timeEntrySlice.reducer
