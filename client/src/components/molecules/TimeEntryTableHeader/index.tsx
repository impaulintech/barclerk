import {  Plus  } from 'react-feather'
import { FC,  useState } from 'react'
 
import AddNewEntry from './AddNewEntry' 

const TimeEntryTableHeader: FC = (): JSX.Element => { 
  const [isOpenNewMatter, setIsOpenNewMatter] = useState<boolean>(false)

  const toggle = () => setIsOpenNewMatter(!isOpenNewMatter)  

  return (
    <header
      className={`
        sticky top-0 left-0 z-20 flex w-full flex-1 flex-wrap items-center justify-between rounded-t-md border-x border-t border-b
        border-slate-300 bg-white px-6 py-2
      `}
    >
      <h1 className="text-lg font-bold text-barclerk-10">Time Entries</h1>
      <div className="flex flex-wrap items-center space-x-2"> 
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
          <span className="hidden md:block">Add New Entry</span>
        </button>
        <AddNewEntry isOpen={isOpenNewMatter} closeModal={toggle} />
      </div>
    </header>
  )
}

export default TimeEntryTableHeader
