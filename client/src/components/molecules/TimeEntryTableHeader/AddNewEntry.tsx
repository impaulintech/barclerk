import { useForm } from 'react-hook-form'
import { Dialog } from '@headlessui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import TextareaAutosize from 'react-textarea-autosize'
import React, { FC } from 'react'
import { Plus, X, Clipboard, FilePlus, Calendar, Code, Clock, DollarSign, Info } from 'react-feather'

import { useNewEntry } from '~/hooks/useNewEntry'
import { TimeEntryFormValues } from '~/shared/types'
import { Spinner } from '~/shared/icons/SpinnerIcon' 
import { EntryFormSchema } from '~/shared/validation'
import DialogBox from '~/components/templates/DialogBox'  

type Props = {
  isOpen: boolean
  closeModal: () => void
  editData?: { 
    description: string
    date: string
    extension: string 
    type: string
    code: string
    hoursUnit: number
    ratePerHour: number
    amount: number
  }
}

const AddNewEntry: FC<Props> = ({ isOpen, closeModal, editData }): JSX.Element => {  
  const {
    reset,
    setError,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TimeEntryFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(EntryFormSchema)
  })
  const { isLoading, handleAddNewEntry } = useNewEntry(closeModal, setError)
  const {description, date, extension, type, code, hoursUnit, ratePerHour, amount} = editData || {}
  
  return (
    <DialogBox isOpen={isOpen} closeModal={closeModal}>
      <Dialog.Panel className="w-full max-w-[812px] transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
        <form onSubmit={handleSubmit(handleAddNewEntry)}>
          {/* MODAL HEADER */}
          <header className="flex items-center justify-between space-x-2 border-b border-slate-300 py-4 px-5">
            <div className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span className="text-lg font-semibold">Add New Time Entry</span>
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
            {/* DESCRIPTION */}
            <section className="col-span-2">
              <label htmlFor="description" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  Description <span className="text-rose-500">*</span>
                </h2>
                <div className="group relative flex">
                  <span
                    className={`
                      absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                    group-focus-within:border-barclerk-30
                      ${errors?.description && 'border-rose-400 group-focus-within:border-rose-400'}
                    `}
                  >
                    < Info
                      className={`
                      h-5 w-5 text-slate-400 group-focus-within:text-barclerk-30
                      ${
                        errors?.description &&
                        'text-rose-400 group-focus-within:text-rose-400'
                      }
                    `}
                    />
                  </span>
                  <TextareaAutosize
                    id="description"
                    {...register('description')}
                    defaultValue={description}
                    disabled={isLoading}
                    className={`
                      min-h-[70px] w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30
                      focus:ring-barclerk-30 disabled:cursor-not-allowed disabled:opacity-50
                      ${
                        errors?.description &&
                        'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                      }
                    `}
                  />
                </div>
              </label>
              {errors?.description && <span className="error">{`${errors.description.message}`}</span>}
            </section> 
            {/* DATE */}
            <section className="col-span-2 md:col-span-1">
              <label htmlFor="date" className="flex flex-col space-y-1">
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
                      h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30
                      ${errors?.date && 'text-rose-400 group-focus-within:text-rose-400'}
                    `}
                    />
                  </span>
                  <input
                    type="date"
                    id="date"
                    placeholder='make this dropdown'
                    {...register('date')}
                    disabled={isLoading}
                    defaultValue={date}
                    className={`
                      w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                      disabled:cursor-not-allowed disabled:opacity-50
                      ${
                        errors?.date &&
                        'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                      }
                    `}
                  />
                </div>
              </label>
              {errors?.date && (
                <span className="error">{`${errors.date.message}`}</span>
              )}
            </section>
            {/* EXTENSION */}
            <section className="col-span-2 md:col-span-1">
              <label htmlFor="extension" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  Extension <span className="text-rose-500">*</span>
                </h2>
                <div className="group relative">
                  <span
                    className={`
                      absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                    group-focus-within:border-barclerk-30
                      ${errors?.extension && 'border-rose-400 group-focus-within:border-rose-400'}
                    `}
                  >
                    <FilePlus
                      className={`
                      h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30
                      ${errors?.extension && 'text-rose-400 group-focus-within:text-rose-400'}
                    `}
                    />
                  </span>
                  <input
                    type="text"
                    id="extension"
                    {...register('extension')}
                    disabled={isLoading}
                    defaultValue={extension}
                    className={`
                      w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                      disabled:cursor-not-allowed disabled:opacity-50
                      ${
                        errors?.extension && 'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                      }
                    `}
                  />
                </div>
              </label>
              {errors?.extension && <span className="error">{`${errors.extension.message}`}</span>}
            </section>
            {/* TYPE */}
            <section className="col-span-2 md:col-span-1">
              <label htmlFor="phone" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  Type <span className="text-rose-500">*</span>
                </h2>
                <div className="group relative">
                  <span
                    className={`
                      absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                    group-focus-within:border-barclerk-30
                      ${
                        errors?.type && 'border-rose-400 group-focus-within:border-rose-400'
                      }
                    `}
                  >
                    <Clipboard
                      className={`
                      h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30
                      ${errors?.type && 'text-rose-400 group-focus-within:text-rose-400'}
                    `}
                    />
                  </span>
                  <input
                    type="text"
                    id="phone"
                    {...register('type')}
                    disabled={isLoading}
                    defaultValue={type}
                    className={`
                      w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                      disabled:cursor-not-allowed disabled:opacity-50
                      ${
                        errors?.type &&
                        'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                      }
                    `}
                  />
                </div>
              </label>
              {errors?.type && (
                <span className="error">{`${errors.type.message}`}</span>
              )}
            </section>
            {/* CODE */}
            <section className="col-span-2 md:col-span-1">
              <label htmlFor="code" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  Code <span className="text-rose-500">*</span>
                </h2>
                <div className="group relative">
                  <span
                    className={`
                      absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                    group-focus-within:border-barclerk-30
                      ${
                        errors?.code &&
                        'border-rose-400 group-focus-within:border-rose-400'
                      }
                    `}
                  >
                    <Code
                      className={`
                      h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30
                      ${errors?.code && 'text-rose-400 group-focus-within:text-rose-400'}
                    `}
                    />
                  </span>
                  <input
                    type="text"
                    id="code"
                    {...register('code')}
                    disabled={isLoading}
                    defaultValue={code}
                    className={`
                      w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                      disabled:cursor-not-allowed disabled:opacity-50
                      ${
                        errors?.code &&
                        'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                      }
                    `}
                  />
                </div>
              </label>
              {errors?.code && (
                <span className="error">{`${errors.code.message}`}</span>
              )}
            </section>
            {/* HOURS/UNIT */}
            <section className="col-span-2 md:col-span-1">
              <label htmlFor="hoursUnit" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  Hours / Unit <span className="text-rose-500">*</span>
                </h2>
                <div className="group relative">
                  <span className="absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 group-focus-within:border-barclerk-30">
                    <Clock className="h-5 w-5 text-slate-400 group-focus-within:text-barclerk-30" />
                  </span>
                  <input
                    type="number"
                    id="hoursUnit"
                    {...register('hoursUnit')}
                    disabled={isLoading}
                    defaultValue={hoursUnit}
                    className="w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </label>
              {errors?.hoursUnit && (
                <span className="error">{`${errors.hoursUnit.message}`}</span>
              )}
            </section>
            {/* RATE PER HOUR */}
            <section className="col-span-2 md:col-span-1">
              <label htmlFor="ratePerHour" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  Rate per hour  
                </h2>
                <div className="group relative">
                  <span
                    className={`
                      absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                    group-focus-within:border-barclerk-30 
                    `}
                  >
                    <DollarSign
                      className={`
                      h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30 
                    `}
                    />
                  </span>
                  <input
                    type="text"
                    id="ratePerHour"
                    {...register('ratePerHour')}
                    disabled={isLoading}
                    defaultValue={ratePerHour}
                    className={`
                      w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                      disabled:cursor-not-allowed disabled:opacity-50 
                    `}
                  />
                </div>
              </label> 
            </section>
            {/* AMOUNT */}
            <section className="col-span-2">
              <label htmlFor="amount" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  Amount  
                </h2>
                <div className="group relative">
                  <span
                    className={`
                      absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                    group-focus-within:border-barclerk-30 
                    `}
                  >
                    <DollarSign
                      className={`
                      h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30 
                    `}
                    />
                  </span>
                  <input
                    type="text"
                    id="amount"
                    {...register('amount')}
                    disabled={isLoading}
                    defaultValue={amount}
                    className={`
                      w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                      disabled:cursor-not-allowed disabled:opacity-50 
                    `}
                  />
                </div>
              </label> 
            </section>
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

export default AddNewEntry
