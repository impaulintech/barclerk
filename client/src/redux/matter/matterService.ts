import { Payload } from './types'
import { axios } from '~/shared/lib/axios'
import { TMatterResponse } from '~/shared/types/pageTypes'

const getMatters = async ({ page = 1, status = 0, searchQuery }: Payload): Promise<TMatterResponse> => {
  const response = await axios.get('/client', {
    params: { page, status, search_query: searchQuery }
  })
  return response.data
}

const matterService = {
  getMatters
}

export default matterService
