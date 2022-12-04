import { useState } from 'react'
import ReactPaginate from 'react-paginate'

import CourtAppearanceAccordion from '../CourtAppearanceAccordion'
import { ICourtAppearance } from '~/shared/interfaces'

const CourtAppearancesList = ({
  courtAppearances
}: {
  courtAppearances: ICourtAppearance[]
}): JSX.Element => {
  const [pageNumber, setPageNumber] = useState<number>(0)

  const listPerPage = 5
  const pagesVisited = pageNumber * listPerPage

  const displayCourtAppearances = courtAppearances?.slice(pagesVisited, pagesVisited + listPerPage)

  const pageCount = Math.ceil(courtAppearances?.length / listPerPage)

  const handlePageChange = ({ selected }: { selected: number }): void => setPageNumber(selected)

  return (
    <>
      {displayCourtAppearances?.map((courtAppearance) => {
        return (
          <div key={courtAppearance?.id}>
            <CourtAppearanceAccordion courtAppearance={courtAppearance} />
          </div>
        )
      })}
      {pageCount > 1 && (
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
