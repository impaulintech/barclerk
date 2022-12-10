import { useEffect } from 'react'
import ReactPaginate from 'react-paginate'

import CourtAppearanceAccordion from '../CourtAppearanceAccordion'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { fetchClientCourtAppearances } from '~/redux/court-appearance/courtAppearanceSlice'
import { useRouter } from 'next/router'

export interface ICourtAppearancesPayload {
  clientId: number
  page?: number
}

const CourtAppearancesList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { query } = useRouter()

  const { courtAppearances } = useAppSelector((state) => state.courtAppearance) || {}

  const getCourtAppearances = async (payload: ICourtAppearancesPayload) => {
    await dispatch(fetchClientCourtAppearances(payload))
  }
  useEffect(() => {
    getCourtAppearances({ clientId: Number(query?.id) })
  }, [query])

  const courtAppearancesList = courtAppearances?.data
  const pageCount = courtAppearances?.meta?.last_page

  const handlePageChange = async ({ selected }: { selected: number }) => {
    await dispatch(fetchClientCourtAppearances({ clientId: Number(query?.id), page: selected + 1 }))
  }

  return (
    <>
      {courtAppearancesList?.map((courtAppearance: any) => {
        return (
          <div key={courtAppearance?.id}>
            <CourtAppearanceAccordion courtAppearance={courtAppearance} />
          </div>
        )
      })}
      {pageCount && pageCount > 1 && (
        <section className="paginate-section text-gray-500">
          <ReactPaginate
            previousLabel="Prev"
            nextLabel="Next"
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName="inline-flex -space-x-px text-sm"
            previousLinkClassName="paginate-link rounded-l-md"
            pageLinkClassName="paginate-link"
            activeClassName="paginate-link-active"
            nextLinkClassName="paginate-link rounded-r-md"
          />
        </section>
      )}
    </>
  )
}

export default CourtAppearancesList
