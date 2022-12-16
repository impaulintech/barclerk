import { FC, useState } from 'react'
import { ChevronDown, Edit } from 'react-feather'
import moment from 'moment'

import EditCourtAppearanceModal from './EditCourtAppearanceModal'
import { ICourtAppearance } from '~/shared/interfaces/index'

type Props = {
  courtAppearance: ICourtAppearance
}

const CourtAppearanceAccordion: FC<Props> = ({ courtAppearance }) => {
  const [show, setShow] = useState<{id: number; show: boolean}>({ id: 0, show: false })
  const [showEditModal, setShowEditModal] = useState<boolean>(false)

  return (
    <>
      <div className="group hover:shadow-lg">
        <AccordionHeader
          setShowEditModal={setShowEditModal}
          courtAppearance={courtAppearance}
          show={show}
          setShow={setShow}
        />
        {show?.show === true && show?.id === courtAppearance?.id && (
          <AccordionBody orders={courtAppearance?.orders} notes={courtAppearance?.other_notes} />
        )}
      </div>
      <EditCourtAppearanceModal
        courtAppearance={courtAppearance}
        isOpen={showEditModal}
        closeModal={() => setShowEditModal(false)}
      />
    </>
  )
}

const AccordionHeader = ({
  courtAppearance,
  show,
  setShow,
  setShowEditModal
}: {
  courtAppearance: ICourtAppearance
  show: { id: number; show: boolean }
  setShow: ({id, show}: {id: number, show:boolean}) => void
  setShowEditModal: (value: boolean) => void
}): JSX.Element => {
  return (
    <div
      className={`mb-[2px] flex w-full justify-between ${
        !show?.show && 'rounded-sm'
      } rounded-t-sm bg-white py-3 pl-6 pr-5 text-sm shadow transition duration-150 ease-in-out`}
    >
      <div className="w-full grid grid-cols-5 space-x-5 overflow-hidden whitespace-nowrap px-2 text-xs">
        <div className="col-span-1 space-y-1 overflow-hidden">
          <div className='text-sm font-bold'>Date</div>
          <div className="font-extrabold text-barclerk-30 text-sm">{moment(courtAppearance?.date).format("D MMMM YYYY")}</div>
        </div>
        <div className="col-span-1 space-y-1 overflow-hidden">
          <div className="text-barclerk-10 text-sm font-semibold">Time</div>
          <div className=" text-barclerk-10 text-sm"> {courtAppearance?.time ? moment(`${courtAppearance?.date} ${courtAppearance?.time}`).format('hh:mm A') : "--:--"}</div>
        </div>
        <div className="col-span-1 space-y-1 overflow-hidden">
          <div className="text-barclerk-10 text-sm font-semibold">Court</div>
          <div className=" text-barclerk-10 text-sm">{courtAppearance?.court}</div>
        </div>
        <div className="col-span-1 space-y-1 overflow-hidden">
          <div className="text-barclerk-10 text-sm font-semibold">Judicial Officer</div>
          <div className=" text-barclerk-10 text-sm">{courtAppearance?.judicial_officer}</div>
        </div>
        <div className="col-span-1 space-y-1 overflow-hidden">
          <div className="text-sm font-bold">Next Court Date</div>
          <div className="font-extrabold text-barclerk-30 text-sm">{moment(courtAppearance?.next_court_date).format("D MMMM YYYY")}</div>
        </div>
      </div>
      <div className="flex items-center pl-4">
        <button onClick={() => setShowEditModal(true)} className="rounded p-2">
          <Edit className="h-5 w-5 font-light" />
        </button>

        <button
          onClick={
            show?.show
              ? () => setShow({ id: 0, show: false })
              : () => setShow({ id: courtAppearance?.id, show: true })
          }
          className={`rounded p-1 ${
            show?.id === courtAppearance?.id && show?.show && 'rotate-180'
          }`}
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

const AccordionBody = ({ orders, notes }: { orders?: string; notes?: string }): JSX.Element => {
  return (
    <div className="flex w-full justify-between space-x-10 rounded-b-sm bg-white py-3 pl-6 pr-14 pb-12 text-xs shadow transition duration-150 ease-in-out">
      <div className="flex w-1/2 flex-col space-y-2">
        <div className="text-sm font-medium text-slate-500">Orders</div>
        <div className="flex max-h-52 flex-1 overflow-y-auto rounded border border-slate-300 p-4 text-sm">
          {orders ? (
            <>
              {orders}
            </>
          ) : (
            <div className="flex w-full items-center justify-center font-semibold text-failed">
              No available data.
            </div>
          )}
        </div>
      </div>
      <div className="flex w-1/2 flex-col space-y-2">
        <div className="text-sm font-medium text-slate-500">Other notes</div>
        <div className="flex max-h-52 flex-1 overflow-y-auto rounded border border-slate-300 p-4 text-sm">
          {notes ? (
            <>
              <p>{notes}</p>
            </>
          ) : (
            <div className="flex w-full items-center justify-center font-semibold text-failed">
              No available data.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourtAppearanceAccordion
