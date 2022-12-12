import { useForm } from 'react-hook-form'
import { Dialog } from '@headlessui/react'
import React, { FC, useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import { yupResolver } from '@hookform/resolvers/yup'
import { Calendar, Clock, Edit, Plus, User, X } from 'react-feather'

import { Spinner } from '~/shared/icons/SpinnerIcon'
import { ICourtAppearance } from '~/shared/interfaces'
import DialogBox from '~/components/templates/DialogBox'
import { CourtAppearanceSchema } from '~/shared/validation'
import { CourtAppearanceFormValues } from '~/shared/types'
import CourtChargesIcon from '~/shared/icons/CourtChargeIcon'
import { useCourtAppearance } from '~/hooks/useCourtAppearance'

type Props = {
  courtAppearance: ICourtAppearance
  isOpen: boolean
  closeModal: () => void
}

const EditCourtAppearanceModal: FC<Props> = ({
  courtAppearance,
  isOpen,
  closeModal
}): JSX.Element => {
  const {
    reset,
    register,
    setError,
    formState: { errors },
    handleSubmit
  } = useForm<CourtAppearanceFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(CourtAppearanceSchema)
  })

  useEffect(() => {
    if (isOpen) {
      reset({
        id: courtAppearance?.id,
        date: courtAppearance?.date,
        next_court_date: courtAppearance?.next_court_date,
        time: courtAppearance?.time,
        court: courtAppearance?.court,
        judicial_officer: courtAppearance?.judicial_officer,
        orders: courtAppearance?.orders,
        other_notes: courtAppearance?.other_notes
      })
    }
  }, [isOpen])

  const { isLoading, handleEditCourtAppearance } = useCourtAppearance(closeModal, setError)

  return (
    <DialogBox isOpen={isOpen} closeModal={closeModal}>
      <Dialog.Panel className="w-full max-w-[812px] transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
        <form onSubmit={handleSubmit(handleEditCourtAppearance)}>
          {/* MODAL HEADER */}
          <header className="flex items-center justify-between space-x-2 border-b border-slate-300 py-4 px-5">
            <div className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span className="text-lg font-semibold">Edit Court Appearances</span>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-md p-0.5 outline-none transition duration-75 ease-in-out hover:bg-slate-100 active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>
          </header>
          {/* MODAL FORM CONTENT */}
          <main className="grid grid-cols-2 gap-x-3 gap-y-2 px-8 py-6 pb-10 md:gap-x-5 md:gap-y-4">
            {/* DATE FIELD */}
            <section className="col-span-1">
              <label htmlFor="court_appearance_date" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  Date <span className="text-rose-500">*</span>
                </h2>
                <div className="group relative">
                  <span
                    className={`
                    absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                  group-focus-within:border-barclerk-30
                  ${errors?.date && 'border-rose-400 group-focus-within:border-rose-400'}
                  `}
                  >
                    <Calendar
                      className={`
                    h-5 w-5 text-slate-300  group-focus-within:text-barclerk-30
                  
                  `}
                    />
                  </span>
                  <input
                    type="date"
                    {...register('date')}
                    id="court_appearance_date"
                    disabled={isLoading}
                    className={`
                    w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                    disabled:cursor-not-allowed disabled:opacity-50
                    ${errors?.date && 'border-rose-400 focus:border-rose-400 focus:ring-rose-400'}
                  `}
                  />
                </div>
              </label>
              {errors?.date && <span className="error">{`${errors.date.message}`}</span>}
            </section>
            {/* NEXT COURT DATE FIELD */}
            <section className="col-span-1">
              <label htmlFor="court_appearance_next_court_date" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  Next court date <span className="text-rose-500">*</span>
                </h2>
                <div className="group relative">
                  <span
                    className={`
                    absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                  group-focus-within:border-barclerk-30
                  ${errors?.next_court_date && 'border-rose-400 group-focus-within:border-rose-400'}
                  `}
                  >
                    <Calendar
                      className={`
                    h-5 w-5 text-slate-300  group-focus-within:text-barclerk-30
                    ${errors?.next_court_date && 'text-rose-400 group-focus-within:text-rose-400'}
                  `}
                    />
                  </span>
                  <input
                    type="date"
                    {...register('next_court_date')}
                    id="court_appearance_next_court_date"
                    disabled={isLoading}
                    className={`
                    w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                    disabled:cursor-not-allowed disabled:opacity-50
                    ${
                      errors?.next_court_date &&
                      'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                    }
                  `}
                  />
                </div>
              </label>
              {errors?.next_court_date && (
                <span className="error">{`${errors.next_court_date.message}`}</span>
              )}
            </section>
            {/* TIME FIELD */}
            <section className="col-span-1">
              <label htmlFor="court_appearance_time" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  TIME <span className="text-rose-500">*</span>
                </h2>
                <div className="group relative">
                  <span
                    className={`
                    absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                  group-focus-within:border-barclerk-30
                  ${errors?.time && 'border-rose-400 group-focus-within:border-rose-400'}
                    
                  `}
                  >
                    <Clock
                      className={`
                    h-5 w-5 text-slate-300  group-focus-within:text-barclerk-30
                    ${errors?.time && 'text-rose-400 group-focus-within:text-rose-400'}
                  
                  `}
                    />
                  </span>
                  <input
                    type="time"
                    {...register('time')}
                    id="court_appearance_time"
                    disabled={isLoading}
                    className={`
                    w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                    disabled:cursor-not-allowed disabled:opacity-50
                    
                  `}
                  />
                </div>
              </label>
              {errors?.time && <span className="error">{`${errors.time.message}`}</span>}
            </section>
            {/* COURT FIELD */}
            <section className="col-span-1">
              <label htmlFor="court_appearance_court" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">Court</h2>
                <div className="group relative">
                  <span
                    className={`
                    absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                  group-focus-within:border-barclerk-30
                    
                  `}
                  >
                    <HiOutlineOfficeBuilding
                      className={`
                    h-5 w-5 text-slate-300  group-focus-within:text-barclerk-30
                  
                  `}
                    />
                  </span>
                  <input
                    type="text"
                    {...register('court')}
                    id="court_appearance_court"
                    disabled={isLoading}
                    className={`
                    w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                    disabled:cursor-not-allowed disabled:opacity-50
                  `}
                  />
                </div>
              </label>
            </section>
            {/* JUDICIAL OFFICER FIELD */}
            <section className="col-span-2">
              <label htmlFor="court_appearance_officer" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">Judicial Officer</h2>
                <div className="group relative">
                  <span
                    className={`
                    absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                  group-focus-within:border-barclerk-30
                 
                    
                  `}
                  >
                    <User
                      className={`
                    h-5 w-5 text-slate-300  group-focus-within:text-barclerk-30
                  
                  `}
                    />
                  </span>
                  <input
                    type="text"
                    {...register('judicial_officer')}
                    id="court_appearance_officer"
                    disabled={isLoading}
                    className={`
                    w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                    disabled:cursor-not-allowed disabled:opacity-50
                    
                  `}
                  />
                </div>
              </label>
            </section>
            {/* ORDERS FIELD */}
            <section className="col-span-2">
              <label htmlFor="court_appearance_orders" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">Orders</h2>
                <div className="group relative flex">
                  <span
                    className={`
                    absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                  group-focus-within:border-barclerk-30 

                  `}
                  >
                    <CourtChargesIcon
                      className={`
                    h-5 w-5 fill-current text-slate-300 group-focus-within:text-barclerk-30
                  
                  `}
                    />
                  </span>
                  <TextareaAutosize
                    {...register('orders')}
                    id="court_appearance_orders"
                    disabled={isLoading}
                    maxLength={255}
                    className={`
                    min-h-[70px] w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30
                    focus:ring-barclerk-30 disabled:cursor-not-allowed disabled:opacity-50

                  `}
                  />
                </div>
              </label>
            </section>
            {/* OTHER NOTES FIELD */}
            <section className="col-span-2">
              <label htmlFor="court_appearance_notes" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">Other Notes</h2>
                <div className="group relative flex">
                  <span
                    className={`
                    absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                  group-focus-within:border-barclerk-30
                  `}
                  >
                    <Edit
                      className={`
                    h-5 w-5 text-slate-300 group-focus-within:text-barclerk-30
                  
                  `}
                    />
                  </span>
                  <TextareaAutosize
                    {...register('other_notes')}
                    id="court_appearance_notes"
                    disabled={isLoading}
                    maxLength={255}
                    className={`
                    min-h-[70px] w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30
                    focus:ring-barclerk-30 disabled:cursor-not-allowed disabled:opacity-50
                  `}
                  />
                </div>
              </label>
            </section>
            <input type="hidden" {...register('id')} />
          </main>
          {/* MODAL FOOTER SUBMIT AND CANCEL BUTTON */}
          <footer className="flex justify-end space-x-3 border-t border-slate-300 bg-slate-50 py-4 px-4">
            <button
              type="button"
              onClick={closeModal}
              disabled={isLoading}
              className={`
              w-36 rounded border border-slate-300 bg-white 
            text-slate-600 outline-none transition duration-75 ease-in-out
              disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-400 hover:bg-white
            hover:text-slate-700 active:scale-95 disabled:active:scale-100
            `}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`
              flex w-36 items-center justify-center rounded bg-barclerk-10 py-2 text-white 
              outline-none transition duration-75 ease-in-out focus:bg-barclerk-10/90 disabled:cursor-not-allowed disabled:opacity-50
              hover:bg-barclerk-10/90 disabled:hover:bg-barclerk-10 active:scale-95 disabled:active:scale-100
            `}
            >
              {isLoading ? <Spinner className="h-6 w-6" /> : 'Save'}
            </button>
          </footer>
        </form>
      </Dialog.Panel>
    </DialogBox>
  )
}

export default EditCourtAppearanceModal
