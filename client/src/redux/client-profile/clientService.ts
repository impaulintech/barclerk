import { axios } from '~/shared/lib/axios'
import { IUpdatePayload } from './../matter/types'

const updateMatter = async (payload: IUpdatePayload) => {
  const { id: client_id } = payload
  const response = await axios.put(`/client/${client_id}`, payload)
  return response.data
}

const clientProfileSlice = {
  updateMatter
}

export default clientProfileSlice
