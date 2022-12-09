import { FC } from 'react'
import ReactPaginate from 'react-paginate'

import { PER_PAGE } from '~/utils/constants' 
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { getTimeEntries, reset } from '~/redux/time-entry/timeEntrySlice';
import { useRouter } from 'next/router';

type SelectedPageItem = { selected: number }

const Pagination: FC = (): JSX.Element => {
  const { query } = useRouter()
  const clientID = Number(query?.id)

  const { timeEntries } = useAppSelector((state) => state.timeEntry)
  const { total } = timeEntries?.meta || {}
  const pageCount = Math.ceil(((total as number) / 9) || 0)
  const dispatch = useAppDispatch() 
  
  const handlePageChange = async ({ selected }: SelectedPageItem) => {
    const pageCount = selected + 1
    dispatch(getTimeEntries({ clientID, pageCount })) 
  }

  return (
    <section className="paginate-section text-gray-500">
      <ReactPaginate
        previousLabel="Prev"
        nextLabel="Next"
        pageCount={pageCount}
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        containerClassName="inline-flex -space-x-px text-sm"
        previousLinkClassName="paginate-link rounded-l-md"
        pageLinkClassName="paginate-link"
        activeClassName="paginate-link-active"
        nextLinkClassName="paginate-link rounded-r-md"
      />
    </section>
  )
}

export default Pagination
