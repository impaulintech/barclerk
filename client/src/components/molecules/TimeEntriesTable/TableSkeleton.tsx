import React, { FC } from 'react'

import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'

type Props = {
  length: number
}

const TableSkeleton: FC<Props> = ({ length }): JSX.Element => {
  return (
    <>
      {Array.from({ length }, (_, i) => (
        <tr key={i}>
          <td className="whitespace-nowrap px-6 py-2.5">
            <LineSkeleton />
          </td>
          <td className="whitespace-nowrap px-6 py-2.5">
            <LineSkeleton />
          </td>
          <td className="whitespace-nowrap px-6 py-2.5">
            <LineSkeleton />
          </td>
          <td className="whitespace-nowrap px-6 py-2.5">
            <LineSkeleton />
          </td>
          <td className="whitespace-nowrap px-6 py-2.5">
            <LineSkeleton />
          </td>
          <td className="whitespace-nowrap px-6 py-2.5">
            <LineSkeleton />
          </td>
          <td className="whitespace-nowrap px-6 py-2.5">
            <LineSkeleton />
          </td>
          <td className="whitespace-nowrap px-6 py-2.5">
            <LineSkeleton />
          </td>
        </tr>
      ))}
    </>
  )
}

export default TableSkeleton
