import Axios from 'axios'
import { getCookie } from 'cookies-next'

const token = getCookie('token')

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*"
  }
})

export const setBearerToken = (token: string) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`
}
