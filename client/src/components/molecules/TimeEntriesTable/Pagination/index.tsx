import { FC } from 'react'
import { useRouter } from 'next/router'
import ReactPaginate from 'react-paginate'
 
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { getTimeEntries, setCurrentPage } from '~/redux/time-entry/timeEntrySlice'

type SelectedPageItem = { selected: number }

const Pagination: FC = (): JSX.Element => {
  const { query } = useRouter()
  const clientID = Number(query?.id)

  const { timeEntries } = useAppSelector((state) => state.timeEntry)
  const { total } = timeEntries?.meta || {}
  const pageCount = Math.ceil(((total as number) / 9) || 0)
  const dispatch = useAppDispatch() 
  
  const handlePageChange = async ({ selected }: SelectedPageItem) => {
    const currentPage = selected + 1
    dispatch(getTimeEntries({ clientID, currentPage })) 
    dispatch(setCurrentPage(currentPage)) 
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
