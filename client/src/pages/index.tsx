import Head from 'next/head'
import Link from 'next/link'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

import Pagination from '~/components/atoms/Pagination'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { BarClerkWhiteIcon } from '~/shared/icons/LogoIcon'
import MainTableHeader from '~/components/molecules/MainTableHeader'
import UserMenuDropDown from '~/components/molecules/UserMenuDropdown'
import MainDashboardList from '~/components/molecules/MainDashboardList'
import UserSettingsModal from '~/components/molecules/UserSettingsModal'
import { getAuthUser, reset } from '~/redux/auth/authSlice';

const Index: NextPage = (): JSX.Element => {
  const { matters } = useAppSelector((state) => state.matter)
  const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const handleFetchUser = async () => {
    await dispatch(getAuthUser())
    reset()
  }

  useEffect(() => {
    handleFetchUser()
  }, [])

  const closeModalToggle = (): void => setIsOpenSettings(!isOpenSettings)

  return (
    <>
      <Head>
        <title>Main Dashboard | Barclerk</title>
      </Head>
      <section className="h-screen min-h-screen overflow-hidden bg-slate-50">
        <header className="bg-barclerk-10 text-white">
          <nav className="mx-auto flex w-full max-w-[100rem] items-center justify-between px-4 py-2">
            <Link href="/">
              <section className="inline-flex items-center space-x-3">
                <BarClerkWhiteIcon className="h-6 w-6 fill-current text-white" />
                <h1 className="text-lg font-bold uppercase text-white md:text-xl">Barclerk</h1>
              </section>
            </Link>
            <section>
              <UserMenuDropDown actions={{ closeModalToggle }} />
              <UserSettingsModal isOpen={isOpenSettings} closeModal={closeModalToggle} />
            </section>
          </nav>
        </header>
        <main className="mx-auto mt-4 flex h-full w-full max-w-[100rem] flex-col justify-between overflow-hidden bg-slate-50 px-4 pb-24 pt-5 md:px-8">
          <MainTableHeader />
          <article
            className={`
              h-full rounded-b-md border-x border-b border-slate-300 bg-white
              shadow scrollbar-thin scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md
            `}
          >
            <MainDashboardList />
          </article>
          <footer className="mt-3 flex items-center justify-center ">
            {matters ? <Pagination /> : null}
          </footer>
        </main>
      </section>
    </>
  )
}

export default Index
export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
