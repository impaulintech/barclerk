import { axios } from '~/shared/lib/axios'
import {
  ICode,
  IGOLRequest,
  IGOLPaginate,
  IGrantOfAidResponse,
  IAddGrantOfAidPayload,
  IUpdatePayload
} from './interface'

const getClauses = async (): Promise<ICode[]> => {
  const response = await axios.get('/clause')
  return response.data
}

const addNewGrantOfAid = async (payload: IAddGrantOfAidPayload): Promise<IGrantOfAidResponse> => {
  const { client_id, extension, date_effective, codes } = payload
  const response = await axios.post(`/client/${client_id}/grant`, {
    extension,
    date_effective,
    codes
  })
  return response.data
}

const getGrandOfAids = async ({
  client_id,
  page = 1
}: IGOLPaginate): Promise<IGrantOfAidResponse> => {
  const response = await axios.get(`/client/${client_id}/grant`, {
    params: {
      page
    }
  })
  return response.data
}

const deleteGrantOfAid = async ({
  client_id,
  grant_id
}: IGOLRequest): Promise<IGrantOfAidResponse> => {
  const response = await axios.delete(`/client/${client_id}/grant/${grant_id}`)
  return response.data
}

const getSingleGrantOfAid = async ({ client_id, grant_id }: IGOLRequest) => {
  const response = await axios.get(`/client/${client_id}/grant/${grant_id}`)
  return response.data
}

const updateGrantOfAid = async (payload: IUpdatePayload) => {
  const { client_id, grant_id, extension, date_effective, codes } = payload
  const response = await axios.put(`/client/${client_id}/grant/${grant_id}`, {
    extension,
    date_effective,
    codes
  })
  return response.data
}

const grantOfAidService = {
  getClauses,
  getGrandOfAids,
  deleteGrantOfAid,
  addNewGrantOfAid,
  updateGrantOfAid,
  getSingleGrantOfAid
}

export default grantOfAidService
