import moment from 'moment'; 
import Tippy from '@tippyjs/react'
import { FC, useState } from 'react'
import { Edit, ChevronDown, ChevronUp } from 'react-feather' 

import AddNewEntry from '../TimeEntryTableHeader/AddNewEntry' 

type Props = {
  timeEntries: any  
  extensionList: any
}

const TableItem: FC<Props> = (props): JSX.Element => {  
  const { timeEntries } = props || {}
  const { amount, date, description, extension, hours: hoursUnit, type, id: timeEntryID } = timeEntries || {}
  const { 
    id: extensionID,
    extension: extensionValue,  
  } = extension || {}
  const { 
    id: typeID, 
    type: typeValue, 
    rate: ratePerHour,  
  } = type || {} 
  
  const dateFormatted = moment(date).format('DD MMMM YYYY');

  const [dropdown, setDropdown] = useState<boolean>(false)
  const [isOpenNewMatter, setIsOpenNewMatter] = useState<boolean>(false) 
  const toggle = () => setIsOpenNewMatter(!isOpenNewMatter)
  
  return (
    <>
      <tr className="group select-none font-medium text-slate-700 transition duration-75 ease-in-out hover:bg-slate-100">
        <td className="py-2 px-6">
          <Tippy content={dateFormatted}>
            <span className="font-extrabold line-clamp-1 text-barclerk-30">{dateFormatted}</span>
          </Tippy>
        </td>

        <td className="py-2 px-6"> 
          <Tippy content={extensionValue}>
            <span className="font-medium line-clamp-1">{extensionValue}</span>
          </Tippy>
        </td>

        <td className="py-2 px-6">
          <Tippy content={typeValue}>
            <span className="font-medium line-clamp-1">{typeValue}</span>
          </Tippy>
        </td>

        <td className="py-2 px-6">
          <Tippy content={ hoursUnit } disabled={true}>
            <span className="font-medium line-clamp-1">{ hoursUnit }</span>
          </Tippy>
        </td>

        <td className="py-2 px-6">
          <Tippy content={`$${ratePerHour}`} disabled={true}>
            <span className="font-medium line-clamp-1">$ {ratePerHour}</span>
          </Tippy>
        </td>

        <td className="py-2 px-6">
          <Tippy content={`$${amount}`} disabled={true}>
            <span className="font-extrabold line-clamp-1 text-barclerk-10">$ {amount}</span>
          </Tippy>
        </td>

        <td className="h-full items-center justify-between py-2 px-6">
          <div className="flex">
            <Tippy content={'Edit this row'}>
              <span
                className="w-[50%] cursor-pointer font-extrabold line-clamp-1"
                onClick={toggle} 
              >
                <Edit className="h-5 w-5" />
              </span>
            </Tippy>
            <span
              className="flex w-[50%] cursor-pointer items-center justify-end font-extrabold"
              onClick={() => setDropdown(!dropdown)}
            >
              {dropdown ? <ChevronUp /> : <ChevronDown />}
            </span>
          </div>
          <AddNewEntry 
            isOpen={isOpenNewMatter} 
            closeModal={toggle} 
            editData={{ 
              description,
              date, 
              extension: extensionValue, 
              type: typeValue,  
              grant_id: extensionID,  
              type_id: typeID,  
              hoursUnit, 
              ratePerHour, 
              amount,
              timeEntryID
            }} 
          />
        </td>
      </tr>

      <tr
        className={`
          ${dropdown || 'hidden'} 
          group relative h-[115px] max-h-[115px] select-none font-medium text-slate-700
        `}
      >
        <td colSpan={100} className="h-[115px] w-full py-2 px-6">
          <span className="mb-[9px] font-semibold text-slate-700 opacity-60 line-clamp-1">
            Description
          </span>
          {
            description
            ? (
              <p className="h-[60px] overflow-y-scroll font-semibold text-[18px] text-slate-700 tracking-normal [word-spacing:5px]">
                {description}
              </p>
            )
            : (
              <p className="h-[60px] font-semibold text-rose-500 flex items-center justify-center">
                No available data
              </p>
            )
          } 
        </td>
      </tr> 
    </>
  )
}

export default TableItem
