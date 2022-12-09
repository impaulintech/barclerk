import { useForm } from 'react-hook-form'
import { Dialog } from '@headlessui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import TextareaAutosize from 'react-textarea-autosize'
import React, { FC, useEffect, useState, ChangeEvent } from 'react'
import { Plus, X, User, Mail, Phone, Home, Lock, DollarSign, Users } from 'react-feather'

import { useMatter } from '~/hooks/useMatter'
import { MatterFormValues } from '~/shared/types'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import CourtHouse from '~/shared/icons/CourtHouseIcon'
import { MatterFormSchema } from '~/shared/validation'
import { PreTrialRestrictions } from '~/utils/constants'
import CourtChargesIcon from '~/shared/icons/CourtChargeIcon'
import DialogBox2 from '~/components/templates/DialogBox/DialogBox2'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const AddNewMatterModal: FC<Props> = ({ isOpen, closeModal }): JSX.Element => {
  const [preTrial, setPreTrial] = useState<string>('1')
  const restrictions = [
    {
      id: 1,
      value: 'None'
    },
    {
      id: 2,
      value: 'On Bail'
    },
    {
      id: 3,
      value: 'In Custody'
    }
  ]

  const {
    reset,
    setError,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<MatterFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(MatterFormSchema)
  })
  const { isLoading, handleAddMatter } = useMatter(closeModal, setError)

  const onChangePreTrialRestrictions = (e: ChangeEvent<HTMLSelectElement>) => {
    setPreTrial(() => e.target.value)
    reset({ in_custody_location: '', on_bail_postal_address: '', value: '' })
  }

  useEffect(() => {
    if (isOpen) {
      setPreTrial(() => '1')
      reset({
        matter_name: '',
        email: '',
        phone_number: '',
        postal_address: '',
        contribution: 0,
        court: '',
        charges: '',
        pre_trial_restriction: '1',
        on_bail_postal_address: '',
        in_custody_location: ''
      })
    }
  }, [isOpen])

  return (
    <DialogBox2 isOpen={isOpen} closeModal={closeModal}>
      <Dialog.Panel className="w-full max-w-[812px] transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
        <form onSubmit={handleSubmit(handleAddMatter)}>
          {/* MODAL HEADER */}
          <header className="flex items-center justify-between space-x-2 border-b border-slate-300 py-4 px-5">
            <div className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span className="text-lg font-semibold">Add New Matter</span>
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
            {/* MATTER NAME FIELD */}
            <section className="col-span-2">
              <label htmlFor="matter_name" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  Matter Name <span className="text-rose-500">*</span>
                </h2>
                <div className="group relative">
                  <span
                    className={`
                      absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                    group-focus-within:border-barclerk-30
                      ${errors?.matter_name && 'border-rose-400 group-focus-within:border-rose-400'}
                    `}
                  >
                    <Users
                      className={`
                      h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30
                      ${errors?.matter_name && 'text-rose-400 group-focus-within:text-rose-400'}
                    `}
                    />
                  </span>
                  <input
                    type="text"
                    id="matter_name"
                    {...register('matter_name')}
                    disabled={isLoading}
                    className={`
                      w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                      disabled:cursor-not-allowed disabled:opacity-50
                      ${
                        errors?.matter_name &&
                        'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                      }
                    `}
                  />
                </div>
              </label>
              {errors?.matter_name && (
                <span className="error">{`${errors.matter_name.message}`}</span>
              )}
            </section>
            {/* CLIENT NAME FIELD */}
            <section className="col-span-2 md:col-span-1">
              <label htmlFor="client_name" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  Client Name <span className="text-rose-500">*</span>
                </h2>
                <div className="group relative">
                  <span
                    className={`
                      absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                    group-focus-within:border-barclerk-30
                      ${errors?.client_name && 'border-rose-400 group-focus-within:border-rose-400'}
                    `}
                  >
                    <User
                      className={`
                      h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30
                      ${errors?.client_name && 'text-rose-400 group-focus-within:text-rose-400'}
                    `}
                    />
                  </span>
                  <input
                    type="text"
                    id="client_name"
                    {...register('client_name')}
                    disabled={isLoading}
                    className={`
                      w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                      disabled:cursor-not-allowed disabled:opacity-50
                      ${
                        errors?.client_name &&
                        'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                      }
                    `}
                  />
                </div>
              </label>
              {errors?.client_name && (
                <span className="error">{`${errors.client_name.message}`}</span>
              )}
            </section>
            {/* EMAIL FIELD */}
            <section className="col-span-2 md:col-span-1">
              <label htmlFor="email" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">Email</h2>
                <div className="group relative">
                  <span
                    className={`
                      absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                    group-focus-within:border-barclerk-30
                      ${errors?.email && 'border-rose-400 group-focus-within:border-rose-400'}
                    `}
                  >
                    <Mail
                      className={`
                      h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30
                      ${errors?.email && 'text-rose-400 group-focus-within:text-rose-400'}
                    `}
                    />
                  </span>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    disabled={isLoading}
                    className={`
                      w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                      disabled:cursor-not-allowed disabled:opacity-50
                      ${
                        errors?.email && 'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                      }
                    `}
                  />
                </div>
              </label>
              {errors?.email && <span className="error">{`${errors.email.message}`}</span>}
            </section>
            {/* PHONE FIELD */}
            <section className="col-span-2 md:col-span-1">
              <label htmlFor="phone" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">Phone</h2>
                <div className="group relative">
                  <span
                    className={`
                      absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                    group-focus-within:border-barclerk-30
                      ${
                        errors?.phone_number && 'border-rose-400 group-focus-within:border-rose-400'
                      }
                    `}
                  >
                    <Phone
                      className={`
                      h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30
                      ${errors?.phone_number && 'text-rose-400 group-focus-within:text-rose-400'}
                    `}
                    />
                  </span>
                  <input
                    type="text"
                    id="phone"
                    {...register('phone_number')}
                    disabled={isLoading}
                    className={`
                      w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                      disabled:cursor-not-allowed disabled:opacity-50
                      ${
                        errors?.phone_number &&
                        'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                      }
                    `}
                  />
                </div>
              </label>
              {errors?.phone_number && (
                <span className="error">{`${errors.phone_number.message}`}</span>
              )}
            </section>
            {/* POSTAL ADDRESS FIELD */}
            <section className="col-span-2 md:col-span-1">
              <label htmlFor="postal_address" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">Postal Address</h2>
                <div className="group relative">
                  <span
                    className={`
                      absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                    group-focus-within:border-barclerk-30
                      ${
                        errors?.postal_address &&
                        'border-rose-400 group-focus-within:border-rose-400'
                      }
                    `}
                  >
                    <Home
                      className={`
                      h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30
                      ${errors?.postal_address && 'text-rose-400 group-focus-within:text-rose-400'}
                    `}
                    />
                  </span>
                  <input
                    type="text"
                    id="postal_address"
                    {...register('postal_address')}
                    disabled={isLoading}
                    className={`
                      w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                      disabled:cursor-not-allowed disabled:opacity-50
                      ${
                        errors?.postal_address &&
                        'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                      }
                    `}
                  />
                </div>
              </label>
              {errors?.postal_address && (
                <span className="error">{`${errors.postal_address.message}`}</span>
              )}
            </section>
            {/* CONTRIBUTION FIELD */}
            <section className="col-span-2 md:col-span-1">
              <label htmlFor="contribution" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  Contribution <span className="text-xs italic">(optional)</span>
                </h2>
                <div className="group relative">
                  <span className="absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 group-focus-within:border-barclerk-30">
                    <DollarSign className="h-5 w-5 text-slate-400 group-focus-within:text-barclerk-30" />
                  </span>
                  <input
                    type="number"
                    id="contribution"
                    {...register('contribution')}
                    disabled={isLoading}
                    className="w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </label>
              {errors?.contribution && (
                <span className="error">{`${errors.contribution.message}`}</span>
              )}
            </section>
            {/* COURT FIELD */}
            <section className="col-span-2 md:col-span-1">
              <label htmlFor="court" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">Court</h2>
                <div className="group relative">
                  <span
                    className={`
                      absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                    group-focus-within:border-barclerk-30
                      ${errors?.court && 'border-rose-400 group-focus-within:border-rose-400'}
                    `}
                  >
                    <CourtHouse
                      className={`
                      h-5 w-5 fill-current text-slate-400 group-focus-within:text-barclerk-30
                      ${errors?.court && 'text-rose-400 group-focus-within:text-rose-400'}
                    `}
                    />
                  </span>
                  <input
                    type="text"
                    id="court"
                    {...register('court')}
                    disabled={isLoading}
                    className={`
                      w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                      disabled:cursor-not-allowed disabled:opacity-50
                      ${
                        errors?.court && 'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                      }
                    `}
                  />
                </div>
              </label>
              {errors?.court && <span className="error">{`${errors.court.message}`}</span>}
            </section>
            {/* CHARGES FIELD */}
            <section className="col-span-2">
              <label htmlFor="charges" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  Charges <span className="text-rose-500">*</span>
                </h2>
                <div className="group relative flex">
                  <span
                    className={`
                      absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                    group-focus-within:border-barclerk-30
                      ${errors?.charges && 'border-rose-400 group-focus-within:border-rose-400'}
                    `}
                  >
                    <CourtChargesIcon
                      className={`
                      h-5 w-5 fill-current text-slate-400 group-focus-within:text-barclerk-30
                      ${
                        errors?.charges &&
                        'fill-current text-rose-400 group-focus-within:text-rose-400'
                      }
                    `}
                    />
                  </span>
                  <TextareaAutosize
                    id="charges"
                    {...register('charges')}
                    disabled={isLoading}
                    className={`
                      min-h-[70px] w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30
                      focus:ring-barclerk-30 disabled:cursor-not-allowed disabled:opacity-50
                      ${
                        errors?.charges &&
                        'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                      }
                    `}
                  />
                </div>
              </label>
              {errors?.charges && <span className="error">{`${errors.charges.message}`}</span>}
            </section>
            {/* PRE-TRIAL RESTRICTION FIELD */}
            <section className="col-span-2 md:col-span-1">
              <label htmlFor="pre-trial-restrictions" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  Pre-trial Restrictions <span className="text-rose-500">*</span>
                </h2>
                <div className="group relative">
                  <span className="absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 group-focus-within:border-barclerk-30">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-barclerk-30" />
                  </span>
                  <select
                    id="pre-trial-restrictions"
                    disabled={isLoading}
                    {...register('pre_trial_restriction')}
                    onChange={onChangePreTrialRestrictions}
                    className="w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {restrictions.map(({ id, value }) => (
                      <option key={id} value={id}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            </section>
            {preTrial === PreTrialRestrictions.ON_BAIL && (
              <section className="col-span-2 md:col-span-1">
                <label htmlFor="on_bail_postal_address" className="flex flex-col space-y-1">
                  <h2 className="text-sm text-slate-700">
                    Postal Address <span className="text-rose-500">*</span>
                  </h2>
                  <div className="group relative">
                    <span className="absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 group-focus-within:border-barclerk-30">
                      <Home className="h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30" />
                    </span>
                    <input
                      type="text"
                      required
                      {...register('on_bail_postal_address')}
                      disabled={isLoading}
                      id="on_bail_postal_address"
                      className="w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </label>
                {errors?.on_bail_postal_address && (
                  <span className="error">{`${errors.on_bail_postal_address.message}`}</span>
                )}
              </section>
            )}
            {preTrial === PreTrialRestrictions.IN_CUSTODY && (
              <section className="col-span-2 md:col-span-1">
                <label htmlFor="location" className="flex flex-col space-y-1">
                  <h2 className="text-sm text-slate-700">
                    Location <span className="text-rose-500">*</span>
                  </h2>
                  <div className="group relative">
                    <span className="absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 group-focus-within:border-barclerk-30">
                      <Home className="h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30" />
                    </span>
                    <input
                      type="text"
                      id="location"
                      required
                      {...register('in_custody_location')}
                      disabled={isLoading}
                      className="w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </label>
                {errors?.in_custody_location && (
                  <span className="error">{`${errors.in_custody_location.message}`}</span>
                )}
              </section>
            )}
          </main>
          {/* MODAL FOOTER SUBMIT AND CANCEL BUTTON */}
          <footer className="flex justify-end space-x-3 border-t border-slate-300 bg-slate-50 py-4 px-9">
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
    </DialogBox2>
  )
}

export default AddNewMatterModal
