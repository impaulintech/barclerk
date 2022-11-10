import Head from 'next/head'
import Link from 'next/link'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Menu } from '@headlessui/react'
import { Plus, Filter, Search } from 'react-feather'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

import { Matter } from '~/shared/interfaces'
import { matters } from '~/shared/data/matters'
import Pagination from '~/components/atoms/Pagination'
import { BarClerkWhiteIcon } from '~/shared/icons/LogoIcon'
import MenuTransition from '~/components/atoms/MenuTransition'
import UserMenuDropDown from '~/components/molecules/UserMenuDropdown'
import MainDashboardList from '~/components/molecules/MainDashboardList'

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
            {/* <pre>{JSON.stringify(matterData, null, 2)}</pre> */}
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

type MainTableHeaderProps = {
  setSearchedVal: Dispatch<SetStateAction<string>>
}

const MainTableHeader: FC<MainTableHeaderProps> = ({ setSearchedVal }): JSX.Element => {
  const router = useRouter()

  const { filter } = router.query

  const filters = [
    {
      id: 1,
      name: 'Active',
      color: 'bg-success',
      route: 'active'
    },
    {
      id: 2,
      name: 'Inactive',
      color: 'bg-orange-500',
      route: 'inactive'
    },
    {
      id: 3,
      name: 'Archived',
      color: 'bg-slate-500',
      route: 'archived'
    }
  ]

  const currentFilter = (): string =>
    filter === 'active'
      ? 'Active'
      : filter === 'inactive'
      ? 'Inactive'
      : filter === 'archived'
      ? 'Archived'
      : 'Filter Status'

  return (
    <header
      className={`
        sticky top-0 left-0 z-20 flex w-full flex-1 flex-wrap items-center justify-between rounded-t-md border-x border-t border-b
        border-slate-300 bg-white px-6 py-2
      `}
    >
      <h1 className="text-lg font-bold text-barclerk-10">Main Dashboard</h1>
      <div className="flex flex-wrap items-center space-x-2">
        <label htmlFor="search" className="relative inset-y-0 flex items-center">
          <Search className="absolute left-2 h-4 w-4 text-slate-400" />
          <input
            id="search"
            type="text"
            onChange={(e) => setSearchedVal((e.target as HTMLInputElement).value)}
            className="w-36 rounded border border-slate-300 py-0.5 pl-7 text-slate-900 focus:border-barclerk-10 focus:shadow hover:shadow md:w-52"
          />
        </label>
        <Menu as="div" className="relative">
          {({ open }) => (
            <>
              <Menu.Button
                className={`
                  flex items-center space-x-1 rounded border border-slate-300 px-2 py-[0.26rem] text-sm
                  outline-none transition duration-150 ease-in-out focus:shadow active:scale-95
                  ${open ? 'bg-barclerk-10 text-white' : 'text-slate-600 hover:bg-slate-100'}
                `}
                title="Filter Status"
              >
                <Filter className="h-4 w-4" />
                <span className="hidden md:block">{currentFilter()}</span>
              </Menu.Button>
              <MenuTransition>
                <Menu.Items
                  className={`
                    absolute right-0 w-36 origin-top-right divide-y divide-slate-200 overflow-hidden rounded-b-md 
                  bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none
                  `}
                >
                  {filters.map(({ id, name, color, route }) => (
                    <div key={id}>
                      <Menu.Item>
                        <button
                          className={`
                          group flex w-full items-center overflow-hidden px-4 py-2 text-sm font-medium text-slate-600 
                          transition duration-150 ease-in-out hover:bg-slate-100
                        `}
                          onClick={() => router.push(`?filter=${route}`)}
                        >
                          <span className={`mr-2 h-2.5 w-2.5 rounded-full ${color}`}></span>
                          {name}
                        </button>
                      </Menu.Item>
                    </div>
                  ))}
                </Menu.Items>
              </MenuTransition>
            </>
          )}
        </Menu>
        <button
          type="button"
          className={`
              flex cursor-pointer items-center space-x-1 rounded border border-barclerk-10 bg-barclerk-10 px-2 py-[0.26rem] text-sm
            text-white shadow outline-none transition duration-150 ease-in-out focus:bg-barclerk-10 hover:bg-barclerk-10 hover:bg-barclerk-10/90
              active:scale-95 active:bg-barclerk-10
          `}
          title="Add New Matter"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden md:block">Add New Matter</span>
        </button>
      </div>
    </header>
  )
}

export default Index
export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
