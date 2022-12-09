import React from 'react'
import { NextPage } from 'next'

import Breedcrumb from '~/components/atoms/Breedcrumb'
import MatterLayout from '~/components/templates/MatterLayout'
import TimeEntriesTable from '~/components/molecules/TimeEntriesTable'
import Pagination from '~/components/molecules/TimeEntriesTable/Pagination'
import TimeEntryTableHeader from '~/components/molecules/TimeEntryTableHeader' 

const TimeEntries:NextPage = (): JSX.Element => { 
  return ( 
    <MatterLayout metaTitle="Time Entries"> 
    <section className="mx-auto h-screen min-h-screen w-full max-w-[90rem] px-4 py-4 md:px-12">
      <Breedcrumb route="Time Entries" />
      <main className="mt-4 flex h-full w-full max-w-[100rem] flex-col justify-between overflow-hidden pb-24 pt-5">
        <TimeEntryTableHeader />
        <article
          className={`
          h-full rounded-b-md border-x border-b border-slate-300 bg-white
          shadow overflow-x-scroll scrollbar-thin scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md z-10
        `}
        >
          <TimeEntriesTable />
        </article>
        <footer className="mt-3 flex items-center justify-center">
          <Pagination />
        </footer>
      </main>
    </section> 
    </MatterLayout>
  )
}
 

export default TimeEntries
export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
