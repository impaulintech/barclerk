export type SignInUpFormValues = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
};

export type AxiosResponseError = {
  status: number | undefined
  content: any
}

export type SignInUpFormFields =
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'password'
  | 'password_confirmation';


export type User = {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  token: string;
};

export type InitialState = {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  error: AxiosResponseError;
};

export type Store = {
  auth: InitialState;
};

// Consumes a lot of time for me, for now I added type any. Need help on this.
export type Cookie = string | boolean | any; 
