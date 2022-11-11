/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'
import { NextPage } from 'next'

const NotFound: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
        <meta name="description" content="404 Page Not Found" />
      </Head>
      <main className="flex h-screen min-h-screen items-center justify-center bg-slate-600 px-4 text-white transition duration-700 ease-in-out">
        <div className="flex max-w-md flex-col items-center space-y-4">
          <header className="flex items-center">
            <span className="text-9xl font-extrabold">4</span>
            <div className="z-50 flex-shrink-0">
              <img src="/images/lawgo.png" alt="lawgo" width={192} height={192} />
            </div>
            <span className="text-9xl font-extrabold">4</span>
          </header>
          <section className="flex flex-col items-center gap-3 pb-5">
            <h2 className="text-xl font-bold uppercase">Oops! Page not be found</h2>
            <p className="text-center text-sm text-slate-300">
              Sorry but the page that you are looking for does not exist, have been removed, name
              changed, or is temporarily unavailable
            </p>
          </section>
          <Link href="/">
            <span className="cursor-pointer rounded-xl bg-barclerk-10 px-6 py-3 font-semibold text-white transition duration-150 ease-in-out focus:outline-none hover:bg-barclerk-10/70 hover:shadow-xl">
              Back to Homepage
            </span>
          </Link>
        </div>
      </main>
    </>
  )
}

export default NotFound
