import { axios } from '~/shared/lib/axios'
import { GetMattersPayload } from './types'
import { MatterFormValues } from '~/shared/types'
import { TMatterResponse } from '~/shared/types/pageTypes'

const getMatters = async ({
  page = 1,
  status = 0,
  searchQuery
}: GetMattersPayload): Promise<TMatterResponse> => {
  const response = await axios.get('/client', {
    params: { page, status, search_query: searchQuery }
  })
  return response.data
}

const addNewMatter = async (data: MatterFormValues): Promise<TMatterResponse> => {
  const response = await axios.post('/client', data)
  return response.data
}

const getSingleMatter = async (client_id: string | string[] | undefined) => {
  const response = await axios.get(`/client/${client_id}`)
  return response.data
}

const matterService = {
  getMatters,
  addNewMatter,
  getSingleMatter
}

export default matterService
