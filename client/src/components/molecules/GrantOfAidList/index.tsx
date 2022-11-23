import ReactPaginate from 'react-paginate'
import React, { FC, useState } from 'react'

import GrantofAidCard from './../GrantOfAidCard'
import { grantOfAidData } from '~/shared/data/grantOfAidData'

type Props = {}

const GrantOfAidList: FC<Props> = (): JSX.Element => {
  const [pageNumber, setPageNumber] = useState(0)

  const listPerPage = 12
  const pagesVisited = pageNumber * listPerPage

  const displaygrantOfAids = grantOfAidData?.slice(pagesVisited, pagesVisited + listPerPage)

  const pageCount = Math.ceil(grantOfAidData?.length / listPerPage)

  const handlePageChange = ({ selected }: { selected: number }): void => setPageNumber(selected)

  return (
    <article className="flex flex-col justify-between  space-y-8">
      <main className="grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-2 xl:grid-cols-3">
        {displaygrantOfAids.map((grant) => (
          <GrantofAidCard key={grant.id} {...{ grant }} />
        ))}
      </main>
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
    </article>
  )
}

export default GrantOfAidList
