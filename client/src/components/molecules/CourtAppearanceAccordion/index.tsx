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
          <AccordionBody orders={courtAppearance?.orders} notes={courtAppearance?.otherNotes} />
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
      <div className="flex space-x-16 overflow-hidden whitespace-nowrap px-2 text-xs">
        <div className="flex flex-col space-y-1">
          <div>Date</div>
          <div className="font-extrabold text-barclerk-30">{moment(courtAppearance?.date).format("D MMMM YYYY")}</div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="text-slate-500">Time</div>
          <div className=" text-barclerk-10">{moment(`${courtAppearance?.date} ${courtAppearance?.time}`).format('hh:mm A')}</div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="text-slate-500">Court</div>
          <div className=" text-barclerk-10">{courtAppearance?.court}</div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="text-slate-500">Judicial Officer</div>
          <div className=" text-barclerk-10">{courtAppearance?.judicialOfficer}</div>
        </div>
        <div className="flex flex-col space-y-1">
          <div>Next Court Date</div>
          <div className="font-extrabold text-barclerk-30">{moment(courtAppearance?.nextCourtDate).format("D MMMM YYYY")}</div>
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
        <div>Orders</div>
        <div className="flex max-h-52 flex-1 overflow-y-auto rounded border border-slate-300 p-4">
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
        <div>Other notes</div>
        <div className="flex max-h-52 flex-1 overflow-y-auto rounded font-semibold border border-slate-300 p-4">
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
