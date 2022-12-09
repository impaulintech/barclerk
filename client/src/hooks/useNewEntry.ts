import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router';
import { UseFormSetError } from 'react-hook-form'

import { TimeEntryFormValues } from '~/shared/types'
import { useAppDispatch, useAppSelector } from './reduxSelector' 
import { createNewEntry, updateTimeEntries } from '~/redux/time-entry/timeEntrySlice';

export const useNewEntry = (
  closeAllDropdown: () => void, 
  closeModal: () => void, 
  modalValue:any, setError?: UseFormSetError<TimeEntryFormValues>
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { isEditModal } = useAppSelector((state) => state.timeEntry)
  const dispatch = useAppDispatch() 
  const { query } = useRouter()
  const clientID = Number(query?.id)

  const handleAddNewEntry = (data: TimeEntryFormValues) => { 
    const {grant_id, type_id, description, date, hoursUnit:hours, amount, timeEntryID} = modalValue || {};
    const requiredValue = {grant_id, type_id, description, date, hours, amount};

    setIsLoading(() => true) 

    if (isEditModal) {
      dispatch(updateTimeEntries({clientID, timeEntryID, requiredValue}))
        .then(()=>{ 
          toast.success('Timie Entry updated successfully!')
          closeModal()
          setIsLoading(() => false)
        })
    } else {
      dispatch(createNewEntry({clientID, requiredValue}))
        .then(()=>{ 
          toast.success('New Entry created successfully!')
          closeModal()
          setIsLoading(() => false)
        })
    }  
    closeAllDropdown()
  }

  return {
    handleAddNewEntry,
    isLoading
  }
}
