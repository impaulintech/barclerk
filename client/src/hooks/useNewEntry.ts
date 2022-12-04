import { useState } from 'react'
import toast from 'react-hot-toast'
import { UseFormSetError } from 'react-hook-form'

import { useAppDispatch } from './reduxSelector' 
import { TimeEntryFormValues } from '~/shared/types'

export const useNewEntry = (closeModal: () => void, setError?: UseFormSetError<TimeEntryFormValues>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch() 

  const handleAddNewEntry = (data: TimeEntryFormValues) => { 
    setIsLoading(() => true)
    toast.success('New Matter created successfully!')
    setIsLoading(() => false)
  }

  return {
    handleAddNewEntry,
    isLoading
  }
}
