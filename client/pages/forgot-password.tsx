
/* eslint-disable @next/next/no-img-element */
import Router from "next/router";
import { Formik, Form } from "formik";
import React, { useState, useEffect } from "react";

import {
  ForgotPasswordFormSchema,
  ResetLinkSubmitFormSchema
} from "shared/validation";
import Button from "components/atoms/Button";
import NextHead from "components/atoms/NextHead";
import { useAuthMethods } from "hooks/authMethods";
import CustomForm from "components/molecules/CustomForm";
import AdminAuthTemplate from "components/templates/AdminAuthTemplate";

const ForgotPassword = () => {
  const { state }: any = Router?.router || {};
  const { user, verified } = state?.query || {};
  const { handleSignInSubmit, ResetLinkSubmit } = useAuthMethods();
  const [isPassHidden, setIsPassHidden] = useState<boolean>(true);
  const [isLinkClicked, setIsLinkClicked] = useState<boolean>(false);

  useEffect(() => {
    setIsLinkClicked((user && verified) ? true : false);
  }, [user, verified, isLinkClicked]);

  const setRequestResetLinkInitialValue = {
    email: "",
  };
  const RequestResetLink = () => {
    return (
      <Formik
        initialValues={setRequestResetLinkInitialValue}
        validationSchema={ResetLinkSubmitFormSchema}
        onSubmit={async ({ email }: { email: any; }) => {
          await ResetLinkSubmit(email);
        }}
      >
        {({ isSubmitting }): any => {
          return (
            <Form >
              <div className="flex flex-col gap-4">
                <CustomForm
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="john.doe@email.com"
                />
              </div>
              <div className="flex flex-row gap-3 mt-10 mb-5">
                <Button
                  value="Go Back"
                  onClick={(e) => {
                    e.preventDefault();
                    Router.push("/sign-in");
                  }}
                  className="!bg-transparent !text-light !border-2 !border-barclerk-10 hover:!border-transparent hover:!bg-barclerk-10/70"
                />
                <Button isSubmitting={isSubmitting} value="Continue" />
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  };

  const setupNewPasswordInitialValue = {
    password: "",
    password_confirmation: "",
  };
  const SetupNewPassword = (
    <div className="flex flex-col">
      <Formik
        initialValues={setupNewPasswordInitialValue}
        validationSchema={ForgotPasswordFormSchema}
        onSubmit={handleSignInSubmit}
      >
        {({ isSubmitting }): any => {
          return (
            <Form className="-mt-3">
              <div className="flex flex-col gap-3">
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
              <div className="flex flex-row gap-3 mt-10 mb-5">
                <Button
                  value="Go Back"
                  onClick={(e) => {
                    e.preventDefault();
                    Router.push("/forgot-password");
                  }}
                  className="!bg-transparent !text-light !border-2 !border-barclerk-10 hover:!border-transparent hover:!bg-barclerk-10/70"
                />
                <Button isSubmitting={isSubmitting} value="Continue" />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );

  return (
    <>
      <NextHead title="BarClerk | Sign In" />
      <AdminAuthTemplate hasBorder={true}>
        <div className="flex flex-col gap-10 w-[360px]">
          <header className="flex flex-col items-center h-full justify-center">
            <h1 className="text-[27px] font-semibold text-dark">{isLinkClicked ? "Setup your new password" : "Request password reset link"}</h1>
          </header>
          {isLinkClicked ? SetupNewPassword : <RequestResetLink />}
        </div>
      </AdminAuthTemplate>
    </>
  );
};

export { authCheck as getServerSideProps } from 'utils/getServerSideProps';
export default ForgotPassword;
