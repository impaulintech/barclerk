import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChevronDown, FilePlus, Edit3 } from 'react-feather'
import React, { FC, ReactNode, useEffect, useState } from 'react'

import {
  reset,
  fetchClientProfile,
  fetchSingleClientExtension
} from '~/redux/client-profile/clientProfileSlice'
import { IClientExtension } from '~/shared/interfaces'
import Breedcrumb from '~/components/atoms/Breedcrumb'
import MatterLayout from '~/components/templates/MatterLayout'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import ClientProfileCard from '~/components/molecules/ClientProfileCard'
import { CardSkeleton } from '~/components/molecules/ClientProfileCard/CardSkeleton'
import EditMatterModal from '~/components/molecules/MainTableHeader/EditMatterModal'

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

  const { allClientExtensions, isLoadingClientProfile } = useAppSelector(
    (state) => state.clientProfile
  )

  const getClientProfileData = async (payload: IClientProfilePayload) => {
    await dispatch(fetchClientProfile(payload))
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
    <MatterLayout metaTitle="Client Profile">
      <ClientProfileLayout>
        {isLoadingClientProfile ? (
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
  <section className="mx-auto h-full w-full p-4 md:px-12 max-w-[90rem]">{children}</section>
)

type ClientProfileProps = {
  allClientExtensions: IClientExtension[] | null
  selectedGrantId: number | null
  setSelectedGrantId: (id: number) => void
}

const ClientProfileHeader: FC<ClientProfileProps> = (props): JSX.Element => {
  const { query } = useRouter()
  const { allClientExtensions, selectedGrantId, setSelectedGrantId } = props
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [isOpenEditMatter, setIsOpenEditMatter] = useState<boolean>(false)

  const handleClick = (extension_id: number): void => {
    setSelectedGrantId(extension_id)
    setShowDropdown(false)
  }

  const handleCloseEditMatter = (): void => setIsOpenEditMatter(!isOpenEditMatter)

  return (
    <div className="flex flex-wrap items-center justify-between py-4 md:py-6">
      <h1 className="text-xl font-semibold text-barclerk-10 lg:text-2xl">Client Information</h1>
      <div className="flex items-center space-x-4">
        <div>
          <button
            onClick={handleCloseEditMatter}
            className={`
              bg-hover flex items-center rounded border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 shadow outline-none
              transition duration-150 ease-in-out hover:bg-barclerk-20 hover:text-white active:scale-95
            `}
          >
            <Edit3 className="mr-2 h-4 w-4" />
            Edit Profile
          </button>
          {isOpenEditMatter ? (
            <EditMatterModal
              isOpen={isOpenEditMatter}
              closeModal={handleCloseEditMatter}
              matter_id={query.id}
            />
          ) : null}
        </div>
        <button
          type="button"
          className={`
            relative flex cursor-pointer items-center rounded border-2 border-slate-300  text-sm
            shadow outline-none transition duration-150 ease-in-out
          `}
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
                ? selectedGrantId &&
                  allClientExtensions?.find((x: { id: number }) => x.id === selectedGrantId)
                    ?.extension
                : 'No data available.'}
            </span>
            <ChevronDown className="text-slate-600" />
          </div>

          {showDropdown && (
            <div className="absolute -bottom-1 max-h-32 w-full translate-y-full overflow-y-auto rounded-sm border border-slate-200 bg-barclerk-60 shadow-md">
              <ul>
                {allClientExtensions?.map((extension: IClientExtension) => {
                  return (
                    <div key={extension?.id} onClick={() => handleClick(extension?.id)}>
                      <li className="p-2 hover:bg-barclerk-30">{extension?.extension}</li>
                    </div>
                  )
                })}
              </ul>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}

export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default ClientProfile
