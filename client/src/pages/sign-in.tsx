/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { NextPage } from 'next'
import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import { getCookie } from 'cookies-next'

import Button from '~/components/atoms/Button'
import useRememberMe from '~/hooks/useRememberMe'
import NextHead from '~/components/atoms/NextHead'
import { useAuthMethods } from '~/hooks/authMethods'
import { SignInFormSchema } from '~/shared/validation'
import CustomForm from '~/components/molecules/CustomForm'
import { SignInFormikInitialValues } from '~/shared/types'
import AdminAuthTemplate from '~/components/templates/AdminAuthTemplate'

const SignIn: NextPage = (): JSX.Element => {
  const { isRemembered, rememberedEmail, onClickRemember, onChangeRemember } = useRememberMe()
  const { handleSignInSubmit } = useAuthMethods()
  const initialEmailValue = getCookie('email') || ''
  const [isPassHidden, setIsPassHidden] = useState<boolean>(true)

  const formikInitialValues: SignInFormikInitialValues = {
    email: initialEmailValue.toString(),
    password: ''
  }

  return (
    <>
      <NextHead key="" title="BarClerk | Sign In" />
      <AdminAuthTemplate>
        <div className="flex w-full min-w-[300px] !max-w-[300px] flex-col gap-5">
          <header className="flex h-full flex-col items-center justify-center">
            <img
              src="/images/logo-dark-transparent.png"
              className="-mb-3 h-[90px] w-[99px]"
              alt="logo"
            />
            <h1 className="pt-3 text-[21px] font-semibold text-dark mobile:text-[15px]">
              Account Sign In
            </h1>
          </header>
          <div className="flex flex-col gap-3">
            <Formik
              initialValues={formikInitialValues}
              validationSchema={SignInFormSchema}
              onSubmit={handleSignInSubmit}
            >
              {({ isSubmitting }: { isSubmitting: boolean }) => {
                return (
                  <Form>
                    <div className="flex flex-col gap-1 space-y-3" onChange={onChangeRemember}>
                      <CustomForm
                        label="Email"
                        name="email"
                        type="email"
                        defaultValue={rememberedEmail}
                        placeholder="john.doe@email.com"
                      />
                      <CustomForm
                        label="Password"
                        name="password"
                        type={isPassHidden ? 'password' : 'text'}
                        placeholder="•••••••••••"
                        isPassHidden={isPassHidden}
                        setIsPassHidden={setIsPassHidden}
                      />
                    </div>

                    <div className="mt-5 flex justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember"
                          type="checkbox"
                          defaultChecked={isRemembered}
                          onClick={onClickRemember}
                          className="checked:bg-barcleark-30 h-3 w-3 rounded-sm border border-gray-300 bg-transparent"
                        />
                        <label htmlFor="remember" className="ml-2 text-xs font-semibold text-dark">
                          Remember me
                        </label>
                      </div>
                      <Link href="./forgot-password">
                        <h1 className="ml-2 text-xs font-semibold text-dark">Forgot Password?</h1>
                      </Link>
                    </div>

                    <Button isSubmitting={isSubmitting} value="Continue" className="mt-[25px]" />
                  </Form>
                )
              }}
            </Formik>

            <div className="flex flex-col items-center justify-center gap-5">
              <span className="block text-[12px] font-medium text-dark">
                Don't have an account?
                <span className="ml-1 cursor-pointer text-barclerk-30 hover:text-barclerk-30/70">
                  <Link href="./sign-up">Register</Link>
                </span>
              </span>
            </div>
          </div>
        </div>
      </AdminAuthTemplate>
    </>
  )
}

export { SignInUpAuthChecker as getServerSideProps } from '~/utils/getServerSideProps'
export default SignIn
