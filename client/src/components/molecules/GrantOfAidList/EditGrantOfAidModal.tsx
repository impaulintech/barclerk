import Select from 'react-select'
import toast from 'react-hot-toast'
import { Dialog } from '@headlessui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { FC, useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { X, FilePlus, Calendar, Edit3, Plus, Minus } from 'react-feather'

import { useRouter } from 'next/router'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import { EditGrantOfAidSchema } from '~/shared/validation'
import { customStyles } from '~/utils/customReactSelectStyles'
import { GrantOfAidFields } from '~/redux/grant-of-aid/interface'
import DialogBox2 from '~/components/templates/DialogBox/DialogBox2'
import InputSkeleton from '~/components/atoms/Skeletons/InputSkeleton'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { AxiosResponseError, GrantOfAidFormValues } from '~/shared/types'
import { getSingleGrandOfAid, updateGrantOfAid } from '~/redux/grant-of-aid/grantOfAidSlice'

type Props = {
  isOpen: boolean
  closeModal: () => void
  grant_id: number
}

const EditGrantOfAidModal: FC<Props> = ({ isOpen, closeModal, grant_id }): JSX.Element => {
  const router = useRouter()
  const { id } = router.query

  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const { singleGrantOfAid, clauses, isLoadingEditGOL } = useAppSelector(
    (state) => state.grantOfAid
  )

  const fetchSingleGrandOfAidCodes = async () => {
    const payload = {
      client_id: id,
      grant_id
    }
    await dispatch(getSingleGrandOfAid(payload))
  }

  useEffect(() => {
    if (isOpen) {
      fetchSingleGrandOfAidCodes()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isLoadingEditGOL) {
      const result = singleGrantOfAid?.codes?.map((c) => ({ code: c.code, id: c.id.toString() }))
      reset({
        extension: singleGrantOfAid?.extension,
        date_effective: singleGrantOfAid?.date_effective,
        codes: result
      })
    }
  }, [isLoadingEditGOL])

  const {
    reset,
    control,
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<GrantOfAidFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(EditGrantOfAidSchema)
  })

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'codes'
  })

  // Add New Code
  const handleAddNewCode = () => append({ code: '', id: '' })

  // Remove Code
  const handleRemoveCode = (index: number) => remove(index)

  const handleUpdateGrantOfAid = async (data: GrantOfAidFormValues): Promise<void> => {
    const { extension, date_effective, codes } = data

    const payload = {
      client_id: id,
      grant_id,
      extension,
      date_effective,
      codes: codes?.map((c) => parseInt(c.id))
    }

    setIsLoadingSubmit(() => true)
    dispatch(updateGrantOfAid(payload))
      .unwrap()
      .then(() => {
        toast.success('Updated Grant Of Aid Successfully!')
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
      .finally(() => setIsLoadingSubmit(() => false))
  }

  return (
    <DialogBox2 isOpen={isOpen} closeModal={closeModal}>
      <Dialog.Panel className="w-full max-w-[500px] transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
        <form onSubmit={handleSubmit(handleUpdateGrantOfAid)}>
          {/* MODAL HEADER */}
          <header className="flex items-center justify-between space-x-2 border-b border-slate-300 py-4 px-5">
            <div className="flex items-center space-x-2">
              <Edit3 className="h-5 w-5" />
              <span className="text-lg font-semibold">Edit Grant of Aid</span>
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
          <main className="flex flex-col space-y-4 px-8 py-6 pb-10">
            <>
              {isLoadingEditGOL ? (
                <>
                  {/* We have a problem with [...Array(4)] because it gives a `key={i}` error */}
                  {[0, 1, 2, 3]?.map((i: number) => (
                    <InputSkeleton key={i} />
                  ))}
                </>
              ) : (
                <>
                  {/* EXTENSION FIELD */}
                  <section>
                    <label htmlFor="extension" className="flex flex-col space-y-1">
                      <h2 className="text-sm text-slate-700">
                        Extension <span className="text-rose-500">*</span>
                      </h2>
                      <div className="group relative">
                        <span
                          className={`
                            absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                          group-focus-within:border-barclerk-30
                            ${
                              errors?.extension &&
                              'border-rose-400 group-focus-within:border-rose-400'
                            }
                          `}
                        >
                          <FilePlus
                            className={`
                              h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30
                              ${
                                errors?.extension &&
                                'text-rose-400 group-focus-within:text-rose-400'
                              }
                            `}
                          />
                        </span>
                        <input
                          type="text"
                          id="extension"
                          {...register('extension')}
                          disabled={isSubmitting || isLoadingSubmit}
                          className={`
                            w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                            disabled:cursor-not-allowed disabled:opacity-50
                            ${
                              errors?.extension &&
                              'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                            }
                          `}
                          defaultValue={singleGrantOfAid?.extension}
                          autoFocus
                        />
                      </div>
                    </label>
                    {errors?.extension && (
                      <span className="error">{`${errors.extension.message}`}</span>
                    )}
                  </section>
                  {/* DATE EFFECTIVE FIELD */}
                  <section>
                    <label htmlFor="date_effective" className="flex flex-col space-y-1">
                      <h2 className="text-sm text-slate-700">
                        Date Effective <span className="text-rose-500">*</span>
                      </h2>
                      <div className="group relative">
                        <span
                          className={`
                            absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                          group-focus-within:border-barclerk-30
                            ${
                              errors?.date_effective &&
                              'border-rose-400 group-focus-within:border-rose-400'
                            }
                          `}
                        >
                          <Calendar
                            className={`
                              h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30
                              ${
                                errors?.date_effective &&
                                'text-rose-400 group-focus-within:text-rose-400'
                              }
                            `}
                          />
                        </span>
                        <input
                          type="date"
                          id="date_effective"
                          {...register('date_effective')}
                          disabled={isSubmitting || isLoadingSubmit}
                          className={`
                            w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                            disabled:cursor-not-allowed disabled:opacity-50
                            ${
                              errors?.date_effective &&
                              'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                            }
                          `}
                          defaultValue={singleGrantOfAid?.date_effective}
                        />
                      </div>
                    </label>
                    {errors?.date_effective && (
                      <span className="error">{`${errors.date_effective.message}`}</span>
                    )}
                  </section>
                  {fields?.map(({ id, code }, i) => (
                    <section key={id}>
                      <label className="mb-1 flex flex-col space-y-1">
                        <h2 className="text-sm text-slate-700">
                          Code {i + 1} <span className="text-rose-500">*</span>
                        </h2>
                        <div className="flex w-full flex-row items-center space-x-2">
                          <div className="group relative w-full">
                            <Controller
                              name={`codes.${i}.id` as any}
                              control={control}
                              render={({ field: { onChange } }) => {
                                return (
                                  <Select
                                    options={clauses as any}
                                    isDisabled={isSubmitting || isLoadingSubmit}
                                    placeholder={'Select code'}
                                    getOptionLabel={(option) => option?.code}
                                    getOptionValue={(option) => option?.id.toString()}
                                    onChange={(option) => onChange(option?.id.toString())}
                                    defaultValue={{ id, code }}
                                    styles={customStyles}
                                    backspaceRemovesValue={true}
                                    menuPortalTarget={document.body}
                                    className="rounded-md border-none ring-1 ring-slate-300 focus:ring-barclerk-30"
                                    isClearable
                                  />
                                )
                              }}
                            />
                            {errors.codes?.[i]?.id && (
                              <span className="error absolute -bottom-4 text-[10px]">{`${errors.codes?.[i]?.id?.message}`}</span>
                            )}
                          </div>
                          <button
                            type="button"
                            className={`
                              rounded border-2 border-slate-300 p-2 outline-none disabled:cursor-not-allowed 
                              disabled:opacity-50 hover:bg-slate-50 active:scale-95
                              ${fields.length === 1 ? 'active:scale-100' : ''}
                            `}
                            onClick={() => handleRemoveCode(i)}
                            disabled={fields?.length === 1 || isSubmitting || isLoadingSubmit}
                          >
                            <Minus className="h-6 w-6 text-slate-400" />
                          </button>
                          <button
                            type="button"
                            className={`
                              rounded border-2 border-slate-300 p-2 outline-none disabled:cursor-not-allowed 
                              disabled:opacity-50 hover:bg-slate-50 active:scale-95
                            `}
                            onClick={handleAddNewCode}
                            disabled={isSubmitting || isLoadingSubmit}
                          >
                            <Plus className="h-6 w-6 text-slate-400" />
                          </button>
                        </div>
                      </label>
                    </section>
                  ))}
                </>
              )}
            </>
          </main>
          {/* MODAL FOOTER SUBMIT AND CANCEL BUTTON */}
          {!isLoadingEditGOL && (
            <footer className="flex justify-end space-x-3 border-t border-slate-300 bg-slate-50 py-4 px-9">
              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting || isLoadingSubmit}
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
                disabled={isSubmitting || isLoadingSubmit}
                className={`
                  flex w-36 items-center justify-center rounded bg-barclerk-10 py-2 text-white 
                  outline-none transition duration-75 ease-in-out focus:bg-barclerk-10/90 disabled:cursor-not-allowed disabled:opacity-50
                  hover:bg-barclerk-10/90 disabled:hover:bg-barclerk-10 active:scale-95 disabled:active:scale-100
                `}
              >
                {isSubmitting || isLoadingSubmit ? <Spinner className="h-6 w-6" /> : 'Save'}
              </button>
            </footer>
          )}
        </form>
      </Dialog.Panel>
    </DialogBox2>
  )
}

export default EditGrantOfAidModal
