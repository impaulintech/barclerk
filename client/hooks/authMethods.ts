import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

import { SignInUpFormValues, Store } from 'shared/types';
import { useAppDispatch, useAppSelector } from 'hooks/reduxSelector';
import { reset, signIn, signOut, signUp } from 'redux/auth/authSlice';

export const useAuthMethods = () => {
  const { error } = useAppSelector((state: Store) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAuthSignOut = async () => {
    dispatch(reset());
    toast.promise(
      dispatch(signOut()).then(() => {
        router.push('/');
      }),
      {
        loading: 'Signing out...',
        success: 'You have successfully signed out',
        error: error.content,
      }
    );
  };

  const handleSignInSubmit = async (
    data: SignInUpFormValues
  ): Promise<void> => {
    toast.promise(dispatch(signIn(data)), {
      loading: 'Signing in...',
      success: 'Welcome to dashboard!',
      error: error.content,
    });
  };

  const handleSignUpSubmit = async (
    data: SignInUpFormValues
  ): Promise<void> => {
    toast.promise(
      dispatch(signUp(data)).then(() => {
        router.push('/');
      }),
      {
        loading: 'Creating your account please wait...',
        success: 'Account created successfully!',
        error: error.content,
      }
    );
  };

  return {
    handleAuthSignOut,
    handleSignInSubmit,
    handleSignUpSubmit,
  };
};
