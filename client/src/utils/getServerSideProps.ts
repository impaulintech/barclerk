import { GetServerSideProps } from 'next'

import { wrapper } from '~/redux/store'
import { axios } from '~/shared/lib/axios'
import { setAuth } from '~/redux/auth/authSlice'
import { serverSideErrorMessage } from './serverSideErrorMessage'

export const SignInUpAuthChecker: GetServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const token = req.cookies['token']
      const config = { headers: { Authorization: `Bearer ${token}` } }

      try {
        const res = await axios.get('/auth', config)

        if (res.data) {
          store.dispatch(setAuth(res.data))

          return {
            redirect: {
              permanent: false,
              destination: '/'
            },
            props: req
          }
        }
      } catch (error: any) {
        if (error.code === 'ECONNREFUSED') serverSideErrorMessage(error)
      }

      return {
        props: {}
      }
    }
)

export const authCheck: GetServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const token = req.cookies['token']
      const config = { headers: { Authorization: `Bearer ${token}` } }

      try {
        const res = await axios.get('auth', config)
        store.dispatch(setAuth(res.data))

        const privateRoutes = req.url?.includes('matter')
        const forgotPasswordPage = req.url?.includes('forgot-password')
        const linkClicked = req.url?.includes('token') && req.url?.includes('email')

        if (forgotPasswordPage) {
          if (!token) return { props: {} }
          if (linkClicked) return { props: {} }

          return {
            redirect: {
              permanent: false,
              destination: '/'
            }
          }
        }
        if (privateRoutes) {
          if (!token) {
            return {
              redirect: {
                permanent: false,
                destination: '/'
              }
            }
          }
        }
      } catch (error: any) {
        const forgotPasswordPage = req.url?.includes('forgot-password')
        if (forgotPasswordPage) return { props: {} }
        if (req.url === '/') {
          if (!token) {
            return {
              redirect: {
                permanent: false,
                destination: '/sign-up'
              },
              props: {}
            }
          }
        }
        if (error.response?.status === 404) {
          return {
            notFound: true
          }
        }
        if (error.response?.status === 500) {
          throw new Error('Internal Server Error')
        }

        return {
          props: {}
        }
      }

      return {
        props: {}
      }
    }
)
