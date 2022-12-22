import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { UseFormSetError } from 'react-hook-form'

import { useAppDispatch } from './reduxSelector'
import { GrantOfAidFields } from '~/redux/grant-of-aid/interface'
import { addNewGrantOfAid } from '~/redux/grant-of-aid/grantOfAidSlice'
import { AxiosResponseError, GrantOfAidFormValues } from '~/shared/types'

export const useGrantOfAid = (
  closeModal: () => void,
  setError?: UseFormSetError<GrantOfAidFormValues>
) => {
  const router = useRouter()
  const { id } = router.query
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  // Handle Submit Add Grant of Aid
  const handleAddGrantOfAid = async (data: GrantOfAidFormValues): Promise<void> => {
    setIsLoading(() => true)
    const { codes, date_effective, extension } = data

    const payload = {
      ...{
        client_id: id,
        extension,
        date_effective,
        codes: codes?.map((c) => parseInt(c.code))
      }
    }

    dispatch(addNewGrantOfAid(payload))
      .unwrap()
      .then(() => {
        toast.success('Added New Grant Of Aid Successfully!')
        closeModal()
      })
      .catch((e: AxiosResponseError) => {
        if (e.status !== 422) {
          toast.error(e.content)
        } else {
          if (!setError) return
          Object.entries(e.content).forEach(([key, value]) => {
            setError(key as GrantOfAidFields, { type: 'custom', message: value as string })
          })
        }
      })
      .finally(() => setIsLoading(() => false))
  }

  return {
    isLoading,
    handleAddGrantOfAid
  }
}
