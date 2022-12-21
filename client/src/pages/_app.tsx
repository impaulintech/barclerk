import Head from 'next/head'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

import '~/shared/css/globals.css'
import { wrapper } from '~/redux/store'
import NextProgress from '~/shared/lib/next-progress'
import { useEffect } from 'react';
import { useAppDispatch } from '~/hooks/reduxSelector';
import { getAuthUser, reset } from '~/redux/auth/authSlice';

const MyApp = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NextProgress />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#2D3D63',
            color: '#fff'
          }
        }}
      />
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
