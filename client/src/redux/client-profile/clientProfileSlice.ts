import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { AxiosResponseError } from '~/shared/types'
import { axios } from '~/shared/lib/axios';
import '~/shared/interfaces'
import { IClientExtension, IClientProfile, ISingleClientExtension } from '~/shared/interfaces';

type InitialState = {
  clientProfile: IClientProfile | null
  singleClientExtension: ISingleClientExtension | null
  allClientExtensions: IClientExtension[] | null
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  isFundsLoading: boolean
  error: AxiosResponseError
}

const initialState: InitialState = {
  clientProfile: null,
  singleClientExtension: null,
  allClientExtensions: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isFundsLoading: false,
  error: {
    status: 0,
    content: null
  }
}

export const fetchClientProfile = createAsyncThunk(
  'dashboard/fetchByClientId',
  async (payload: {clientId: number}) => {
    const response = await axios.get(`/dashboard/${payload.clientId}`,)
    return response.data
  }
)

export const fetchAllClientExtensions = createAsyncThunk(
  'dashboard/fetcAllClientExtensionsByClientId',
  async (payload: { clientId: number }) => {
    const response = await axios.get(`/extension/${payload.clientId}`)
    return response.data
  }
)

export const fetchSingleClientExtension = createAsyncThunk(
  'dashboard/fetchSingleClientExtensionByClientId',
  async (payload: { clientId: number; grantId: number }) => {
    const response = await axios.get(`/dashboard/${payload.clientId}/extension/${payload.grantId}`)
    return response.data
  }
)

export const clientProfile = createSlice({
  name: 'client-profile',
  initialState,
  reducers: {
    reset: (state) => {
        (state.singleClientExtension = null),
        (state.isLoading = false),
        (state.isSuccess = false),
        (state.isError = false),
        (state.error = {
          status: 0,
          content: null
        })
    }
  },
  extraReducers: (builder) => {
    builder
      //  clientProfile
      .addCase(fetchClientProfile.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchClientProfile.fulfilled, (state, action) => {
        state.clientProfile = action.payload
        state.isLoading = false
      })
      .addCase(fetchClientProfile.rejected, (state, action: PayloadAction<any>) => {
        state.clientProfile = null
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
      })
      // AllExtensions
      .addCase(fetchAllClientExtensions.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchAllClientExtensions.fulfilled, (state, action) => {
        state.allClientExtensions = action.payload
        state.isLoading = false
      })
      .addCase(fetchAllClientExtensions.rejected, (state, action: PayloadAction<any>) => {
        state.allClientExtensions = null
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
      })
      // SingleExtension
      .addCase(fetchSingleClientExtension.pending, (state, action) => {
        state.isFundsLoading = true
        state.singleClientExtension = null
      })
      .addCase(fetchSingleClientExtension.fulfilled, (state, action) => {
        state.singleClientExtension = action.payload
        state.isFundsLoading = false
      })
  }
})

export const { reset } = clientProfile.actions
export default clientProfile.reducer
