import React, { FC } from 'react'

import SortIcon from '~/shared/icons/Sorticon'

type Props = {}

const TableHead: FC<Props> = (): JSX.Element => {
  return (
    <thead className="text-slate-700">
      <tr className="flex-shrink-0 space-x-1">
        <th className="px-6 py-2 font-semibold">
          <button type="button" className="flex items-center outline-none active:scale-95">
            <span className="flex-shrink-0" title="Matter Name">
              Client Name
            </span>
            <SortIcon className="ml-2 hidden h-3 w-3 flex-shrink-0 text-slate-500 md:block" />
          </button>
        </th>
        <th className="px-6 py-2 font-semibold">
          <button type="button" className="flex items-center outline-none active:scale-95">
            <span className="flex-shrink-0" title="Contribution">
              Contribution
            </span>
            <SortIcon className="ml-2 hidden h-3 w-3 flex-shrink-0 text-slate-500 md:block" />
          </button>
        </th>
        <th className="px-6 py-2 font-semibold">
          <button type="button" className="flex items-center outline-none active:scale-95">
            <span className="flex-shrink-0" title="Restriction">
              Restriction
            </span>
            <SortIcon className="ml-2 hidden h-3 w-3 flex-shrink-0 text-slate-500 md:block" />
          </button>
        </th>
        <th className="px-6 py-2 font-semibold">
          <button type="button" className="flex items-center outline-none active:scale-95">
            <span className="flex-shrink-0" title="Extension">
              Extension
            </span>
            <SortIcon className="ml-2 hidden h-3 w-3 flex-shrink-0 text-slate-500 md:block" />
          </button>
        </th>
        <th className="px-6 py-2 font-semibold">
          <button type="button" className="flex items-center outline-none active:scale-95">
            <span className="line-clamp-1" title="Total Preparation Used">
              Total Fund
            </span>
            <SortIcon className="ml-2 hidden h-3 w-3 flex-shrink-0 text-slate-500 md:block" />
          </button>
        </th>
        <th className="px-6 py-2 font-semibold">
          <button type="button" className="flex items-center outline-none active:scale-95">
            <span className="line-clamp-1" title="Total Fund Used">
              Total Fund Used
            </span>
            <SortIcon className="ml-2 hidden h-3 w-3 flex-shrink-0 text-slate-500 md:block" />
          </button>
        </th>
        <th className="px-6 py-2 font-semibold">
          <button type="button" className="flex items-center outline-none active:scale-95">
            <span className="line-clamp-1" title="Remaining Fund">
              Remaining Fund
            </span>
            <SortIcon className="ml-2 hidden h-3 w-3 flex-shrink-0 text-slate-500 md:block" />
          </button>
        </th>
        <th className="px-6 py-2 font-semibold">
          <button type="button" className="flex items-center outline-none active:scale-95">
            <span className="line-clamp-1" title="Next Court Date">
              Next Court Date
            </span>
            <SortIcon className="ml-2 hidden h-3 w-3 flex-shrink-0 text-slate-500 md:block" />
          </button>
        </th>
      </tr>
    </thead>
  )
}

export default TableHead
