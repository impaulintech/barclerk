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
        router.push('/sign-in');
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
    dispatch(signIn(data)).then(({ payload }) => {
      const { content, status } = payload || {};

      if (status) return toast.error(content?.email);
      toast.success('Welcome to dashboard!');
      router.push('/');
    });
  };

  const handleSignUpSubmit = async (
    data: SignInUpFormValues
  ): Promise<void> => {
    const creatingAccount = toast.loading('Creating your account...');

    dispatch(signUp(data)).then(({ payload }) => {
      const { status } = payload || {};
      toast.dismiss(creatingAccount);

      if (status) {
        return toast.error('Something went wrong.\nPlease try again later.');
      }

      toast.success('Account created successfully!');
      router.push('/');
    });
  };

  const ResetLinkSubmit = async (
    data: SignInUpFormValues
  ): Promise<void> => {
     
  };

  const ForgotPasswordSubmit = async (
    data: SignInUpFormValues
  ): Promise<void> => {
     
  };

  return {
    ResetLinkSubmit,
    handleAuthSignOut,
    handleSignInSubmit,
    handleSignUpSubmit,
    ForgotPasswordSubmit,
  };
};
