import React, { ReactNode, useState } from 'react'
import { NextPage } from 'next'
import { Plus } from 'react-feather'

import MatterLayout from '~/components/templates/MatterLayout'
import BreedCrumb from '~/components/atoms/Breedcrumb'
import CourtAppearancesList from '~/components/molecules/CourtAppearanceList'
import AddNewCourtAppearanceModal from '~/components/molecules/CourtAppearanceList/AddNewCourtAppearance'

const CourtAppearances: NextPage = (): JSX.Element => {
  // sampleCourtAppearances JSON file
  const sampleCourtAppearances = [
    {
      id: 1,
      date: '2022-06-06',
      time: '11:11',
      court: 'District Court',
      judicialOfficer: 'Ayling',
      nextCourtDate: '2022-06-12',
      orders: `Home D granted, at Mum's address $10k Surety only to be signed by Mum and $5k personal undertaking. Not allowed to go within 500 ms of points of international or domestic departure.`,
      otherNotes:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime pariatur unde dolorum alias est fuga enim delectus ipsum beatae in asperiores sed magnam laudantium deleniti repellendus, eveniet rem itaque maiores at accusamus odit nesciunt voluptatibus, amet ducimus? Beatae maiores inventore eos blanditiis accusamus minima repellat animi rerum, dolore aliquid ipsam nam? Facilis odit dicta laborum quaerat beatae commodi. Adipisci temporibus tempore corporis delectus ab et voluptatibus ut distinctio excepturi! Iste sed rerum vero libero ipsa! Sunt quis ipsam soluta dolor omnis saepe fugiat officia voluptas suscipit est quam impedit eum, aspernatur labore incidunt. Perspiciatis repellendus consectetur incidunt, fugit in quasi voluptas aliquid laudantium cum quis necessitatibus expedita architecto atque excepturi temporibus id odio. Sequi, quas quia! Aperiam saepe provident vitae?'
    },
    {
      id: 2,
      date: '2022-06-06',
      time: '11:11',
      court: 'District Court',
      judicialOfficer: 'Ayling',
      nextCourtDate: '2022-06-12',
      orders: 'Home D Report.',
      otherNotes: ''
    },
    {
      id: 3,
      date: '2022-06-06',
      time: '11:11',
      court: 'District Court',
      judicialOfficer: 'Ayling',
      nextCourtDate: '2022-06-12',
      orders: 'Home D Report.',
      otherNotes: ''
    },
    {
      id: 4,
      date: '2022-06-06',
      time: '11:11',
      court: 'District Court',
      judicialOfficer: 'Ayling',
      nextCourtDate: '2022-06-12',
      orders: 'Home D Report.',
      otherNotes: ''
    },
    {
      id: 5,
      date: '2022-06-06',
      time: '11:11',
      court: 'District Court',
      judicialOfficer: 'Ayling',
      nextCourtDate: '2022-06-12',
      orders: 'Home D Report.',
      otherNotes: ''
    },
    {
      id: 6,
      date: '2022-06-06',
      time: '11:11',
      court: 'District Court',
      judicialOfficer: 'Ayling',
      nextCourtDate: '2022-06-12',
      orders: 'Home D Report.',
      otherNotes: ''
    },
    {
      id: 7,
      date: '2022-06-06',
      time: '11:11',
      court: 'District Court',
      judicialOfficer: 'Ayling',
      nextCourtDate: '2022-06-12',
      orders: 'Home D Report.',
      otherNotes: ''
    }
  ]

  return (
    <MatterLayout metaTitle="Court Appearances">
      <CourtAppearancesLayout>
        <BreedCrumb route="Court Appearances" />
        <CourtAppearancesHeader />
        <CourtAppearancesList courtAppearances={sampleCourtAppearances} />
      </CourtAppearancesLayout>
    </MatterLayout>
  )
}

const CourtAppearancesLayout = ({ children }: { children: ReactNode }): JSX.Element => (
  <section className="mx-auto h-full w-full space-y-2 p-4 md:px-12">{children}</section>
)

const CourtAppearancesHeader = (): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <div className="flex items-center justify-between py-4 md:py-6">
      <h1 className="text-xl font-semibold text-barclerk-10 lg:text-2xl">Court Appearances</h1>
      <div className="flex flex-wrap items-center space-x-5">
        <button
          type="button"
          className={`
            flex cursor-pointer items-center space-x-1 rounded border border-barclerk-10 bg-barclerk-10 px-2 py-[0.26rem] text-sm
          text-white shadow outline-none transition duration-150 ease-in-out focus:bg-barclerk-10 hover:bg-barclerk-10 hover:bg-barclerk-10/90
            active:scale-95 active:bg-barclerk-10
          `}
          title="Add New Matter"
          onClick={() => setShowModal(true)}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden md:block">Add New Data</span>
        </button>
        <AddNewCourtAppearanceModal isOpen={showModal} closeModal={() => setShowModal(false)} />
      </div>
    </div>
  )
}

export default CourtAppearances
