import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { UseFormSetError } from 'react-hook-form'

import { useAppDispatch } from './reduxSelector'
import { MatterFields } from '~/redux/matter/types'
import { PreTrialRestrictions } from '~/utils/constants'
import { addNewMatter } from '~/redux/matter/matterSlice'
import { AxiosResponseError, MatterFormValues } from '~/shared/types'
import { updateMatter } from '~/redux/client-profile/clientProfileSlice'

export const useMatter = (closeModal: () => void, setError?: UseFormSetError<MatterFormValues>) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const getPreTrialRestrictionValue = (data: MatterFormValues) => {
    switch (data.pre_trial_restriction) {
      case PreTrialRestrictions.ON_BAIL:
        return data.on_bail_postal_address
      case PreTrialRestrictions.IN_CUSTODY:
        return data.in_custody_location
      default:
        return 'None'
    }
  }

  const handleAddMatter = (data: MatterFormValues) => {
    data.value = getPreTrialRestrictionValue(data)
    setIsLoading(() => true)
    dispatch(addNewMatter(data))
      .unwrap()
      .then(() => {
        toast.success('New Matter created successfully!')
        closeModal()
      })
      .catch((e: AxiosResponseError) => {
        if (e.status !== 422) {
          toast.error(e.content)
        } else {
          if (!setError) return
          Object.entries(e.content).forEach(([key, value]) => {
            setError(key as MatterFields, { type: 'custom', message: value as string })
          })
        }
      })
      .finally(() => setIsLoading(() => false))
  }

  const handleUpdateMatter = (data: MatterFormValues) => {
    const payload = {
      id: router.query.id,
      ...data
    }

    data.value = getPreTrialRestrictionValue(data)
    setIsLoading(() => true)
    dispatch(updateMatter(payload))
      .unwrap()
      .then(() => {
        toast.success('Updated Matter successfully!')
        closeModal()
      })
      .catch((e: AxiosResponseError) => {
        if (e.status !== 422) {
          toast.error(e.content)
        } else {
          if (!setError) return
          Object.entries(e.content).forEach(([key, value]) => {
            setError(key as MatterFields, { type: 'custom', message: value as string })
          })
        }
      })
      .finally(() => setIsLoading(() => false))
  }

  return {
    isLoading,
    handleAddMatter,
    handleUpdateMatter
  }
}
