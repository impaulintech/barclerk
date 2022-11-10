/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { NextPage } from 'next'
import React, { useState } from 'react'
import { Form, Formik } from 'formik'

import Button from '~/components/atoms/Button'
import NextHead from '~/components/atoms/NextHead'
import { useAuthMethods } from '~/hooks/authMethods'
import { SignUpFormSchema } from '~/shared/validation'
import CustomForm from '~/components/molecules/CustomForm'
import { SignUpFormikInitialValues } from '~/shared/types'
import AdminAuthTemplate from '~/components/templates/AdminAuthTemplate'

const SignUp: NextPage = (): JSX.Element => {
  const { handleSignUpSubmit: handleAuthSubmit } = useAuthMethods()
  const [isPassHidden, setIsPassHidden] = useState<boolean>(true)

  const formikInitialValues: SignUpFormikInitialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  return (
    <>
      <NextHead key="sign-up" title="BarClerk | Sign Up" />
      <AdminAuthTemplate>
        <div className="flex flex-col gap-5 max-w-[300px] min-w-[300px] w-full">
          <header className="flex flex-col items-center h-full justify-center">
            <img
              src="/images/logo-dark-transparent.png"
              className="h-[90px] w-[99px] -mb-3"
              alt="logo"
            />
            <h1 className="pt-3 text-[21px] font-semibold text-dark mobile:text-[15px]">
              Account Sign Up
            </h1>
          </header>
          <div className=" flex flex-col gap-3">
            <Formik
              initialValues={formikInitialValues}
              validationSchema={SignUpFormSchema}
              onSubmit={handleAuthSubmit}
            >
              {({ isSubmitting }: { isSubmitting: boolean }) => {
                return (
                  <Form>
                    <div className="flex flex-col gap-1 space-y-3">
                      <div className="flex flex-row gap-3 mobile:flex-col">
                        <CustomForm
                          label="First name"
                          name="first_name"
                          type="text"
                          placeholder="John"
                        />
                        <CustomForm
                          label="Last name"
                          name="last_name"
                          type="text"
                          placeholder="Doe"
                        />
                      </div>
                      <CustomForm
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="john.doe@email.com"
                      />
                      <div className="flex flex-row gap-3 mobile:flex-col">
                        <CustomForm
                          label="Password"
                          name="password"
                          type={isPassHidden ? 'password' : 'text'}
                          placeholder="●●●●●●●"
                          isPassHidden={isPassHidden}
                          setIsPassHidden={setIsPassHidden}
                        />
                        <CustomForm
                          label="Confirm password"
                          name="password_confirmation"
                          type={isPassHidden ? 'password' : 'text'}
                          placeholder="●●●●●●●●"
                        />
                      </div>
                    </div>

                    <Button
                      isAuth
                      isSubmitting={isSubmitting}
                      value="Continue"
                      className="mt-[39px]"
                    />
                  </Form>
                )
              }}
            </Formik>

            <div className="flex flex-col gap-5 justify-center items-center">
              <span className="block text-[12px] text-md font-medium text-barclerk-10">
                Already have an account?
                <span className="text-barclerk-30 cursor-pointer hover:text-barclerk-30/70 ml-1">
                  <Link href="./sign-in">Login</Link>
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
export default SignUp
