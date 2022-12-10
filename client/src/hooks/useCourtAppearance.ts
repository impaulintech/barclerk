import { useState } from 'react'
import toast from 'react-hot-toast'
import { UseFormSetError } from 'react-hook-form'
import { useRouter } from 'next/router'
import moment from 'moment'

import { useAppDispatch } from './reduxSelector'
import {
  AxiosResponseError,
  CourtAppearanceFormFields,
  CourtAppearanceFormValues
} from '../shared/types/index'
import {
  addClientCourtAppearance,
  updateClientCourtAppearance
} from '~/redux/court-appearance/courtAppearanceSlice'

export const useCourtAppearance = (
  closeModal: () => void,
  setError?: UseFormSetError<CourtAppearanceFormValues>
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { query } = useRouter()

  const handleAddCourtAppearance = (data: CourtAppearanceFormValues) => {
    setIsLoading(() => true)
    const { date, next_court_date, time, court, judicial_officer, orders, other_notes } = data || {}

    const dateValue = moment(date).format('YYYY-MM-DD')
    const nextCourtDateValue = moment(next_court_date).format('YYYY-MM-DD')

    const dataValues = {
      date: dateValue,
      next_court_date: nextCourtDateValue,
      time: time,

      court,
      judicial_officer,
      orders,
      other_notes
    }

    dispatch(addClientCourtAppearance({ clientId: Number(query?.id), formValues: dataValues }))
      .unwrap()
      .then(() => {
        toast.success('New Court Appearance created successfully!')
        closeModal()
      })
      .catch((e: AxiosResponseError) => {
        if (e.status !== 422) {
          toast.error(e.content)
        } else {
          if (!setError) return
          Object.entries(e.content).forEach(([key, value]) => {
            setError(key as CourtAppearanceFormFields, { type: 'custom', message: value as string })
          })
        }
      })
      .finally(() => {
        setIsLoading(() => false)
      })
  }

  const handleEditCourtAppearance = (data: CourtAppearanceFormValues) => {
    const { id, date, next_court_date, time, court, judicial_officer, orders, other_notes } =
      data || {}

    const dateValue = moment(date).format('YYYY-MM-DD')
    const nextCourtDateValue = moment(next_court_date).format('YYYY-MM-DD')

    const dataValues = {
      id,
      date: dateValue,
      next_court_date: nextCourtDateValue,
      time,
      court,
      judicial_officer,
      orders,
      other_notes
    }

    setIsLoading(() => true)
    dispatch(updateClientCourtAppearance({ clientId: Number(query?.id), formValues: dataValues }))
      .unwrap()
      .then(() => {
        toast.success('Edited Court Appearance successfully!')
        closeModal()
      })
      .catch((e: AxiosResponseError) => {
        if (e.status !== 422) {
          toast.error(e.content)
        } else {
          if (!setError) return
          Object.entries(e.content).forEach(([key, value]) => {
            setError(key as CourtAppearanceFormFields, { type: 'custom', message: value as string })
          })
        }
      })
      .finally(() => {
        setIsLoading(() => false)
      })
  }

  return {
    handleAddCourtAppearance,
    handleEditCourtAppearance,
    isLoading
  }
}
