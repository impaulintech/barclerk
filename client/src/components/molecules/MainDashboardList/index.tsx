import React, { FC } from 'react'

import TableHead from './TableHead'
import TableItem from './TableItem'
import TableSkeleton from './TableSkeleton'
import { Matter } from '~/shared/interfaces'

type Props = {
  matters: Matter[]
  searchedVal: string
}

const MainDashboardList: FC<Props> = ({ matters, searchedVal }): JSX.Element => {
  const { length } = matters

  return (
    <table className="w-full divide-y divide-slate-300 text-left text-sm leading-normal">
      <TableHead />
      <tbody className="relative divide-y divide-slate-300 text-sm text-slate-600">
        {/* <TableErrorMessage message="No Available Data" /> */}
        {/* <TableErrorMessage message="Ooops.. Something went wrong" /> */}
        {!matters ? (
          <TableSkeleton length={length} />
        ) : (
          <>
            {matters
              ?.filter(
                (row: Matter) =>
                  !searchedVal?.length ||
                  row?.client_name
                    .toString()
                    .toLowerCase()
                    .includes(searchedVal.toString().toLowerCase())
              )
              ?.map((matter: Matter) => (
                <TableItem key={matter.id} matter={matter} />
              ))}
          </>
        )}
      </tbody>
    </table>
  )
}

const TableErrorMessage = ({ message }: { message: string }) => {
  return (
    <tr className="absolute inset-x-0 left-0 right-0 w-full flex-1">
      <td className="bg-rose-50 py-2"></td>
      <td className="w-full bg-rose-50 py-2 text-center font-medium text-rose-900">{message}</td>
      <td className="bg-rose-50 py-2"></td>
    </tr>
  )
}

export default MainDashboardList
