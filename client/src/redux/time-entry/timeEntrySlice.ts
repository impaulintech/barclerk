import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit'

import timeEntryService from './timeEntryService'
import { AxiosResponseError } from '~/shared/types'
import { catchError } from '~/utils/handleAxiosError' 
import { ExtensionList, RequiredValue, TimeEntries } from './types'

type InitialState = {
  timeEntries: TimeEntries | null
  extensionList: ExtensionList | any 
  isEmpty: boolean
  currentPage: number 
  isEditModal: boolean
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  error: AxiosResponseError
}

const initialState: InitialState = {
  timeEntries: null, 
  extensionList: {
    extension:  "",
    id: 0,
    types: []
  }, 
  currentPage: 1, 
  isEditModal: true, 
  isEmpty: true,  
  isError: false,
  isSuccess: false,
  isLoading: true,
  error: {
    status: 0,
    content: null
  }
}

export const getExtensions = createAsyncThunk(
  'time-entry/getExtensions',
  async (clientID: number, thunkAPI) => {
    try {
      return await timeEntryService.getExtensions(clientID)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const createNewEntry = createAsyncThunk(
  'time-entry/createNewEntry',
  async (data: { clientID: number, requiredValue: RequiredValue}, thunkAPI) => {
    const {clientID, requiredValue} = data; 
    try {
      return await timeEntryService.createNewEntry(clientID, requiredValue)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const getTimeEntries = createAsyncThunk(
  'time-entry/getTimeEntries',
  async (data: { clientID: number, currentPage: number }, thunkAPI) => {
    const { clientID, currentPage = 1 } = data
    try {
      return await timeEntryService.getTimeEntries(clientID, currentPage)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const updateTimeEntries = createAsyncThunk(
  'time-entry/updateTimeEntries',
  async (data: {
    clientID: number, 
    timeEntryID: number | undefined, 
    requiredValue: RequiredValue
  }, thunkAPI) => {
    const { clientID, timeEntryID, requiredValue } = data
    try {
      return await timeEntryService.updateTimeEntries(clientID, timeEntryID, requiredValue)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

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
    }, 
    setEditModal: (state, { payload }) => {
      state.isEditModal = payload 
    } , 
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload 
    } 
  },
  extraReducers: (builder: ActionReducerMapBuilder<InitialState>) => {
    builder
    .addCase(getExtensions.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getExtensions.fulfilled, (state, action) => { 
      state.extensionList = action.payload
      state.isEmpty = action.payload?.length === 0 ? true : false
      state.isSuccess = true
      state.isLoading = false
      state.error = {
        status: 0,
        content: null
      }
    })
    .addCase(getExtensions.rejected, (state, action: PayloadAction<any>) => {
      state.extensionList = null
      state.isError = true
      state.isSuccess = false
      state.isLoading = false
      state.error = action.payload
    }) 
    .addCase(getTimeEntries.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getTimeEntries.fulfilled, (state, action) => {
      state.timeEntries = action.payload
      state.isSuccess = true
      state.isLoading = false
      state.error = {
        status: 0,
        content: null
      }
    })  
    // .addCase(createNewEntry.pending, (state) => {
    //   state.isLoading = true
    // })
    // .addCase(createNewEntry.fulfilled, (state, action) => {
    //   state.timeEntries = action.payload
    //   state.isSuccess = true
    //   state.isLoading = false
    //   state.error = {
    //     status: 0,
    //     content: null
    //   }
    // }) 
    // .addCase(updateTimeEntries.pending, (state) => {
    //   state.isLoading = true
    // })
    // .addCase(updateTimeEntries.fulfilled, (state, action) => {
    //   state.timeEntries = action.payload
    //   state.isSuccess = true
    //   state.isLoading = false
    //   state.error = {
    //     status: 0,
    //     content: null
    //   }
    // }) 
  }
})

export const { reset, setEditModal, setCurrentPage } = timeEntrySlice.actions
export default timeEntrySlice.reducer
