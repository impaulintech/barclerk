import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import withReactContent from 'sweetalert2-react-content';

import {
  reset,
  signIn,
  signOut,
  signUp,
  requestPasswordResetLink,
  resetPassword,
} from 'redux/auth/authSlice';
import redirect from 'utils/redirect';
import { swalDark } from 'utils/customSwal';
import { SignInUpFormValues, Store } from 'shared/types';
import { useAppDispatch, useAppSelector } from 'hooks/reduxSelector';

export const useAuthMethods = () => {
  const MySwal = withReactContent(Swal);
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

  const ResetLinkSubmit = async (email: string): Promise<void> => {
    const checkingAccount = toast.loading('Checking your account...');

    dispatch(requestPasswordResetLink(email)).then((action) => {
      const { status, message } = action.payload || {};
      const duration = { duration: 6000 };
      toast.dismiss(checkingAccount);

      if (status >= 400)
        return toast.error('We cannot find your email addres.', duration);
      if (message === 'Please wait before retrying.') {
      } else {
        toast.success(message, duration);
      }
    });
  };

  const ForgotPasswordSubmit = async (
    email: SignInUpFormValues
  ): Promise<void> => {
    const accountSetup = toast.loading('Setting up your new password...');
    
    dispatch(resetPassword(email)).then((res) => {
      const { status } = res.payload;
      const duration = { duration: 9000 };
      toast.dismiss(accountSetup);

      if (status >= 400) {
        return toast.error(
          'Token is invalid or expired.\nPlease request a new reset link.',
          duration
        );
      }

      MySwal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'You can now log in using your new password that you created!',
        confirmButtonText: 'Go to Dashboard',
        footer: `<span style="color:#F6F6F6">This page will be automatically redirected to login in <b>3</b>s.</span>`,
        timer: 3000,
        didOpen: () => {
          const b: any = MySwal.getContainer()?.querySelector('b');
          setInterval(() => {
            b.textContent = (
              (MySwal.getTimerLeft() || 3000 % 60000) / 1000
            ).toFixed(0);
          }, 1000);
        },
        ...swalDark,
      }).then((result: { isConfirmed: boolean }) => {
        if (result.isConfirmed) redirect('/');
        redirect('/');
      });
    });
  };

  return {
    ResetLinkSubmit,
    handleAuthSignOut,
    handleSignInSubmit,
    handleSignUpSubmit,
    ForgotPasswordSubmit,
  };
};
