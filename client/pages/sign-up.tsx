/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Eye, EyeOff } from "react-feather";

import Button from "components/atoms/Button";
import NextHead from "components/atoms/NextHead";
import { useAuthMethods } from "hooks/authMethods";
import { SignUpFormSchema } from "shared/validation";

const SignUp = () => {
  const [isPassHidden, setIsPassHidden] = useState<boolean>(true);

  // Styles
  const starStyle = "text-rose-600";
  const textError = "text-barclerk-10";
  const borderError = "!border-barclerk-10";
  const labelStyle = "block text-md font-medium text-white";
  const inputStyle = "block w-full h-[36px] rounded-sm border-[2px] border-barclerk-light py-0.5 text-slate-900 outline-none focus:ring-1 focus:border-barclerk-30";

  // Handle form values
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting, handleBlur } = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: ""
    },
    validationSchema: SignUpFormSchema,
    onSubmit: () => { }
  })

  // Destructure the error 
  const {
    first_name: first_nameError,
    last_name: last_nameError,
    email: emailError,
    password: passwordError,
    password_confirmation: password_confirmationError
  } = errors || {};

  // Destructure if the field was touched
  const {
    first_name: first_nameTouched,
    last_name: last_nameTouched,
    email: emailTouched,
    password: passwordTouched,
    password_confirmation: password_confirmationTouched
  } = touched || {};

  // Destructure if was touched and has error
  const { first_nameHasError, last_nameHasError, emailHasError, passwordHasError, password_confirmationHasError } = {
    first_nameHasError: first_nameTouched && first_nameError,
    last_nameHasError: last_nameTouched && last_nameError,
    emailHasError: emailTouched && emailError,
    passwordHasError: passwordTouched && passwordError,
    password_confirmationHasError: password_confirmationTouched && password_confirmationError
  };

  // Form values
  const { first_name, last_name, email, password, password_confirmation } = values || {};

  return (
    <>
      <NextHead title="BarClerk | Sign Up" />
      <main className="bg-barclerk-30 min-h-screen h-full mobile:pb-20 mobile:pt-10 py-10 flex justify-center items-center px-10">
        <div className="flex flex-col gap-10 w-[360px]">
          <header className="flex flex-col items-center h-full justify-center">
            <img src="/images/logo-transparent.png" className="h-[180px] w-[201px]" alt="logo" />
            <h1 className="text-[36px] font-semibold text-white mobile:text-[30px]">Register Account</h1>
          </header>

          <form className="flex flex-col gap-4" method="POST" onSubmit={handleSubmit}>
            <div className="flex flex-row gap-4 mobile:flex-col">
              <div>
                <label htmlFor="first_name" className={labelStyle}>
                  <small className={starStyle}>*</small> First name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputStyle} ${first_nameHasError && borderError}`}
                />
                {first_nameHasError && <span className={textError}>{first_nameError}</span>}
              </div>

              <div>
                <label htmlFor="last_name" className={labelStyle}>
                  <small className={starStyle}>*</small> Last name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputStyle} ${last_nameHasError && borderError}`}
                />
                {last_nameHasError && <span className={textError}>{last_nameError}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelStyle}>
                <small className={starStyle}>*</small> Email address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputStyle} ${emailHasError && borderError}`}
              />
              {emailHasError && <span className={textError}>{emailError}</span>}
            </div>

            <div>
              <label htmlFor="password" className={labelStyle}>
                <small className={starStyle}>*</small> Password
              </label>
              <div className="relative">
                <input
                  type={isPassHidden ? "password" : "text"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputStyle} ${passwordHasError && borderError}`}
                />
                <button
                  type="button"
                  className={`
                    group absolute inset-y-0 right-0 block overflow-hidden rounded-r 
                    px-4 outline-none transition duration-75 ease-in-out
                  `}
                  onClick={() => setIsPassHidden(!isPassHidden)}
                >
                  {isPassHidden
                    ? <EyeOff className="h-4 w-4 text-slate-500 group-hover:text-slate-800 marker:group-focus:text-slate-800" />
                    : <Eye className="h-4 w-4 text-slate-500 group-hover:text-slate-800 group-focus:text-slate-800" />
                  }
                </button>
              </div>
              {passwordHasError && <span className={textError}>{passwordError}</span>}
            </div>

            <div>
              <label htmlFor="password_confirmation" className={labelStyle}>
                <small className={starStyle}>*</small> Confirm Password
              </label>
              <input
                name="password_confirmation"
                value={password_confirmation}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputStyle} ${password_confirmationHasError && borderError}`}
                type={isPassHidden ? "password" : "text"}
              />
              {password_confirmationHasError && <span className={textError}>{password_confirmationError}</span>}
            </div>

            <div className="flex flex-col gap-5 justify-center items-center">
              <Button isSubmitting={isSubmitting} value="Register" className="mt-5" />
              <span className={labelStyle}>
                Already have an account?
                <span
                  className="text-barclerk-10 cursor-pointer hover:text-barclerk-10/70 ml-1"
                >
                  <Link href="./login">Login</Link>
                </span>
              </span>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default SignUp;
