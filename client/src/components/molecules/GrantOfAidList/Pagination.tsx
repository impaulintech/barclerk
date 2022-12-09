import { FC } from 'react'
import { useRouter } from 'next/router'
import ReactPaginate from 'react-paginate'

import { PER_PAGE } from '~/utils/constants'
import { getGrandOfAids, reset } from '~/redux/grant-of-aid/grantOfAidSlice'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'

type SelectedPageItem = { selected: number }

const Pagination: FC = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query

  const { grantOfAids } = useAppSelector((state) => state.grantOfAid)
  const { total } = grantOfAids?.meta || {}
  const pageCount = Math.ceil((total as number) / PER_PAGE)
  const dispatch = useAppDispatch()

  const handlePageChange = async ({ selected }: SelectedPageItem) => {
    await dispatch(
      getGrandOfAids({
        client_id: id,
        page: selected + 1
      })
    )
    reset()
  }

  return (
    <>
      {pageCount > 1 ? (
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
      ) : null}
    </>
  )
}

export default Pagination
