import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit'

import { GetMattersPayload } from './types'
import matterService from './matterService'
import { ISingleMatter } from '~/shared/interfaces'
import { catchError } from '~/utils/handleAxiosError'
import { TMatterResponse } from '~/shared/types/pageTypes'
import { AxiosResponseError, MatterFormValues } from '~/shared/types'

type InitialState = {
  matters: TMatterResponse | null
  singleMatter: ISingleMatter | null
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  error: AxiosResponseError
}

const initialState: InitialState = {
  matters: null,
  singleMatter: null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  error: {
    status: 0,
    content: null
  }
}

export const getMatters = createAsyncThunk(
  'matter/getMatters',
  async (payload: GetMattersPayload, thunkAPI) => {
    try {
      return await matterService.getMatters(payload)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const addNewMatter = createAsyncThunk(
  'matter/addNewMatter',
  async (payload: MatterFormValues, thunkAPI) => {
    try {
      return await matterService.addNewMatter(payload)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const getSingleMatter = createAsyncThunk(
  'matter/getSingleMatter',
  async (client_id: string | string[] | undefined, thunkAPI) => {
    try {
      return await matterService.getSingleMatter(client_id)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const matterSlice = createSlice({
  name: 'matter',
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
      // Fetch All Matters With Pagination
      .addCase(getMatters.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMatters.fulfilled, (state, action: PayloadAction<TMatterResponse>) => {
        state.matters = action.payload
        state.isSuccess = true
        state.isLoading = false
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(getMatters.rejected, (state, action: PayloadAction<any>) => {
        state.matters = null
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
      })

      // Create New Matter
      .addCase(addNewMatter.fulfilled, (state, action: PayloadAction<TMatterResponse>) => {
        state.matters = action.payload
      })

      // Get Single Matter By Client ID
      .addCase(getSingleMatter.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSingleMatter.fulfilled, (state, action: PayloadAction<ISingleMatter>) => {
        state.singleMatter = action.payload
        state.isLoading = false
      })
      .addCase(getSingleMatter.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload
        state.isLoading = false
      })
  }
})

export const { reset } = matterSlice.actions
export default matterSlice.reducer
