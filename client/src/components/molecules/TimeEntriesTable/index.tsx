import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { PER_PAGE } from '~/utils/constants' 

import TableHead from './TableHead'
import TableItem from './TableItem'
import TableSkeleton from './TableSkeleton'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { getExtensions, getTimeEntries } from '~/redux/time-entry/timeEntrySlice'

const TimeEntriesTable:FC = (): JSX.Element => {
  const { query } = useRouter();
  const clientID = Number(query?.id); 
  const currentPage = 1;  
  const dispatch = useAppDispatch()  
   
  useEffect(()=>{  
    dispatch(getExtensions(clientID)) 
    dispatch(getTimeEntries({clientID, currentPage})) 
  }, [])     

  return (
    <table className="w-full divide-y divide-slate-300 text-left text-sm leading-normal">
      <TableHead />
      <tbody className="relative divide-y divide-slate-300 text-sm text-slate-600">
        <TableContent/>
      </tbody>
    </table>
  )
}

const TableContent = () => {
  const { timeEntries, isLoading, isError, extensionList } = useAppSelector((state) => state.timeEntry)
  const { data } = timeEntries || {}   

  if (isLoading) {
    return <TableSkeleton length={PER_PAGE} />
  }

  if (isError) {
    return <TableErrorMessage message="Ooops.. Something went wrong" />
  }

  if (data?.length === 0) {
    return <TableErrorMessage message="No Available Data" />
  }

  return (
    <>
      {data?.map((timeEntry: any) => ( 
          <TableItem 
            key={Math.random()} 
            timeEntries={timeEntry}   
            extensionList={extensionList}
          /> 
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

export default TimeEntriesTable
