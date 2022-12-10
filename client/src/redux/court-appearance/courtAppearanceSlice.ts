import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { AxiosResponseError, CourtAppearanceFormValues } from '~/shared/types'
import { axios } from '~/shared/lib/axios'
import '~/shared/interfaces'
import { ICourtAppearance } from '~/shared/interfaces'

interface Meta {
  current_page: number
  from: number
  last_page: number
  links: Link[]
  path: string
  per_page: number
  to: number
  total: number
}

interface Link {
  url: null | string
  label: string
  active: boolean
}

type InitialState = {
  courtAppearances: {
    data: ICourtAppearance[]
    links: {
      first: string
      last: string
      next: string
      prev: string
    }
    meta: Meta
  } | null
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  isFundsLoading: boolean
  error: AxiosResponseError
}

const initialState: InitialState = {
  courtAppearances: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isFundsLoading: false,
  error: {
    status: 0,
    content: null
  }
}

export const fetchClientCourtAppearances = createAsyncThunk(
  'client/fetchCourtAppearancesByClientId',
  async (payload: { clientId: number; page?: number; search?: string }) => {
    const response = await axios.get(`client/${payload.clientId}/court-appearance`, {
      params: { page: payload?.page, search: payload?.search }
    })
    return response.data
  }
)

export const addClientCourtAppearance = createAsyncThunk(
  'client/addCourtAppearancesByClientId',
  async (payload: { clientId: number; formValues: CourtAppearanceFormValues }) => {
    const response = await axios.post(
      `client/${payload.clientId}/court-appearance`,
      payload.formValues
    )

    return response.data
  }
)

export const updateClientCourtAppearance = createAsyncThunk(
  'client/updateCourtAppearanceById',
  async (payload: { clientId: number; formValues: CourtAppearanceFormValues }) => {
    const response = await axios.put(
      `client/${payload.clientId}/court-appearance/${payload.formValues.id}`,
      payload.formValues
    )

    return response.data
  }
)

export const courtAppearance = createSlice({
  name: 'court-appearance',
  initialState,
  reducers: {
    reset: (state) => {
      ;(state.isLoading = false),
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
      // addClientCourtAppearances
      .addCase(addClientCourtAppearance.fulfilled, (state, action) => {
        state.courtAppearances = action.payload
        state.isLoading = false
      })
      .addCase(addClientCourtAppearance.rejected, (state, action: PayloadAction<any>) => {
        state.courtAppearances = null
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
      })
      // fetchClientCourtAppearances
      .addCase(fetchClientCourtAppearances.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchClientCourtAppearances.fulfilled, (state, action) => {
        state.courtAppearances = action.payload
        state.isLoading = false
      })
      .addCase(fetchClientCourtAppearances.rejected, (state, action: PayloadAction<any>) => {
        state.courtAppearances = null
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
      })
      // updateClientCourtAppearances
      .addCase(updateClientCourtAppearance.fulfilled, (state, action) => {
        state.courtAppearances = action.payload
      })
      .addCase(updateClientCourtAppearance.rejected, (state, action: PayloadAction<any>) => {
        state.courtAppearances = null
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { reset } = courtAppearance.actions
export default courtAppearance.reducer
