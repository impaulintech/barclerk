import React, { ReactNode, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Plus } from 'react-feather'

import MatterLayout from '~/components/templates/MatterLayout'
import BreedCrumb from '~/components/atoms/Breedcrumb'
import CourtAppearancesList from '~/components/molecules/CourtAppearanceList'
import AddNewCourtAppearanceModal from '~/components/molecules/CourtAppearanceList/AddNewCourtAppearance'
import { useAppDispatch } from '~/hooks/reduxSelector';
import { getAuthUser, reset } from '~/redux/auth/authSlice';

const CourtAppearances: NextPage = (): JSX.Element => {
  const dispatch = useAppDispatch() 

  useEffect(() => {
    dispatch(getAuthUser())
  }, [])
  
  return (
    <MatterLayout metaTitle="Court Appearances"> 
      <CourtAppearancesLayout>
        <BreedCrumb route="Court Appearances" />
        <CourtAppearancesHeader />
        <CourtAppearancesList />
      </CourtAppearancesLayout> 
    </MatterLayout>
  )
}

const CourtAppearancesLayout = ({ children }: { children: ReactNode }): JSX.Element => (
  <section className="mx-auto h-full w-full space-y-2 p-4 md:px-12 max-w-[90rem]">{children}</section>
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

export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default CourtAppearances
