import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { AxiosResponseError } from '~/shared/types'
import { axios } from '~/shared/lib/axios'
import '~/shared/interfaces'
import { IClientExtension, IClientProfile, ISingleClientExtension } from '~/shared/interfaces'
import { IUpdatePayload } from '../matter/types'
import matterService from './clientService'
import { catchError } from '~/utils/handleAxiosError'

type InitialState = {
  clientProfile: IClientProfile | null
  singleClientExtension: ISingleClientExtension | null
  allClientExtensions: IClientExtension[] | null
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  isLoadingClientProfile: boolean
  isLoadingFunds: boolean
  error: AxiosResponseError
}

const initialState: InitialState = {
  clientProfile: null,
  singleClientExtension: null,
  allClientExtensions: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoadingClientProfile: false,
  isLoadingFunds: false,
  error: {
    status: 0,
    content: null
  }
}

export const fetchClientProfile = createAsyncThunk(
  'dashboard/fetchByClientId',
  async (payload: { clientId: number }) => {
    const response = await axios.get(`/dashboard/${payload.clientId}`)
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

export const updateMatter = createAsyncThunk(
  'matter/updateMatter',
  async (payload: IUpdatePayload, thunkAPI) => {
    try {
      return await matterService.updateMatter(payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const clientProfile = createSlice({
  name: 'client-profile',
  initialState,
  reducers: {
    reset: (state) => {
      ;(state.singleClientExtension = null),
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
        state.isLoadingClientProfile = true
      })
      .addCase(fetchClientProfile.fulfilled, (state, action) => {
        state.clientProfile = action.payload
        state.allClientExtensions = action.payload.extensions
        state.isLoadingClientProfile = false
      })
      .addCase(fetchClientProfile.rejected, (state, action: PayloadAction<any>) => {
        state.clientProfile = null
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
      })

      // Fetch Single Client Extension
      .addCase(fetchSingleClientExtension.pending, (state) => {
        state.isLoadingFunds = true
        state.singleClientExtension = null
      })
      .addCase(
        fetchSingleClientExtension.fulfilled,
        (state, action: PayloadAction<ISingleClientExtension>) => {
          state.singleClientExtension = action.payload
          state.isLoadingFunds = false
        }
      )
      .addCase(fetchSingleClientExtension.rejected, (state, action: PayloadAction<any>) => {
        state.singleClientExtension = null
        state.isError = true
        state.isSuccess = false
        state.isLoadingFunds = false
        state.error = action.payload
      })

      // Update Matter
      .addCase(updateMatter.fulfilled, (state, action: PayloadAction<any>) => {
        state.clientProfile = action.payload
        state.singleClientExtension = action.payload
        state.allClientExtensions = action.payload.extensions
      })
  }
})

export const { reset } = clientProfile.actions
export default clientProfile.reducer
