import moment from 'moment'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

import SeeMore from '~/components/atoms/SeeMore'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import { useAppSelector } from '~/hooks/reduxSelector'

const ClientProfileCard: FC = (): JSX.Element => {
  const router = useRouter()

  const { clientProfile, singleClientExtension, isLoadingFunds } = useAppSelector(
    (state) => state.clientProfile
  )

  return (
    <div className="space-y-6 pb-1 sm:flex sm:space-y-0 sm:pb-6">
      {/* first half of the page */}
      <div className="mr-12 flex w-full flex-col space-y-6 text-barclerk-10 md:w-1/2">
        <div className="group flex w-full flex-col space-y-5 rounded-md bg-white px-6 pt-4 pb-6 text-sm shadow transition duration-150 ease-in-out hover:shadow-lg">
          <div className="text-xl font-semibold">{clientProfile?.client_name}</div>
          <div className="space-between flex w-full">
            <div className="flex flex-1 flex-col space-y-1">
              <div className="text-slate-500">Contribution</div>
              <div>{clientProfile?.contribution ? 'Yes' : 'No'}</div>
            </div>
            <div className="flex flex-1 flex-col space-y-1">
              <div className="text-slate-500">Bail</div>
              <div>{clientProfile?.pre_trial_restriction ? 'Yes' : 'No'}</div>
            </div>
            <div className="flex flex-1 flex-col space-y-1">
              <div className="text-slate-500">Court</div>
              <div>{clientProfile?.court || 'N/A'}</div>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="text-slate-500">Location</div>
            <div className="text-sm uppercase">
              {clientProfile &&
              clientProfile?.pre_trial_restriction_location_or_address.value == 'None'
                ? 'n/a'
                : clientProfile?.pre_trial_restriction_location_or_address.value == ''
                ? 'n/a'
                : clientProfile?.pre_trial_restriction_location_or_address.value}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-slate-500">Charges</div>
            <ul className="list-disc px-6 text-xs capitalize text-black">
              {clientProfile?.charges?.map((charge: { id: number; name: string }) => (
                <li key={charge.id}>{charge.name}</li>
              ))}
            </ul>
          </div>
        </div>
        {/* Funds */}
        <div className="flex flex-col space-y-2 rounded bg-white py-5 px-4 text-xs shadow-sm hover:shadow-lg lg:grid lg:grid-cols-3 lg:space-y-0 lg:p-0">
          <div className="flex items-center overflow-hidden lg:flex-col">
            <div className="flex w-full justify-start overflow-hidden whitespace-nowrap  font-semibold text-barclerk-20 lg:justify-center lg:rounded-tl lg:bg-barclerk-20 lg:p-3 lg:text-white">
              Total Fund &#40;up to&#41;
            </div>
            <div className="flex w-full justify-end text-base font-semibold text-barclerk-10 lg:justify-center lg:p-5 lg:text-xl">
              {isLoadingFunds ? (
                <LineSkeleton className="h-5 w-3/4" />
              ) : (
                <div className="flex justify-end lg:justify-center">
                  ${singleClientExtension?.total_fund || 0}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center overflow-hidden lg:flex-col">
            <div className="flex w-full justify-start overflow-hidden whitespace-nowrap  font-semibold text-barclerk-20 lg:justify-center lg:bg-barclerk-20 lg:p-3 lg:text-white">
              Total Fund Used
            </div>
            <div className="flex w-full justify-end text-base font-semibold text-success lg:justify-center lg:p-5 lg:text-xl">
              {isLoadingFunds ? (
                <LineSkeleton className="h-5 w-3/4" />
              ) : (
                <div className="flex justify-end lg:justify-center">
                  {singleClientExtension?.total_fund_used || 0}%
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center overflow-hidden lg:flex-col">
            <div className="flex w-full justify-start overflow-hidden whitespace-nowrap  font-semibold text-barclerk-20 lg:justify-center lg:rounded-tr lg:bg-barclerk-20 lg:p-3 lg:text-white">
              Remaining Fund
            </div>
            <div className="flex w-full justify-end text-base font-semibold lg:justify-center lg:p-5 lg:text-xl">
              {isLoadingFunds ? (
                <LineSkeleton className="h-5 w-3/4" />
              ) : (
                <div className="flex justify-end lg:justify-center">
                  ${singleClientExtension?.remaining_fund || 0}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expenses */}
        <div className="flex flex-col space-y-2 rounded bg-white py-5 px-4 text-xs shadow-sm hover:shadow-lg lg:grid lg:grid-cols-3 lg:space-y-0 lg:p-0">
          <div className="flex items-center overflow-hidden lg:flex-col">
            <div className="flex w-full justify-start overflow-hidden whitespace-nowrap  font-semibold text-barclerk-20 lg:justify-center lg:rounded-tl lg:bg-barclerk-20 lg:p-3 lg:text-white">
              Preparation
            </div>
            <div className="flex w-full justify-end text-base font-semibold text-barclerk-10 lg:justify-center lg:p-5 lg:text-xl">
              {isLoadingFunds ? (
                <LineSkeleton className="h-5 w-3/4" />
              ) : (
                <div className="flex justify-end lg:justify-center">
                  ${singleClientExtension?.preparation?.amount || 0}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center overflow-hidden lg:flex-col">
            <div className="flex w-full justify-start overflow-hidden whitespace-nowrap  font-semibold text-barclerk-20 lg:justify-center lg:bg-barclerk-20 lg:p-3 lg:text-white">
              Others
            </div>
            <div className="flex w-full justify-end text-base font-semibold lg:justify-center lg:p-5 lg:text-xl">
              {isLoadingFunds ? (
                <LineSkeleton className="h-5 w-3/4" />
              ) : (
                <div className="flex justify-end lg:justify-center">
                  ${singleClientExtension?.other_types || 0}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center overflow-hidden lg:flex-col">
            <div className="flex w-full justify-start overflow-hidden whitespace-nowrap  font-semibold text-barclerk-20 lg:justify-center lg:rounded-tr lg:bg-barclerk-20 lg:p-3 lg:text-white">
              Court Attendance
            </div>
            <div className="flex w-full justify-end text-base font-semibold lg:justify-center lg:p-5 lg:text-xl">
              {' '}
              {isLoadingFunds ? (
                <LineSkeleton className="h-5 w-3/4" />
              ) : (
                <div className="flex justify-end lg:justify-center">
                  ${singleClientExtension?.attendance || 0}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* second half of the page */}
      <div className="flex w-full flex-col space-y-6 md:w-1/2">
        <div className="group flex w-full items-center justify-between rounded-md bg-barclerk-20 px-6 py-4 text-sm text-white shadow transition duration-150 ease-in-out hover:shadow-lg">
          <div>Next Court Date:</div>
          <div className="text-base font-semibold">
            {clientProfile?.court_appearances && clientProfile?.court_appearances?.length > 0 ? (
              <>{moment(clientProfile?.court_appearances[0].date).format('D MMMM YYYY')}</>
            ) : (
              <>No data available.</>
            )}
          </div>
        </div>
        <div className="group flex w-full flex-col rounded-md bg-white py-3 text-sm shadow transition duration-150 ease-in-out hover:shadow-lg">
          <div className="w-full border-b border-slate-500 px-6 pb-3 font-medium">
            Last Court Dates
          </div>
          <ul className="py-2 px-6 text-slate-600">
            {clientProfile?.court_appearances && clientProfile?.court_appearances?.length > 0 ? (
              clientProfile?.court_appearances?.slice(0, 3).map((lastcourtdate) => {
                return (
                  <li key={lastcourtdate?.id} className="border-b border-slate-500 px-2 py-6">
                    <div className="flex">
                      <div className="mr-3 w-12">Date:</div>{' '}
                      <p className="flex flex-1 font-medium text-barclerk-10">
                        {lastcourtdate?.date}
                      </p>
                    </div>
                    <div className="flex">
                      <div className="mr-3 w-12">Orders:</div>
                      <div className="flex flex-col items-start">
                        <p className="font-medium text-barclerk-10">
                          <SeeMore text={lastcourtdate?.orders || ''} maxLength={200} />
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })
            ) : (
              <div className="flex justify-center pt-5">No data available.</div>
            )}
          </ul>

          {clientProfile?.court_appearances && clientProfile?.court_appearances?.length > 0 && (
            <div className="mt-5 mb-2 flex w-full justify-center text-xs font-medium">
              <button
                onClick={() => router.push(`/matter/${clientProfile?.id}/court-appearances`)}
                className="cursor-pointer"
              >
                {' '}
                View more
              </button>
            </div>
          )}
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default ClientProfileCard
