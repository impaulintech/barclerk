import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, User, Lock, Eye, EyeOff } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'

import { Profile, Security } from '~/shared/types'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import { ProfileFormSchema, SecurityFormSchema } from '~/shared/validation'

export const activeComponent = (tab: string) => {
  const [showCurrentPass, setShowCurrentPass] = useState<boolean>(false)
  const [showNewPass, setShowNewPass] = useState<boolean>(false)

  const currentPassToggle = (): void => setShowCurrentPass(!showCurrentPass)
  const currentNewToggle = (): void => setShowNewPass(!showNewPass)

  switch (tab) {
    case 'Profile': {
      const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
      } = useForm<Profile>({
        mode: 'onTouched',
        resolver: yupResolver(ProfileFormSchema)
      })

      // This will handle the Update Profile Functionality
      const handleUpdateProfile = async (data: Profile): Promise<void> => {
        const payload = {
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email
        }
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve()
            alert(JSON.stringify(payload, null, 2))
          }, 1000)
        })
      }

      return (
        <form onSubmit={handleSubmit(handleUpdateProfile)}>
          <header className="py-4">
            <h1 className="text-center text-xl font-semibold text-barclerk-10">Your Details</h1>
          </header>
          <main className="flex flex-col space-y-4 px-10 pb-8">
            <section>
              <label htmlFor="first_name" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  First Name <span className="text-rose-500">*</span>
                </h2>
                <div className="group relative">
                  <span
                    className={`
                      absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                    group-focus-within:border-barclerk-30
                      ${errors?.first_name && 'border-rose-400 group-focus-within:border-rose-400'}
                    `}
                  >
                    <User
                      className={`
                        h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30
                        ${errors?.first_name && 'text-rose-400 group-focus-within:text-rose-400'}
                      `}
                    />
                  </span>
                  <input
                    type="text"
                    id="first_name"
                    {...register('first_name')}
                    disabled={isSubmitting}
                    className={`
                      w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                      disabled:cursor-not-allowed disabled:opacity-50
                      ${
                        errors?.first_name &&
                        'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                      }
                    `}
                  />
                </div>
              </label>
              {errors?.first_name && (
                <span className="error">{`${errors.first_name.message}`}</span>
              )}
            </section>
            <section>
              <label htmlFor="last_name" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  Last Name <span className="text-rose-500">*</span>
                </h2>
                <div className="group relative">
                  <span
                    className={`
                      absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                    group-focus-within:border-barclerk-30
                     ${errors?.last_name && 'border-rose-400 group-focus-within:border-rose-400'}
                    `}
                  >
                    <User
                      className={`
                        h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30
                        ${errors?.last_name && 'text-rose-400 group-focus-within:text-rose-400'}
                      `}
                    />
                  </span>
                  <input
                    type="text"
                    id="last_name"
                    {...register('last_name')}
                    disabled={isSubmitting}
                    className={`
                      w-full rounded-md border-2 border-slate-300 pl-12 focus:border-barclerk-30 focus:ring-barclerk-30
                      disabled:cursor-not-allowed disabled:opacity-50
                      ${
                        errors?.last_name &&
                        'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                      }
                    `}
                  />
                </div>
              </label>
              {errors?.last_name && <span className="error">{`${errors.last_name.message}`}</span>}
            </section>
            <section>
              <label htmlFor="email" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  Email <span className="text-rose-500">*</span>
                </h2>
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
                    type="text"
                    id="email"
                    {...register('email')}
                    disabled={isSubmitting}
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
          </main>
          {/* MODAL FOOTER SUBMIT AND CANCEL BUTTON */}
          <footer className="flex justify-end space-x-3 border-t border-slate-300 bg-slate-50 py-4 pr-10">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                flex w-36 items-center justify-center rounded bg-barclerk-10 py-2 text-sm text-white
                outline-none transition duration-75 ease-in-out focus:bg-barclerk-10/90 disabled:cursor-not-allowed disabled:opacity-50
                hover:bg-barclerk-10/90 disabled:hover:bg-barclerk-10 active:scale-95 disabled:active:scale-100
              `}
            >
              {isSubmitting ? <Spinner className="h-5 w-5" /> : 'Save Changes'}
            </button>
          </footer>
        </form>
      )
    }

    case 'Security': {
      const {
        reset,
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
      } = useForm<Security>({
        mode: 'onTouched',
        resolver: yupResolver(SecurityFormSchema)
      })

      // This will handle the Update Password Security Functionality
      const handleUpdatePassword = async (data: Security): Promise<void> => {
        const payload = {
          currentPassword: data.current_password,
          newPassword: data.new_password,
          confirmPassword: data.confirm_password
        }

        return new Promise((resolve) => {
          setTimeout(() => {
            resolve()
            reset({
              current_password: '',
              new_password: '',
              confirm_password: ''
            })
            alert(JSON.stringify(payload, null, 2))
          }, 1000)
        })
      }

      return (
        <form className="pt-8" onSubmit={handleSubmit(handleUpdatePassword)}>
          <main className="flex flex-col space-y-4 px-10 pb-8">
            <section>
              <label htmlFor="current_password" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  Current Password <span className="text-rose-500">*</span>
                </h2>
                <div className="group relative">
                  <span
                    className={`
                      absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                    group-focus-within:border-barclerk-30
                      ${
                        errors?.current_password &&
                        'border-rose-400 group-focus-within:border-rose-400'
                      }
                    `}
                  >
                    <Lock
                      className={`
                        h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30
                        ${
                          errors?.current_password &&
                          'text-rose-400 group-focus-within:text-rose-400'
                        }
                      `}
                    />
                  </span>
                  <div className="flex items-center">
                    <input
                      type={showCurrentPass ? 'text' : 'password'}
                      id="current_password"
                      {...register('current_password')}
                      disabled={isSubmitting}
                      className={`
                      w-full rounded-md border-2 border-slate-300 pl-12 pr-12 focus:border-barclerk-30
                      focus:ring-barclerk-30 disabled:cursor-not-allowed disabled:opacity-50
                      ${
                        errors?.current_password &&
                        'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                      }
                    `}
                    />
                    <button
                      type="button"
                      onClick={currentPassToggle}
                      className="absolute inset-y-0 right-0 px-3 text-slate-400 outline-none group-focus-within:text-barclerk-30 active:scale-95"
                    >
                      {showCurrentPass ? (
                        <EyeOff
                          className={`
                            h-4 w-4
                            ${
                              errors?.current_password &&
                              'text-rose-400 group-focus-within:text-rose-400'
                            }
                          `}
                        />
                      ) : (
                        <Eye
                          className={`
                            h-4 w-4
                            ${
                              errors?.current_password &&
                              'text-rose-400 group-focus-within:text-rose-400'
                            }
                          `}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </label>
              {errors?.current_password && (
                <span className="error">{`${errors.current_password.message}`}</span>
              )}
            </section>
            <section>
              <label htmlFor="new_password" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  New Password <span className="text-rose-500">*</span>
                </h2>
                <div className="group relative">
                  <span
                    className={`
                      absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                    group-focus-within:border-barclerk-30
                     ${errors?.new_password && 'border-rose-400 group-focus-within:border-rose-400'}
                    `}
                  >
                    <Lock
                      className={`
                        h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30
                        ${errors?.new_password && 'text-rose-400 group-focus-within:text-rose-400'}
                      `}
                    />
                  </span>
                  <div className="flex items-center">
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      id="new_password"
                      {...register('new_password')}
                      disabled={isSubmitting}
                      className={`
                      w-full rounded-md border-2 border-slate-300 pl-12 pr-12 focus:border-barclerk-30
                      focus:ring-barclerk-30 disabled:cursor-not-allowed disabled:opacity-50
                      ${
                        errors?.new_password &&
                        'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                      }
                    `}
                    />
                    <button
                      type="button"
                      onClick={currentNewToggle}
                      className="absolute inset-y-0 right-0 px-3 text-slate-400 outline-none group-focus-within:text-barclerk-30 active:scale-95"
                    >
                      {showNewPass ? (
                        <EyeOff
                          className={`
                            h-4 w-4
                            ${
                              errors?.new_password &&
                              'text-rose-400 group-focus-within:text-rose-400'
                            }
                          `}
                        />
                      ) : (
                        <Eye
                          className={`
                            h-4 w-4
                            ${
                              errors?.new_password &&
                              'text-rose-400 group-focus-within:text-rose-400'
                            }
                          `}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </label>
              {errors?.new_password && (
                <span className="error">{`${errors.new_password.message}`}</span>
              )}
            </section>
            <section>
              <label htmlFor="confirm_password" className="flex flex-col space-y-1">
                <h2 className="text-sm text-slate-700">
                  Confirm New Password <span className="text-rose-500">*</span>
                </h2>
                <div className="group relative">
                  <span
                    className={`
                      absolute inset-y-0 flex items-center border-r-2 border-slate-300 px-2.5 
                    group-focus-within:border-barclerk-30
                      ${
                        errors?.confirm_password &&
                        'border-rose-400 group-focus-within:border-rose-400'
                      }
                    `}
                  >
                    <Lock
                      className={`
                        h-5 w-5 text-slate-400  group-focus-within:text-barclerk-30
                        ${
                          errors?.confirm_password &&
                          'text-rose-400 group-focus-within:text-rose-400'
                        }
                      `}
                    />
                  </span>
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    id="confirm_password"
                    {...register('confirm_password')}
                    disabled={isSubmitting}
                    className={`
                      w-full rounded-md border-2 border-slate-300 pl-12 pr-12 focus:border-barclerk-30
                      focus:ring-barclerk-30 disabled:cursor-not-allowed disabled:opacity-50
                      ${
                        errors?.confirm_password &&
                        'border-rose-400 focus:border-rose-400 focus:ring-rose-400'
                      }
                    `}
                  />
                </div>
              </label>
              {errors?.confirm_password && (
                <span className="error">{`${errors.confirm_password.message}`}</span>
              )}
            </section>
          </main>
          <footer className="flex justify-end space-x-3 border-t border-slate-300 bg-slate-50 py-4 pr-10">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                flex w-36 items-center justify-center rounded bg-barclerk-10 py-2 text-sm text-white
                outline-none transition duration-75 ease-in-out focus:bg-barclerk-10/90 disabled:cursor-not-allowed disabled:opacity-50
                hover:bg-barclerk-10/90 disabled:hover:bg-barclerk-10 active:scale-95 disabled:active:scale-100
              `}
            >
              {isSubmitting ? <Spinner className="h-5 w-5" /> : 'Save Changes'}
            </button>
          </footer>
        </form>
      )
    }
    default: {
      return <h1 className="text-lg text-rose-400">404 Error!</h1>
    }
  }
}
