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
      <tbody className="divide-y divide-slate-300 text-sm text-slate-600">
        {!matters ? (
          <TableSkeleton length={length} />
        ) : (
          <>
            {matters
              ?.filter(
                (row: Matter) =>
                  !searchedVal?.length ||
                  row?.matter_name
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

export default MainDashboardList
