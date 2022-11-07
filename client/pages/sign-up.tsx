/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import { Form, Formik } from "formik";

import Button from "components/atoms/Button";
import NextHead from "components/atoms/NextHead";
import { useAuthMethods } from "hooks/authMethods";
import { SignUpFormSchema } from "shared/validation";
import CustomForm from "components/molecules/CustomForm";
import { SignUpFormikInitialValues } from "shared/types";
import AdminAuthTemplate from "components/templates/AdminAuthTemplate"; 

const SignUp = () => {
  const { handleSignUpSubmit: handleAuthSubmit } = useAuthMethods();
  const [isPassHidden, setIsPassHidden] = useState<boolean>(true);

  const formikInitialValues: SignUpFormikInitialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  return (
    <>
      <NextHead title="BarClerk | Sign Up" />
      <AdminAuthTemplate>
        <div className="flex flex-col gap-10 max-w-[360px] min-w-[315px] w-full">
          <header className="flex flex-col items-center h-full justify-center">
            <img src="/images/logo-dark-transparent.png" className="h-[180px] w-[201px]" alt="logo" />
            <h1 className="text-[36px] font-semibold text-dark mobile:text-[30px]">Register Account</h1>
          </header>

          <div className=" flex flex-col gap-4">
            <Formik
              initialValues={formikInitialValues}
              validationSchema={SignUpFormSchema}
              onSubmit={handleAuthSubmit}
            >
              {({ isSubmitting }: { isSubmitting: boolean }) => {
                return (
                  <Form>
                    <div className="flex flex-col gap-4 ">
                      <div className="flex flex-row gap-4 mobile:flex-col">
                        <CustomForm
                          label="First Name"
                          name="first_name"
                          type="text"
                          placeholder="John"
                        />
                        <CustomForm
                          label="Last Name"
                          name="last_name"
                          type="text"
                          placeholder="Doe"
                        />
                      </div>
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
                      <CustomForm
                        label="Confirm Password"
                        name="password_confirmation"
                        type={isPassHidden ? "password" : "text"}
                        placeholder="●●●●●●●●"
                      />
                    </div>

                    <Button isSubmitting={isSubmitting} value="Register" className="mt-10" />
                  </Form>
                );
              }}
            </Formik>

            <div className="flex flex-col gap-5 justify-center items-center">
              <span className="block text-md font-medium text-barclerk-10">
                Already have an account?
                <span className="text-failed cursor-pointer hover:text-failed/70 ml-1" >
                  <Link href="./sign-in">Login</Link>
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
export default SignUp;
