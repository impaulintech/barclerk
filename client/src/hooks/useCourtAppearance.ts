import { useState } from 'react'
import toast from 'react-hot-toast'
import { UseFormSetError } from 'react-hook-form'

import { useAppDispatch } from './reduxSelector'
import { CourtAppearanceFormValues } from '../shared/types/index'

export const useCourtAppearance = (closeModal: () => void, setError?: UseFormSetError<CourtAppearanceFormValues>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch() 

  const handleAddCourtAppearance = (data: CourtAppearanceFormValues) => { 
    setIsLoading(() => true)
    toast.success('New Court Appearance created successfully!')
    closeModal()
    setIsLoading(() => false)
  }
  
  const handleEditCourtAppearance = (data: CourtAppearanceFormValues) => {
    setIsLoading(() => true)
    toast.success('Edited Court Appearance successfully!')
    closeModal()
    setIsLoading(() => false)
  }

  return {
    handleAddCourtAppearance,
    handleEditCourtAppearance,
    isLoading
  }
}
