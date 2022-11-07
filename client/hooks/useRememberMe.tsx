import {
  getCookie,
  setCookie,
  deleteCookie
} from "cookies-next";
import { useState } from "react";
import { Cookie } from "shared/types";

const useRememberMe = () => {
  const [rememberMe, setRememberMe] = useState<string>("");

  const rememberedEmail: Cookie = getCookie('email') || "";
  const isRemembered: Cookie = getCookie('isRemembered') || false;

  const onChangeRemember = (e: { target: any }): void => {
    const { value, name }: { value: string, name: string; } = e.target;
    if (name === "password") return;

    setRememberMe(value);
    if (isRemembered) return setCookie('email', value);
  };

  const onClickRemember = (e: { target: any }): void => {
    const { checked }: { checked: boolean; } = e.target;

    setCookie('isRemembered', checked);
    if (!checked) return deleteCookie('email');
    setCookie('email', rememberMe);
  };

  return { rememberedEmail, isRemembered, onChangeRemember, onClickRemember };
};

export default useRememberMe;
