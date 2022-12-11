import moment from 'moment';
import { useState } from 'react'
import toast from 'react-hot-toast'  

import { useAppDispatch, useAppSelector } from './reduxSelector' 
import { TimeEntryFormValues } from '~/shared/types'
import { createNewEntry, getTimeEntries, reset, updateTimeEntries } from '~/redux/time-entry/timeEntrySlice';
import { useRouter } from 'next/router';
import { RequiredValue } from '~/redux/time-entry/types';

export const useNewEntry = (
  closeAllDropdown: () => void, 
  closeModal: () => void, 
  extensionID: number, 
  typeID: number, 
  amount: number, 
  timeEntryID?: number | undefined
) => {
  const { query } = useRouter()
  const clientID = Number(query?.id)
  const dispatch = useAppDispatch() 
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { isEditModal, currentPage } = useAppSelector((state) => state.timeEntry)

  const handleAddNewEntry = (data: TimeEntryFormValues) => { 
    closeAllDropdown()
    setIsLoading(() => true)  

    const { description, hoursUnit, date } = data || {}
    const dateFormattedd = moment(date).format('YYYY-MM-DD')
    
    const requiredValue: RequiredValue = { 
      grant_id: extensionID, 
      type_id: typeID, 
      description, 
      date: dateFormattedd, 
      hours: hoursUnit, 
      amount 
    }
    
    if (isEditModal) {
      dispatch(updateTimeEntries({clientID, timeEntryID, requiredValue}))
        .then((res)=>{ 
          closeModal()
          setIsLoading(() => false)
          const { content, status } = res?.payload || {}
          
          if (status === 422) {
            dispatch(reset())
            return toast.error(content?.amount[0])
          } 
          toast.success('Timie Entry updated successfully!')
          dispatch(getTimeEntries({ clientID, currentPage }))
        })
    } else {
      dispatch(createNewEntry({clientID, requiredValue}))
        .then((res)=>{ 
          closeModal()
          setIsLoading(() => false)
          const { content, status } = res?.payload || {}

          if (status === 422) {
            dispatch(reset())
            return toast.error(content?.amount[0])
          }  
          toast.success('New Entry created successfully!')
          dispatch(getTimeEntries({ clientID, currentPage }))
        })
    }
     
  }

  return {
    handleAddNewEntry,
    isLoading
  }
}
