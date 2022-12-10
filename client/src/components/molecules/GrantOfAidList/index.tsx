import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'

import Pagination from './Pagination'
import GrantofAidCard from './../GrantOfAidCard'
import CardSkeleton from '~/components/atoms/Skeletons/CardSkeleton'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { getClauses, getGrandOfAids, reset } from '~/redux/grant-of-aid/grantOfAidSlice'

const GrantOfAidList: FC = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()

  const { grantOfAids } = useAppSelector((state) => state.grantOfAid)

  useEffect(() => {
    dispatch(getClauses())
  }, [])

  const handleFetchGrantOfAids = async (): Promise<void> => {
    await dispatch(getGrandOfAids({ client_id: id, page: 1 }))
    reset()
  }

  useEffect(() => {
    handleFetchGrantOfAids()
  }, [])

  return (
    <article className="flex flex-col justify-between space-y-8">
      {!grantOfAids?.data.length ? (
        <p className="pt-5 text-center text-slate-500">No Data Available</p>
      ) : (
        <main className="grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-2 xl:grid-cols-3">
          <GrantOfAidContent />
        </main>
      )}
      <footer className="mt-3 flex items-center justify-center">
        {grantOfAids ? <Pagination /> : null}
      </footer>
    </article>
  )
}

const GrantOfAidContent = (): JSX.Element => {
  const { grantOfAids, isLoadingGOL, isError } = useAppSelector((state) => state.grantOfAid)
  const { data } = grantOfAids || {}

  if (isLoadingGOL) {
    return (
      <>
        {/* We have a problem with [...Array(12)] because it gives a `key={i}` error */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i: number) => (
          <CardSkeleton key={i} />
        ))}
      </>
    )
  }

  if (isError) {
    return <ErrorMessage message="Something went wrong!" />
  }

  return (
    <>
      {data?.map((grant) => (
        <GrantofAidCard key={grant.id} {...{ grant }} />
      ))}
    </>
  )
}

const ErrorMessage = ({ message }: { message: string }): JSX.Element => {
  return (
    <div className="w-full rounded-md border border-rose-200 bg-rose-50 py-3 text-center">
      <span className="w-full font-medium text-rose-900">{message}</span>
    </div>
  )
}

export default GrantOfAidList
