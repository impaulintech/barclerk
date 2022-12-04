import { FC } from 'react'
import ReactPaginate from 'react-paginate'

import { PER_PAGE } from '~/utils/constants'
// import { getTimeEntries, reset } from '~/redux/time-entries/timeEntriesSlice'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'

type SelectedPageItem = { selected: number }

const Pagination: FC = (): JSX.Element => {
  // const { timeEntries } = useAppSelector((state) => state.timeEntry)
  // const { total } = timeEntries?.meta || {}
  // const pageCount = Math.ceil((total as number) / PER_PAGE)
  // const dispatch = useAppDispatch()

  const pageCount = 5;

  const handlePageChange = async ({ selected }: SelectedPageItem) => {
    // await dispatch(getTimeEntries({ page: selected + 1 }))
    // reset()
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
