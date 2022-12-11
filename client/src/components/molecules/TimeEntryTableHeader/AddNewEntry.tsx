import {
  Plus,
  X,
  Clipboard,
  FilePlus,
  Calendar,
  Code,
  Clock,
  DollarSign,
  Info,
  ChevronDown
} from 'react-feather'
import { useForm } from 'react-hook-form'
import { Dialog } from '@headlessui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import TextareaAutosize from 'react-textarea-autosize'
import React, { FC, useEffect, useState } from 'react'

import { useNewEntry } from '~/hooks/useNewEntry'
import { TimeEntryFormValues } from '~/shared/types'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import { EntryFormSchema } from '~/shared/validation'
import { useAppSelector } from '~/hooks/reduxSelector'
import DialogBox from '~/components/templates/DialogBox'

type Props = {
  isOpen: boolean
  closeModal: () => void
  editData?: { 
    date: string
    extension: string 
    type: string 
    grant_id: number 
    type_id: number
    hoursUnit: number
    ratePerHour: number
    amount: number
    timeEntryID?: number | undefined
    description: string
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
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = `${Number(today.getDate()) < 10 ? '0' : ''}${today.getDate()}`
  const dateToday = `${year}-${month}-${day}`

  const closeAllDropdown = () => {
    setExtensionDropdown(false)
    setTypeDropdown(false)
  }

  const { extensionList } = useAppSelector((state) => state.timeEntry)
  const latestExtension = extensionList?.length - 1 || 0

  const [extensionDropdown, setExtensionDropdown] = useState<boolean>(false)
  const [activeExtension, setActiveExtension] = useState<number>(0)
  const selectedExtension = extensionList && extensionList[activeExtension] || {};
  const { id: extensionID, extension } = selectedExtension; 
  const toggleExtension = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault()
    setExtensionDropdown(!extensionDropdown)  
    setTypeDropdown(false) 
  } 

  const [typeDropdown, setTypeDropdown] = useState<boolean>(false)
  const [activeType, setActiveType] = useState<number>(0)
  const typeList = extensionList[activeExtension]?.types || [];
  const selectedType = typeList[activeType] || {};
  const toggleType = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault()
    setExtensionDropdown(false)  
    setTypeDropdown(!typeDropdown)  
  } 

  const { id: typeID, rate: ratePerHour, type: typeString } = selectedType;
  const [hoursUnit, setHoursUnit] = useState<number>(0)
  const amount = Number(ratePerHour * hoursUnit) || 0;

  useEffect(()=>{
    editData 
      ? extensionList.map((extension:any, index:number)=>{
          if (extension?.id === editData?.grant_id) {
            setActiveExtension(index)
          }
        }) 
     : setActiveExtension(latestExtension) 

    editData 
      ? selectedExtension?.types?.map((type:any, index:number)=>{
        if (type?.id === editData?.type_id) {
          setActiveType(index) 
        }
      })
      : setActiveType(0)

    editData && setHoursUnit(editData?.hoursUnit)
  },[latestExtension, isOpen, editData])  
  
  const timeEntryID = editData?.timeEntryID;
  const { isLoading, handleAddNewEntry } = useNewEntry(
    closeAllDropdown, 
    closeModal, 
    extensionID, 
    typeID, 
    amount, 
    timeEntryID
  )
  
  return (
    <DialogBox isOpen={isOpen} closeModal={closeModal} closeAllDropdown={closeAllDropdown}>
      <Dialog.Panel className="w-full max-w-[812px] transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
        <form onSubmit={handleSubmit(handleAddNewEntry)} >
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
            <section onClick={closeAllDropdown} className="col-span-2">
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
                    <Info
                      className={`
                      h-5 w-5 text-slate-400 group-focus-within:text-barclerk-30
                      ${errors?.description && 'text-rose-400 group-focus-within:text-rose-400'}
                    `}
                    />
                  </span>
                  <TextareaAutosize
                    id="description"
                    {...register('description')}
                    defaultValue={editData ? editData?.description : ""}
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
              {errors?.description && (
                <span className="error">{`${errors.description.message}`}</span>
              )}
            </section>
            {/* DATE */}
            <section onClick={closeAllDropdown} className="col-span-2 md:col-span-1">
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
                    placeholder="make this dropdown"
                    {...register('date')}
                    disabled={isLoading}
                    defaultValue={editData ? editData?.date : dateToday}
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
            {/* EXTENSION */}
            <section className="relative col-span-2 select-none md:col-span-1">
              <label htmlFor="extension" className="flex cursor-pointer flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  Extension <span className="text-rose-500">*</span>
                </h2>
                <div className="group relative" onClick={toggleExtension}>
                  <span className="absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 group-focus-within:border-barclerk-30">
                    <FilePlus className="h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30" />
                  </span>
                  <input
                    type="text"
                    {...register('extension')}
                    disabled={isLoading}
                    value={extension}
                    readOnly={true}
                    className={`
                      pointer-events-none w-full rounded-md border-2 border-slate-300 pl-12 text-start
                      focus:border-barclerk-30 focus:ring-barclerk-30 disabled:cursor-not-allowed	disabled:opacity-50 
                    `}
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center border-none px-2.5 group-focus-within:border-barclerk-30">
                    <ChevronDown className="h-5 w-5" />
                  </span>
                </div>
              </label>
              {extensionDropdown && (
                <div
                  className="
                  absolute z-50 mt-[1px] flex 
                  max-h-[150px] w-full flex-col items-start overflow-y-scroll rounded-md border-2 
                  border-slate-300 bg-white shadow-md
                "
                >
                  {extensionList.map(( 
                    option: { 
                      extension: string; 
                      id: number; 
                      types: [{ rate: number }] 
                    }, index: number ) => {
                      return (
                        <span
                          key={index}
                          className={`
                          w-full cursor-pointer border-none py-2 px-3 
                          text-left text-sm font-medium text-slate-900 
                        hover:bg-barclerk-30 hover:opacity-100
                          ${ index === activeExtension && 'bg-barclerk-30 opacity-50' }
                        `}
                          onClick={(e) => {
                            setActiveType(0)
                            toggleExtension(e) 
                            setActiveExtension(index)
                          }}
                        >
                          {option?.extension}
                        </span>
                      )
                    }
                  )}
                </div>
              )}
            </section>
            {/* TYPE */}
            <section className="col-span-2 md:col-span-1 relative">
              <label htmlFor="phone" className="flex flex-col space-y-1 cursor-pointer relative">
                <h2 className="text-sm text-slate-700">
                  Type <span className="text-rose-500">*</span>
                </h2>
                <div className="group relative" onClick={toggleType}>
                  <span
                    className={`
                      absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                    group-focus-within:border-barclerk-30 
                    `}
                  >
                    <Clipboard className="h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30" />
                  </span>
                  <input
                    type="text" 
                    {...register('type')}
                    disabled={isLoading}
                    value={typeString} 
                    readOnly={true}
                    className={`
                      w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                      disabled:cursor-not-allowed disabled:opacity-50 pointer-events-none
                    `}
                  />
                  <span className="bg-white border-y-2 border-r-2 border-slate-300 rounded-r-md absolute inset-y-0 flex items-center px-2.5 right-0" >
                    <ChevronDown className="h-5 w-5" />
                  </span>
                </div>
              </label> 
              {typeDropdown && 
                <div className="
                  overflow-y-scroll border-2 border-slate-300 rounded-md 
                  flex flex-col items-start z-50 mt-[1px] absolute w-full
                  bg-white shadow-md max-h-[150px]
                "> 
                  {typeList.map((
                    option:{
                      type: string, 
                      rate: number, 
                      id: number
                    }, 
                    index: number
                  )=>{
                    return (
                      <span 
                        key={index}
                        className={`
                          cursor-pointer w-full text-sm font-medium text-slate-900 
                          py-2 px-3 text-left border-none 
                        hover:bg-barclerk-30 hover:opacity-100
                          ${index === activeType && "opacity-50 bg-barclerk-30"}
                        `}
                        onClick={(e)=> {
                          toggleType(e)
                          setActiveType(index) 
                        }}
                      >
                        {option?.type}
                      </span> 
                    )
                  })} 
                </div>
              } 
            </section> 
            {/* HOURS/UNIT */}
            <section onClick={closeAllDropdown} className="col-span-2 md:col-span-1">
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
                    value={hoursUnit}
                    onChange={(e)=>{setHoursUnit(Number(e.target.value))}}
                    className="w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </label>
              {errors?.hoursUnit && <span className="error">{`${errors.hoursUnit.message}`}</span>}
            </section>
            {/* RATE PER HOUR */}
            <section onClick={closeAllDropdown} className="col-span-2 md:col-span-1">
              <label htmlFor="ratePerHour" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">Rate per hour</h2>
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
                    readOnly={true}
                    value={ratePerHour || 0}
                    className={`
                      w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                      disabled:cursor-not-allowed disabled:opacity-50 cursor-not-allowed
                    `}
                  />
                </div>
              </label>
            </section>
            {/* AMOUNT */}
            <section onClick={closeAllDropdown} className="col-span-1">
              <label htmlFor="amount" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">Amount</h2>
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
                    value={amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    disabled={isLoading} 
                    readOnly={true}
                    className={`
                      w-full cursor-not-allowed rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30
                      focus:ring-barclerk-30 disabled:cursor-not-allowed disabled:opacity-50
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
