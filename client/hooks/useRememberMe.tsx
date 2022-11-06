import {
  getCookie,
  setCookie,
  deleteCookie
} from "cookies-next";
import { Cookie } from "shared/types";
import React, { useState } from "react";

const useRememberMe = () => {
  const [rememberMe, setRememberMe] = useState<string>("");

  const rememberedEmail: Cookie = getCookie('email') || "";
  const isRemembered: Cookie = getCookie('isRemembered') || false;

  const onChangeRemember = (e: { target: any }) => {
    const { value, name } = e.target;
    if (name === "password") return;

    setRememberMe(value);
    if (isRemembered) return setCookie('email', value);
  }

  const onClickRemember = (e: { target: any }) => {
    const { checked } = e.target;

    setCookie('isRemembered', checked);
    if (!checked) return deleteCookie('email');
    setCookie('email', rememberMe)
  }

  return { rememberedEmail, isRemembered, onChangeRemember, onClickRemember };
};

export default useRememberMe;
