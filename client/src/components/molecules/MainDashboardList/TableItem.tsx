import { FC } from 'react'
import Tippy from '@tippyjs/react'
import { useRouter } from 'next/router'
import moment from 'moment'

import { IMatter } from '~/shared/interfaces'
import { MatterStatus } from '~/utils/constants'

type Props = {
  matter: IMatter
}

const TableItem: FC<Props> = (props): JSX.Element => {
  const router = useRouter()

  const {
    matter: {
      id,
      clientName,
      contribution,
      preTrialRestriction,
      extension,
      courtAppearance,
      status
    }
  } = props

  return (
    <tr
      className={`
        group cursor-pointer font-medium text-slate-700 transition duration-75 ease-in-out hover:bg-slate-100
        ${status?.name === MatterStatus.ARCHIVED && 'opacity-50'}
      `}
      onClick={() => router.push(`/matter/${id}/client-profile`)}
    >
      <td className="flex items-center space-x-2 py-2 px-6">
        <span
          className={`
            h-2 w-2 flex-shrink-0 rounded-full
            ${
              status?.name === MatterStatus.ACTIVE
                ? 'bg-success'
                : status?.name === MatterStatus.UN_ACTIVE
                ? 'bg-amber-500'
                : 'bg-slate-500'
            }
          `}
        ></span>
        <Tippy content={clientName}>
          <span className="font-semibold text-barclerk-10 line-clamp-1">{clientName}</span>
        </Tippy>
      </td>
      <td className="py-2 px-6">
        {contribution === 0 ? (
          'No'
        ) : (
          <Tippy content={contribution}>
            <span>Yes</span>
          </Tippy>
        )}
      </td>
      <td className="py-2 px-6">
        <span className="line-clamp-1" title={preTrialRestriction?.name}>
          {preTrialRestriction?.name}
        </span>
      </td>
      <td className="py-2 px-6">
        <Tippy content={extension?.extension || 'None'}>
          <span className="line-clamp-1" title={extension?.extension || 'None'}>
            {extension?.extension || 'None'}
          </span>
        </Tippy>
      </td>
      <td className="py-2 px-6">
        <span
          className="font-extrabold text-barclerk-10 line-clamp-1"
          title={extension?.totalFund || '0'}
        >{`$${extension?.totalFund || 0}`}</span>
      </td>
      <td className="py-2 px-6">
        <span
          className="font-extrabold text-barclerk-10 line-clamp-1"
          title={`${extension?.totalFundUsed || 0}`}
        >{`${extension?.totalFundUsed || 0}%`}</span>
      </td>
      <td className="py-2 px-6">
        <span
          className="font-extrabold text-barclerk-10 line-clamp-1"
          title={`${extension?.remainingFunds || 0}`}
        >{`$${extension?.remainingFunds || 0}`}</span>
      </td>
      <td className="py-2 px-6">
        <Tippy content={courtAppearance?.next_court_date ? moment(courtAppearance?.next_court_date).format('DD MMMM YYYY') : 'None'}>
          <span className="font-extrabold text-[#4B91AA] line-clamp-1">{courtAppearance?.next_court_date ? moment(courtAppearance?.next_court_date).format('DD MMMM YYYY') : 'None'}</span>
        </Tippy>
      </td>
    </tr>
  )
}

export default TableItem
