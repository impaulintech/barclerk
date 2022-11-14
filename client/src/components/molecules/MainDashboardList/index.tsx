import { FC, useEffect } from 'react'

import TableHead from './TableHead'
import TableItem from './TableItem'
import TableSkeleton from './TableSkeleton'
import { PER_PAGE } from '~/utils/constants'
import { getMatters, reset } from '~/redux/matter/matterSlice'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'

const MainDashboardList: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const handleFetchMatters = async () => {
    await dispatch(getMatters({}))
    reset()
  }

  useEffect(() => {
    handleFetchMatters()
  }, [])

  return (
    <table className="w-full divide-y divide-slate-300 text-left text-sm leading-normal">
      <TableHead />
      <tbody className="relative divide-y divide-slate-300 text-sm text-slate-600">
        <TableContent />
      </tbody>
    </table>
  )
}

const TableContent = () => {
  const { matters, isLoading, isError } = useAppSelector((state) => state.matter)
  const { data } = matters || {}

  if (isLoading) {
    return <TableSkeleton length={PER_PAGE} />
  }

  if (isError) {
    return <TableErrorMessage message="Ooops.. Something went wrong" />
  }

  if (!data?.length) {
    return <TableErrorMessage message="No Available Data" />
  }

  return (
    <>
      {data?.map((matter) => (
        <TableItem key={matter.id} matter={matter} />
      ))}
    </>
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
