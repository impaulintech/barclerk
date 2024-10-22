import { NextPage } from 'next'
import { Plus } from 'react-feather'
import React, { ReactNode, useEffect, useState } from 'react'

import Breedcrumb from '~/components/atoms/Breedcrumb'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import MatterLayout from '~/components/templates/MatterLayout'
import GrantOfAidList from '~/components/molecules/GrantOfAidList'
import AddNewGrantOfAidModal from '~/components/molecules/GrantOfAidList/AddNewGrantOfAidModal'
import { getAuthUser } from '~/redux/auth/authSlice';

const GrantOfAid: NextPage = (): JSX.Element => {
  const dispatch = useAppDispatch() 

  useEffect(() => {
    dispatch(getAuthUser())
  }, [])
  
  return (
    <MatterLayout metaTitle="Grant Of Aid">
      <GrantOfAidLayout>
        <Breedcrumb route="Grant Of Aid" />
        <GrantOfAidHeader />
        <GrantOfAidList />
      </GrantOfAidLayout>
    </MatterLayout>
  )
}

const GrantOfAidLayout = ({ children }: { children: ReactNode }): JSX.Element => (
  <section className="mx-auto w-full max-w-[90rem] px-4 py-4 md:px-12">{children}</section>
)

const GrantOfAidHeader = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { grantOfAids } = useAppSelector((state) => state.grantOfAid)

  const closeModal = (): void => setIsOpen(!isOpen)

  return (
    <div className="flex items-center justify-between py-4 md:py-6">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold text-barclerk-10 lg:text-2xl">Grant of Aid</h1>
        {!!grantOfAids?.data.length ? (
          <span className="flex flex-shrink-0 items-center justify-center rounded-full border border-amber-300 bg-amber-50 p-1 text-xs font-bold text-amber-600 hover:shadow-xl">
            {grantOfAids?.meta.total}
          </span>
        ) : null}
      </div>
      <button
        type="button"
        className={`
          flex cursor-pointer items-center space-x-1 rounded border border-barclerk-10 bg-barclerk-10 px-3 py-1.5 text-sm
        text-white shadow outline-none transition duration-150 ease-in-out focus:bg-barclerk-10 hover:bg-barclerk-10 hover:bg-barclerk-10/90
          active:scale-95 active:bg-barclerk-10
        `}
        onClick={closeModal}
        title="Add New Matter"
      >
        <Plus className="h-4 w-4" />
        <span className="hidden md:block">Add New Grant</span>
      </button>
      <AddNewGrantOfAidModal
        {...{
          isOpen,
          closeModal
        }}
      />
    </div>
  )
}

export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default GrantOfAid
