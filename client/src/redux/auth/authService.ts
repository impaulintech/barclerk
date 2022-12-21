import { deleteCookie, setCookie } from 'cookies-next'

import { SignInUpFormValues } from '~/shared/types'
import { axios, setBearerToken } from '~/shared/lib/axios'

const signUp = async (user: SignInUpFormValues): Promise<any> => {
  const response = await axios.post('/sign-up', user)
  const { token, user: data } = response.data

  if (response.status === 200) {
    setCookie('token', token)
    setBearerToken(token)
  }

  return data
}

const signIn = async (user: SignInUpFormValues): Promise<any> => {
  const response = await axios.post('/sign-in', user)
  const { token, user: data } = response.data

  if (response.status === 200) {
    setCookie('token', token)
    setBearerToken(token)
  }

  return data
}

const signOut = async (): Promise<any> => {
  const response = await axios.post('/sign-out') 
  deleteCookie('token')
  return response.data
}

const requestPasswordResetLink = async (email: any): Promise<any> => {
  const response = await axios.post('/forgot-password', { email })
  return response.data
}

const getAuthUser = async (): Promise<any> => {
  const response = await axios.get('/auth')
  return response.data
}

const resetPassword = async (data: any): Promise<any> => {
  const response = await axios.post('/reset-password', data)
  return response.data
}

const updateDetails = async (data: any): Promise<any> => {
  const response = await axios.post('/user/update-details', data)
  return response.data
}

const updatePassword = async (data: any): Promise<any> => {
  const response = await axios.post('/user/change-password', data)
  return response.data
}

const hydrateUserState = async (): Promise<any> => {
  const response = await axios.get('/auth')
  return response.data
}

const authService = {
  signUp,
  signIn,
  signOut,
  getAuthUser,
  updateDetails,
  resetPassword,
  updatePassword,
  hydrateUserState,
  requestPasswordResetLink
}

export default authService
