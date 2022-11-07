/* eslint-disable @next/next/no-img-element */
import Link from "next/link"; 
import { Formik, Form } from "formik";
import React, { useState } from "react";
 
import Button from "components/atoms/Button";
import useRememberMe from "hooks/useRememberMe";
import NextHead from "components/atoms/NextHead";
import { useAuthMethods } from "hooks/authMethods";
import { SignInFormSchema } from "shared/validation";
import CustomForm from "components/molecules/CustomForm";
import AdminAuthTemplate from "components/templates/AdminAuthTemplate";

const SignIn = () => {
  const {
    isRemembered,
    rememberedEmail,
    onClickRemember,
    onChangeRemember,
  } = useRememberMe();
  const { handleSignInSubmit } = useAuthMethods();
  const [isPassHidden, setIsPassHidden] = useState<boolean>(true);  

  const formikInitialValues = {
    email: "",
    password: ""
  }; 

  return (
    <>
      <NextHead title="BarClerk | Sign In" />
      <AdminAuthTemplate>
        <div className="flex flex-col gap-10 w-[360px]">
          <header className="flex flex-col items-center h-full justify-center">
            <img src="/images/logo-dark-transparent.png" className="h-[180px] w-[201px]" alt="logo" />
            <h1 className="text-[36px] font-semibold text-dark mobile:text-[30px]">Account Login</h1>
          </header>

          <div className=" flex flex-col gap-4">
            <Formik
              initialValues={formikInitialValues}
              validationSchema={SignInFormSchema}
              onSubmit={handleSignInSubmit}
            >
              {({ isSubmitting }): any => {
                return (
                  <Form>
                    <div className="flex flex-col gap-4" onChange={onChangeRemember}>
                      <CustomForm
                        label="Email address"
                        name="email"
                        type="email"
                        defaultValue={rememberedEmail}
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
                          defaultChecked={isRemembered}
                          onClick={onClickRemember}
                          className="h-3 w-3 rounded-sm border border-gray-300 bg-transparent"
                        />
                        <label htmlFor="remember" className="ml-2 font-semibold text-xs text-dark">
                          Remember me
                        </label>
                      </div>
                      <Link href="./forgot-password"><h1 className="ml-2 text-xs font-semibold text-dark">Forgot Password?</h1></Link>
                    </div>

                    <Button isSubmitting={isSubmitting} value="Login" className="mt-10" />
                  </Form>
                );
              }}
            </Formik>

            <div className="flex flex-col gap-5 justify-center items-center">
              <span className="block text-md font-medium text-dark">
                Doesn’t have an account yet?
                <span className="text-failed cursor-pointer hover:text-failed/70 ml-1" >
                  <Link href="./sign-up">Register</Link>
                </span>
              </span>
            </div>
          </div>
        </div>
      </AdminAuthTemplate>
    </>
  );
};

export { SignInUpAuthChecker as getServerSideProps } from 'utils/getServerSideProps';
export default SignIn;
