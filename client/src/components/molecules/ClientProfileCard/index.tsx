import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import SeeMore from '~/components/atoms/SeeMore';
import { IClientProfile } from '~/shared/interfaces/index';

type Props = {
  clientProfile: IClientProfile;
}

const ClientProfileCard: FC<Props> = ({ clientProfile }): JSX.Element => {
  const router = useRouter();

  return (
    <div className="space-y-6 pb-1 sm:flex sm:space-y-0 sm:pb-6">
      {/* first half of the page */}
      <div className="mr-12 flex w-full flex-col space-y-6 text-barclerk-10 md:w-1/2">
        <div className="group flex w-full flex-col space-y-5 rounded-md bg-white px-6 pt-4 pb-6 text-sm shadow transition duration-150 ease-in-out hover:shadow-lg">
          <div className="text-xl font-semibold">{clientProfile?.clientName}</div>
          <div className="space-between flex w-full">
            <div className="flex flex-1 flex-col space-y-1">
              <div className="text-slate-500">Contribution</div>
              <div>{clientProfile?.contribution ? 'Yes' : 'No'}</div>
            </div>
            <div className="flex flex-1 flex-col space-y-1">
              <div className="text-slate-500">Bail</div>
              <div>{clientProfile?.onBail ? 'Yes' : 'No'}</div>
            </div>
            <div className="flex flex-1 flex-col space-y-1">
              <div className="text-slate-500">Court</div>
              <div>{clientProfile?.court}</div>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="text-slate-500">Location</div>
            <div className="uppercase">{clientProfile?.location}</div>
          </div>
          <div className="space-y-1">
            <div className="text-slate-500">Charges</div>
            <ul className="list-disc px-6 text-black">
              {clientProfile?.charges?.map((charge) => {
                return <li key={charge.id}>{charge.name}</li>
              })}
            </ul>
          </div>
        </div>
        <div className="group flex w-full flex-col space-y-2 rounded-md bg-white px-6 py-4 text-sm shadow transition duration-150 ease-in-out hover:shadow-lg">
          <div className="flex w-full justify-between">
            <div>Total Fund &#40;up to&#41;</div>
            <div className="text-lg font-semibold">${clientProfile?.totalFundUpTo?.toFixed(2)}</div>
          </div>
          <div className="flex w-full justify-between">
            <div>Total Fund Used</div>
            <div className="text-lg font-semibold text-success">
              {clientProfile?.totalFundUpTo &&
                clientProfile?.remainingFund &&
                Math.round(
                  ((clientProfile?.totalFundUpTo - clientProfile?.remainingFund) /
                    clientProfile?.totalFundUpTo) *
                    100
                )}
              .00%
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div>Remaining Fund</div>
            <div className="text-lg font-semibold">${clientProfile?.remainingFund?.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* second half of the page */}
      <div className="flex w-full flex-col space-y-6 md:w-1/2">
        <div className="group flex w-full items-center justify-between rounded-md bg-barclerk-20 px-6 py-4 text-sm text-white shadow transition duration-150 ease-in-out hover:shadow-lg">
          <div>Next Court Date:</div>
          <div className="font-semibold">26 October 2022</div>
        </div>
        <div className="group flex w-full flex-col rounded-md bg-white py-3 text-sm shadow transition duration-150 ease-in-out hover:shadow-lg">
          <div className="w-full border-b border-slate-500 px-6 pb-3">Last Court Dates</div>
          <ul className="py-2 px-6 text-slate-600">
            {clientProfile?.lastCourtDates?.map((lastcourtdate) => {
              return (
                <li
                  key={lastcourtdate?.id}
                  className="space-y-1 border-b border-slate-500 px-2 py-6"
                >
                  <div className="flex">
                    <div className="mr-3 w-12">Date:</div>{' '}
                    <p className="flex flex-1 text-barclerk-10">{lastcourtdate?.date}</p>
                  </div>
                  <div className="flex">
                    <div className="mr-3 w-12">Orders:</div>
                    <div className="flex flex-col items-start">
                      <p className="font-semibold text-barclerk-10">
                        <SeeMore text={lastcourtdate?.orders} maxLength={200} />
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="mt-5 mb-2 flex w-full justify-center">
            <button
              onClick={() => router.push(`/matter/${clientProfile?.id}/court-appearances`)}
              className="cursor-pointer"
            >
              {' '}
              View more
            </button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default ClientProfileCard
