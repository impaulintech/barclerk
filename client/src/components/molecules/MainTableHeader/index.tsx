import { Menu } from '@headlessui/react'
import { Filter, Plus, Search } from 'react-feather'
import { FC, useEffect, useRef, useState } from 'react'

import { MatterStatus } from '~/utils/constants'
import AddNewMatterModal from './AddNewMatterModal'
import { useAppDispatch } from '~/hooks/reduxSelector'
import { useDebounceSearch } from '~/hooks/searchDebounce'
import MenuTransition from '~/components/atoms/MenuTransition'
import { getMatters, reset } from '~/redux/matter/matterSlice'

const MainTableHeader: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isOpenNewMatter, setIsOpenNewMatter] = useState<boolean>(false)

  const [search, setSearch] = useState<string>('')
  const filterRef = useRef<HTMLSpanElement | null>(null)
  const toggle = () => setIsOpenNewMatter(!isOpenNewMatter)

  const debouncedSearch = useDebounceSearch(search, 500)

  useEffect(() => {
    dispatch(getMatters({ searchQuery: debouncedSearch }))
  }, [debouncedSearch])

  const handleFilterMatters = async (id: number, name: string) => {
    if (filterRef.current) {
      name === 'Remove Filter'
        ? (filterRef.current.innerHTML = 'Filter Status')
        : (filterRef.current.innerHTML = name)
    }
    await dispatch(getMatters({ status: id }))
    reset()
  }

  const filters = [
    {
      id: 0,
      name: 'Remove Filter',
      color: 'bg-red-500'
    },
    {
      id: 1,
      name: MatterStatus.ACTIVE,
      color: 'bg-success'
    },
    {
      id: 2,
      name: MatterStatus.UN_ACTIVE,
      color: 'bg-orange-500'
    },
    {
      id: 3,
      name: MatterStatus.ARCHIVED,
      color: 'bg-slate-500'
    }
  ]

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
            onChange={(e) => setSearch(e.target.value)}
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
                <span className="hidden md:block" ref={filterRef}>
                  Filter Status
                </span>
              </Menu.Button>
              <MenuTransition>
                <Menu.Items
                  className={`
                    absolute right-0 w-36 origin-top-right divide-y divide-slate-200 overflow-hidden rounded-b-md 
                  bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none
                  `}
                >
                  {filters.map(({ id, name, color }) => (
                    <div key={id}>
                      <Menu.Item>
                        <button
                          className={`
                          group flex w-full items-center overflow-hidden px-4 py-2 text-sm font-medium text-slate-600 
                          transition duration-150 ease-in-out hover:bg-slate-100
                        `}
                          onClick={() => handleFilterMatters(id, name)}
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
          onClick={toggle}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden md:block">Add New Matter</span>
        </button>
        <AddNewMatterModal isOpen={isOpenNewMatter} closeModal={toggle} />
      </div>
    </header>
  )
}

export default MainTableHeader
