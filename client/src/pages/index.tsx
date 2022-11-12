import Head from 'next/head'
import Link from 'next/link'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Matter } from '~/shared/interfaces'
import { matters } from '~/shared/data/matters'
import Pagination from '~/components/atoms/Pagination'
import { BarClerkWhiteIcon } from '~/shared/icons/LogoIcon'
import UserMenuDropDown from '~/components/molecules/UserMenuDropdown'
import MainDashboardList from '~/components/molecules/MainDashboardList'
import MainTableHeader from '~/components/molecules/MainTableHeader'

const Index: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { filter } = router.query

  const [pageNumber, setPageNumber] = useState<number>(0)
  const [searchedVal, setSearchedVal] = useState<string>('')
  const [matterData, setMatterData] = useState<Matter[]>(matters)

  useEffect(() => {
    const newMatter = matterData.filter((data) => data.status === filter)
    // TODO: This will filter out the data
    // console.log(newMatter)
  }, [filter])

  /*
   * This is the logic for creating a custom pagination
   */
  const filesPerPage = 14
  const pagesVisited = pageNumber * filesPerPage
  const displayMatters = matterData.slice(pagesVisited, pagesVisited + filesPerPage)
  const pageCount = Math.ceil(matterData.length / filesPerPage)
  const changePage = ({ selected }: { selected: number }): void => setPageNumber(selected)

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
              <UserMenuDropDown />
            </section>
          </nav>
        </header>
        <main className="mx-auto mt-4 flex h-full w-full max-w-[100rem] flex-col justify-between overflow-hidden bg-slate-50 px-4 pb-24 pt-5 md:px-8">
          <MainTableHeader setSearchedVal={setSearchedVal} />
          <article
            className={`
              h-full rounded-b-md border-x border-b border-slate-300 bg-white
              shadow scrollbar-thin scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md
            `}
          >
            <MainDashboardList matters={displayMatters} searchedVal={searchedVal} />
          </article>
          <footer className="mt-3 flex items-center justify-center ">
            <Pagination
              length={matterData?.length}
              pageNumber={pageNumber}
              pageCount={pageCount}
              actions={{ changePage }}
            />
          </footer>
        </main>
      </section>
    </>
  )
}

export default Index
export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
