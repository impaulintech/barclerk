import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit'

import { Payload } from './types'
import matterService from './matterService'
import { AxiosResponseError } from '~/shared/types'
import { catchError } from '~/utils/handleAxiosError'
import { TMatterResponse } from '~/shared/types/pageTypes'

type InitialState = {
  matters: TMatterResponse | null
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  error: AxiosResponseError
}

const initialState: InitialState = {
  matters: null,
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
  async (payload: Payload, thunkAPI) => {
    try {
      return await matterService.getMatters(payload)
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
  }
})

export const { reset } = matterSlice.actions
export default matterSlice.reducer
