import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

import { SignInUpFormValues } from 'shared/types';
import { useAppDispatch, useAppSelector } from 'hooks/reduxSelector';
import { reset, signIn, signOut, signUp } from 'redux/auth/authSlice';

export const useAuthMethods = () => {
  const { isError, error } = useAppSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAuthSignOut = async () => {
    await dispatch(signOut());
    dispatch(reset());
    if (!isError) {
      toast.success('You have successfully signed out');
      router.push('/');
    } else {
      toast.error(error.content);
    }
  };

  const handleSignInSubmit = async (
    data: SignInUpFormValues
  ): Promise<void> => {
    await dispatch(signIn(data));
  };

  const handleSignUpSubmit = async (
    data: SignInUpFormValues
  ): Promise<void> => {
    await dispatch(signUp(data));
    if (!isError) {
      toast.success('Account registered successfully.');
      router.push('/');
    } else {
      toast.error(error.content);
    }
  };

  return {
    handleAuthSignOut,
    handleSignInSubmit,
    handleSignUpSubmit,
  };
};
