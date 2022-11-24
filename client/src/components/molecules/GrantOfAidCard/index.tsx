import React, { FC } from 'react'
import { Edit3, Eye, Trash } from 'react-feather'

import { IGrantOfAid } from '~/shared/interfaces'

type Props = {
  grant: IGrantOfAid
}

const GrantofAidCard: FC<Props> = ({ grant }): JSX.Element => {
  return (
    <section className="group flex w-full flex-col space-y-2 rounded-md bg-white p-4 text-sm shadow transition duration-150 ease-in-out hover:shadow-lg">
      <div className="flex items-center space-x-2">
        <h2 className="text-slate-700">Extension:</h2>
        <span
          className={`
          rounded-full border px-1 font-medium
          ${
            grant.status
              ? 'border-green-300 bg-green-50 text-green-600'
              : 'border-rose-300 bg-rose-50 text-rose-600'
          }
        `}
        >
          {grant.extension}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <h2 className="text-slate-700">Date Effective:</h2>
        <span className="text-base font-medium text-barclerk-10">{grant.date_effective}</span>
      </div>
      <div className="ml-auto flex flex-wrap space-x-2 pt-4 text-xs md:text-sm">
        <button
          type="button"
          className={`
            flex items-center rounded border border-transparent px-2 py-1 text-slate-400
            outline-none group-hover:border-slate-300 hover:text-slate-500 active:scale-95
          `}
        >
          <Eye className="mr-2 h-4 w-4" />
          View Codes
        </button>
        <button
          type="button"
          className={`
            flex items-center rounded border border-transparent px-2 py-1 text-slate-400
            outline-none group-hover:border-slate-300 hover:text-slate-500 active:scale-95
          `}
        >
          <Edit3 className="mr-2 h-4 w-4" />
          Edit
        </button>
        <button
          type="button"
          className={`
            flex items-center rounded border border-transparent px-2 py-1 text-slate-400
            outline-none group-hover:border-slate-300 hover:text-slate-500 active:scale-95
          `}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </button>
      </div>
    </section>
  )
}

export default GrantofAidCard
