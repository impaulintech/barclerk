import React, { ReactNode, useState } from 'react'
import { NextPage } from 'next'

import MatterLayout from '~/components/templates/MatterLayout'
import ClientProfileCard from '~/components/molecules/ClientProfileCard'
import Breedcrumb from '~/components/atoms/Breedcrumb'
import { ChevronDown, FilePlus } from 'react-feather'

const ClientProfile: NextPage = (): JSX.Element => {
  // sampleClient JSON file
  const sampleClient = {
    id: 1,
    clientName: 'Damion Carlos Dixon',
    location: 'Hakea Prison Locked Bag 111 Canning Vale DC WA 6970',
    contribution: false,
    onBail: true,
    court: 'District Court',
    totalFundUpTo: 30.0,
    totalFundUsed: 13.4,
    remainingFund: 16.6,
    nextCourtDate: '26 October 2022',
    
    lastCourtDates: [
      {
        id: 1,
        date: '25 October 2022',
        orders: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      },
      {
        id: 2,
        date: '25 October 2022',
        orders:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus possimus sed, est nam corrupti quaerat molestiae? Deleniti quae, doloribus fugit fuga animi voluptatibus nobis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita at id reprehenderit beatae animi unde inventore itaque eveniet odio architecto quidem eum excepturi, assumenda dolore.'
      },
      {
        id: 3,
        date: '25 October 2022',
        orders:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus possimus sed, est nam corrupti quaerat molestiae? Deleniti quae, doloribus fugit fuga animi voluptatibus nobis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita at id reprehenderit beatae animi unde inventore itaque eveniet odio architecto quidem eum excepturi, assumenda dolore.'
      }
    ],
    charges: [
      {
        id: 1,
        name: 'False Name/Details'
      },
      {
        id: 2,
        name: 'Perjury'
      },
      {
        id: 3,
        name: 'Possesion Of Drugs With Intent To Sell/Supply Non Trafficable Quantities'
      },
      {
        id: 4,
        name: 'Selling Drugs Non Trafficable Quantities'
      },
      {
        id: 5,
        name: 'Selling Drugs Non Trafficable Quantities'
      },
      {
        id: 6,
        name: 'Selling Drugs Trafficable Quantities'
      },
      {
        id: 7,
        name: 'Unlawful Possession'
      }
    ]
  }

  return (
    <MatterLayout metaTitle="Grant Of Aid">
      <ClientProfileLayout>
        <Breedcrumb route="Client Profile" />
        <ClientProfileHeader />
        <ClientProfileCard clientProfile={sampleClient} />
      </ClientProfileLayout>
    </MatterLayout>
  )
}
const ClientProfileLayout = ({ children }: { children: ReactNode }): JSX.Element => (
  <section className="mx-auto h-full w-full p-4 md:px-12">{children}</section>
)

const ClientProfileHeader = (): JSX.Element => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const sampleExtension =  [
    {id: 1, extension: '22W005912/1'},
    {id: 2, extension: '22W005912/1'},
    {id: 3, extension: '22W005912/1'},
  ];

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
          <span className="text-barclerk-10">22W005912/1</span>{' '}
          <ChevronDown className="text-slate-600" />
        </div>

        {showDropdown && (
          <div className="absolute -bottom-1 max-h-32 w-full translate-y-full overflow-y-auto rounded-sm border border-slate-200 bg-barclerk-60 shadow-md">
            <ul>
              {sampleExtension?.map((extension) => {
                return (
                  <div key={extension?.id}>
                    <li className="p-2 hover:bg-barclerk-30">{extension?.extension}</li>
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
