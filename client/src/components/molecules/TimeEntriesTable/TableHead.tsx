import React, { FC } from 'react'

import SortIcon from '~/shared/icons/Sorticon'

type Props = {}

const tableHeader = [
  'Date',
  'Extension',
  'Type', 
  'Hours/Unit',
  'Rate per hour',
  'Amount',
  'Action'
]

const hasSortIcon: string[] = [] 

const TableHead: FC<Props> = (): JSX.Element => {
  return (
    <thead className="text-slate-700">
      <tr className="flex-shrink-0 space-x-1">
        {tableHeader?.map((title: string, index: number) => {
          return (
            <th className="px-6 py-2 font-semibold" key={index}>
              <button type="button" className={`${hasSortIcon.includes(title) && 'active:scale-95'} flex items-center outline-none min-w-[90px]`}>
                <span className="flex-shrink-0" title={title}>
                  {title}
                </span>
                {hasSortIcon.includes(title) && <SortIcon className="ml-2 h-3 w-3 flex-shrink-0 text-slate-500" />}
              </button>
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

export default TableHead
