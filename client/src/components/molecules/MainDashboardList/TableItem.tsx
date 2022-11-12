import React, { FC } from 'react'
import Tippy from '@tippyjs/react'
import { useRouter } from 'next/router'

import { Matter } from '~/shared/interfaces'

type Props = {
  matter: Matter
}

const TableItem: FC<Props> = (props): JSX.Element => {
  const router = useRouter()

  const {
    matter: {
      id,
      client_name,
      contribution,
      restrictions,
      extension,
      total_prep_used,
      total_fund_used,
      remaining_fund,
      next_court_date,
      status
    }
  } = props

  return (
    <tr
      className={`
        group cursor-pointer font-medium text-slate-700 transition duration-75 ease-in-out hover:bg-slate-100
        ${status === 'archived' && 'opacity-50'}
      `}
      onClick={() => router.push(`/client/${id}`)}
    >
      <td className="flex items-center space-x-2 py-2 px-6">
        <span
          className={`
            h-2 w-2 flex-shrink-0 rounded-full
            ${
              status === 'active'
                ? 'bg-success'
                : status === 'inactive'
                ? 'bg-amber-500'
                : 'bg-slate-500'
            }
          `}
        ></span>
        <Tippy content={client_name}>
          <span className="font-semibold text-barclerk-10 line-clamp-1">{client_name}</span>
        </Tippy>
      </td>
      <td className="py-2 px-6">
        {contribution === 'No' ? (
          'No'
        ) : (
          <Tippy content={contribution}>
            <span>Yes</span>
          </Tippy>
        )}
      </td>
      <td className="py-2 px-6">
        <span className="line-clamp-1" title={restrictions}>
          {restrictions}
        </span>
      </td>
      <td className="py-2 px-6">
        <Tippy content={extension}>
          <span className="line-clamp-1" title={extension}>
            {extension}
          </span>
        </Tippy>
      </td>
      <td className="py-2 px-6">
        <span
          className="font-extrabold text-barclerk-10 line-clamp-1"
          title={extension}
        >{`${total_prep_used}%`}</span>
      </td>
      <td className="py-2 px-6">
        <span
          className="font-extrabold text-barclerk-10 line-clamp-1"
          title={`${total_fund_used}`}
        >{`${total_fund_used}%`}</span>
      </td>
      <td className="py-2 px-6">
        <span
          className="font-extrabold text-barclerk-10 line-clamp-1"
          title={`${remaining_fund}`}
        >{`$${remaining_fund}`}</span>
      </td>
      <td className="py-2 px-6">
        <Tippy content={next_court_date}>
          <span className="font-extrabold text-[#4B91AA] line-clamp-1">{next_court_date}</span>
        </Tippy>
      </td>
    </tr>
  )
}

export default TableItem
