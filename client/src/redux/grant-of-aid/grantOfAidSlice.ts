import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit'

import grantOfAidService from './grantOfAidService'
import { catchError } from '~/utils/handleAxiosError'
import {
  ICode,
  IGOLRequest,
  IGOLPaginate,
  IUpdatePayload,
  ISingleGrantofAid,
  IGrantOfAidResponse,
  IAddGrantOfAidPayload
} from './interface'

type InitialState = {
  clauses: ICode[]
  grantOfAids: IGrantOfAidResponse | null
  singleGrantOfAid: ISingleGrantofAid | null
  isError: boolean
  isLoading: boolean
  isLoadingGOL: boolean
  isLoadingEditGOL: boolean
  isSuccess: boolean
  error: {
    status: number
    content: null
  }
}

const initialState: InitialState = {
  clauses: [],
  grantOfAids: null,
  singleGrantOfAid: null,
  isError: false,
  isLoading: false,
  isLoadingGOL: false,
  isLoadingEditGOL: false,
  isSuccess: false,
  error: {
    status: 0,
    content: null
  }
}

export const getClauses = createAsyncThunk('grantOfAid/getClauses', async (_, thunkAPI) => {
  try {
    return await grantOfAidService.getClauses()
  } catch (error) {
    return thunkAPI.rejectWithValue(catchError(error))
  }
})

export const addNewGrantOfAid = createAsyncThunk(
  'grantOfAid/addMessage',
  async (payload: IAddGrantOfAidPayload, thunkAPI) => {
    try {
      return await grantOfAidService.addNewGrantOfAid(payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const getGrandOfAids = createAsyncThunk(
  'grantOfAid/getGrantOfAids',
  async ({ client_id, page }: IGOLPaginate, thunkAPI) => {
    try {
      return await grantOfAidService.getGrandOfAids({
        client_id,
        page
      })
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const deleteGrantOfAid = createAsyncThunk(
  'grantOfAid/deleteGrantOfAids',
  async (payload: IGOLRequest, thunkAPI) => {
    try {
      return await grantOfAidService.deleteGrantOfAid(payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const getSingleGrandOfAid = createAsyncThunk(
  'grantOfAid/getSingleGrantOfAid',
  async (payload: IGOLRequest, thunkAPI) => {
    try {
      return await grantOfAidService.getSingleGrantOfAid(payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const updateGrantOfAid = createAsyncThunk(
  'grantOfAid/updateGrantOfAids',
  async (payload: IUpdatePayload, thunkAPI) => {
    try {
      return await grantOfAidService.updateGrantOfAid(payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const grantOfAidSlice = createSlice({
  name: 'grant-of-aid',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
      state.error = {
        status: 0,
        content: null
      }
    }
  },
  extraReducers: (buider: ActionReducerMapBuilder<InitialState>) => {
    buider

      // Get All Clauses for the codes
      .addCase(getClauses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getClauses.fulfilled, (state, action: PayloadAction<ICode[]>) => {
        state.clauses = action.payload
      })
      .addCase(getClauses.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload
      })

      // Add New Grand Of Aid
      .addCase(addNewGrantOfAid.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewGrantOfAid.fulfilled, (state, action: PayloadAction<IGrantOfAidResponse>) => {
        state.isLoading = false
        state.grantOfAids = action.payload
      })

      // Get All Grant Of Aids
      .addCase(getGrandOfAids.pending, (state) => {
        state.isLoadingGOL = true
      })
      .addCase(getGrandOfAids.fulfilled, (state, action: PayloadAction<IGrantOfAidResponse>) => {
        state.isLoadingGOL = false
        state.grantOfAids = action.payload
      })
      .addCase(getGrandOfAids.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.error = action.payload
      })

      // Delete Grant Of Aid
      .addCase(deleteGrantOfAid.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGrantOfAid.fulfilled, (state, action: PayloadAction<IGrantOfAidResponse>) => {
        state.isLoading = false
        state.grantOfAids = action.payload
      })

      // Get Single Grand Of Aid Based on Clien ID and Grant ID
      .addCase(getSingleGrandOfAid.pending, (state) => {
        state.isLoadingEditGOL = true
      })
      .addCase(getSingleGrandOfAid.fulfilled, (state, action: PayloadAction<ISingleGrantofAid>) => {
        state.singleGrantOfAid = action.payload
        state.isLoadingEditGOL = false
      })
      .addCase(getSingleGrandOfAid.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload
        state.isLoadingEditGOL = false
      })

      // Update Grant Of Aid
      .addCase(updateGrantOfAid.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateGrantOfAid.fulfilled, (state, action: PayloadAction<IGrantOfAidResponse>) => {
        state.isLoading = false
        state.grantOfAids = action.payload
      })
  }
})

export const { reset } = grantOfAidSlice.actions
export default grantOfAidSlice.reducer
