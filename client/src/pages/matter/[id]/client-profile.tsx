import React, { ReactNode, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import MatterLayout from '~/components/templates/MatterLayout'
import ClientProfileCard from '~/components/molecules/ClientProfileCard'
import Breedcrumb from '~/components/atoms/Breedcrumb'
import { ChevronDown, FilePlus } from 'react-feather'
import {
  reset,
  fetchClientProfile,
  fetchSingleClientExtension,
  fetchAllClientExtensions
} from '~/redux/client-profile/clientProfileSlice'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { IClientExtension } from '~/shared/interfaces'
import { CardSkeleton } from '~/components/molecules/ClientProfileCard/CardSkeleton'

interface IExtensionPayload {
  clientId: number
  grantId: number
}

interface IClientProfilePayload {
  clientId: number
}

const ClientProfile: NextPage = (): JSX.Element => {
  const { query } = useRouter()
  const [selectedGrantId, setSelectedGrantId] = useState<number | null>(null)
  const dispatch = useAppDispatch()

  const { allClientExtensions, isLoading } = useAppSelector((state) => state.clientProfile)

  const getClientProfileData = async (payload: IClientProfilePayload) => {
    await dispatch(fetchClientProfile(payload))
    await dispatch(fetchAllClientExtensions(payload))
  }

  const getSingleClientExtension = async (payload: IExtensionPayload) => {
    await dispatch(fetchSingleClientExtension(payload))
  }

  useEffect(() => {
    getClientProfileData({ clientId: Number(query.id) })
  }, [query.id])

  useEffect(() => {
    selectedGrantId &&
      getSingleClientExtension({ clientId: Number(query.id), grantId: selectedGrantId })
  }, [selectedGrantId])

  useEffect(() => {
    if (allClientExtensions && allClientExtensions?.length > 0) {
      setSelectedGrantId(allClientExtensions[0].id)
    } else {
      dispatch(reset())
    }
  }, [allClientExtensions])

  return (
    <MatterLayout metaTitle="Grant Of Aid">
      <ClientProfileLayout>
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <>
            <Breedcrumb route="Client Profile" />
            <ClientProfileHeader
              allClientExtensions={allClientExtensions}
              selectedGrantId={selectedGrantId}
              setSelectedGrantId={setSelectedGrantId}
            />
            <ClientProfileCard />
          </>
        )}
      </ClientProfileLayout>
    </MatterLayout>
  )
}

const ClientProfileLayout = ({ children }: { children: ReactNode }): JSX.Element => (
  <section className="mx-auto h-full w-full p-4 md:px-12">{children}</section>
)

const ClientProfileHeader = ({
  allClientExtensions,
  selectedGrantId,
  setSelectedGrantId
}: {
  allClientExtensions: IClientExtension[] | null
  selectedGrantId: number | null
  setSelectedGrantId: (id: number) => void
}): JSX.Element => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  const handleClick = (extension_id: number) => {
    setSelectedGrantId(extension_id)
    setShowDropdown(false)
  }

  return (
    <div className="flex items-center justify-between py-4 md:py-6">
      <h1 className="text-xl font-semibold text-barclerk-10 lg:text-2xl">Client Information</h1>
      <button
        type="button"
        className={`
          relative flex cursor-pointer items-center rounded border-2 border-slate-300  text-sm
         shadow outline-none transition duration-150 ease-in-out
         `}
        //  focus and hover styles for approval
        //  focus:bg-barclerk-10 hover:bg-barclerk-10 hover:bg-barclerk-10/90 active:scale-95 active:bg-barclerk-10
        title="Add New Matter"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-l-sm bg-barclerk-20 text-white">
          <FilePlus className="h-[18px] w-[18px] text-slate-300" />
        </div>
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center justify-center space-x-1 rounded-r bg-barclerk-60 px-3 py-1.5"
        >
          <span className="text-barclerk-10">
            {allClientExtensions && allClientExtensions?.length > 0
              ? [
                  allClientExtensions[0]?.extension,
                  selectedGrantId
                    ? allClientExtensions?.find((x: { id: number }) => x.id === selectedGrantId)?.id
                    : allClientExtensions[0]?.id
                ].join('/')
              : 'No data available.'}
          </span>{' '}
          <ChevronDown className="text-slate-600" />
        </div>

        {showDropdown && (
          <div className="absolute -bottom-1 max-h-32 w-full translate-y-full overflow-y-auto rounded-sm border border-slate-200 bg-barclerk-60 shadow-md">
            <ul>
              {allClientExtensions?.map((extension: IClientExtension) => {
                return (
                  <div key={extension?.id} onClick={() => handleClick(extension?.id)}>
                    <li className="p-2 hover:bg-barclerk-30">
                      {extension?.extension}/{extension?.id}
                    </li>
                  </div>
                )
              })}
            </ul>
          </div>
        )}
      </button>
    </div>
  )
}

export default ClientProfile
export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
