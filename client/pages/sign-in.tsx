/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Formik, Form } from "formik";
import { setCookie } from 'cookies-next';
import React, { useState } from "react";

import Button from "components/atoms/Button";
import NextHead from "components/atoms/NextHead";
import { SignInFormSchema } from "shared/validation";
import CustomForm from "components/molecules/CustomForm";

const SignIn = () => {
  const [isPassHidden, setIsPassHidden] = useState<boolean>(true);

  const formikInitialValues = {
    email: "",
    password: ""
  };

  const onClickRemember = (e: any) => {
    setCookie('isRemembered', e.target.checked);

    if (e.target.checked) {
      setCookie('email', formikInitialValues.email);
    }
  }

  return (
    <>
      <NextHead title="BarClerk | Sign Up" />
      <main className="bg-barclerk-30 min-h-screen h-full mobile:pb-20 mobile:pt-10 py-10 flex justify-center items-center px-10">
        <div className="flex flex-col gap-10 w-[360px]">
          <header className="flex flex-col items-center h-full justify-center">
            <img src="/images/logo-transparent.png" className="h-[180px] w-[201px]" alt="logo" />
            <h1 className="text-[36px] font-semibold text-white mobile:text-[30px]">Account Login</h1>
          </header>

          <div className=" flex flex-col gap-4">
            <Formik
              initialValues={formikInitialValues}
              validationSchema={SignInFormSchema}
              onSubmit={()=>{}}
            >
              {({ isSubmitting }): any => {
                return (
                  <Form>
                    <div className="flex flex-col gap-4 ">
                      <CustomForm
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="john.doe@email.com"
                      />
                      <CustomForm
                        label="Password"
                        name="password"
                        type={isPassHidden ? "password" : "text"}
                        placeholder="●●●●●●●"
                        isPassHidden={isPassHidden}
                        setIsPassHidden={setIsPassHidden}
                      />
                    </div>

                    <div className="flex justify-between mt-5">
                      <div className="flex items-center">
                        <input
                          id="remember"
                          type="checkbox"
                          value=""
                          onClick={onClickRemember}
                          className="h-3 w-3 rounded-sm border border-gray-300 bg-transparent"
                        />
                        <label htmlFor="remember" className="ml-2 text-xs text-gray-200">
                          Remember me
                        </label>
                      </div>
                      <Link href="./forgot-password"><h1 className="ml-2 text-xs text-gray-200">Forgot Password?</h1></Link>
                    </div>

                    <Button isSubmitting={isSubmitting} value="Login" className="mt-10" />
                  </Form>
                )
              }}
            </Formik>

            <div className="flex flex-col gap-5 justify-center items-center">
              <span className="block text-md font-medium text-slate-300">
                Doesn’t have an account yet?
                <span className="text-barclerk-10 cursor-pointer hover:text-barclerk-10/70 ml-1" >
                  <Link href="./sign-up">Register</Link>
                </span>
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
