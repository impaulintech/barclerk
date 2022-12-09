import { axios } from '~/shared/lib/axios'

const getExtensions = async (clientID: number) => {
  const response = await axios.get(`/extension/${clientID}`)
  return response.data
}

const createNewEntry = async (clientID: number, requiredValue: any) => {
  const response = await axios.post(`/client/${clientID}/time-entry`, { ...requiredValue })
  return response.data
}

const getTimeEntries = async (clientID: number, pageCount: number) => {
  const response = await axios.get(`/client/${clientID}/time-entry?page=${pageCount}`)
  return response.data
}

const updateTimeEntries = async (clientID: number, timeEntryID: number, requiredValue:any) => {
  const response = await axios.put(`/client/${clientID}/time-entry/${timeEntryID}`, { ...requiredValue })
  return response.data
}

const timeEntryService = {
  getExtensions,
  getTimeEntries,
  createNewEntry,
  updateTimeEntries
}
export default timeEntryService
