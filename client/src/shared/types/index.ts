export type SignInUpFormValues = {
  first_name?: string
  last_name?: string
  email?: string
  password?: string
  password_confirmation?: string
}

export type SignInFormikInitialValues = {
  email: string
  password: string
}

export type SignUpFormikInitialValues = {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
}

export type AxiosResponseError = {
  status: number | undefined
  content: any
}

export type SignInUpFormFields =
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'password'
  | 'password_confirmation'

export type User = {
  user: {
    id: number
    first_name: string
    last_name: string
    email: string
    created_at: string
    updated_at: string
  }
  token: string
}

export type InitialState = {
  user: User | null
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  error: AxiosResponseError
}

export type Store = {
  auth: InitialState
}

// Consumes a lot of time for me, for now I added type any. Need help on this.
export type Cookie = string | boolean | any

export type MatterFormValues = {
  client_name: string
  matter_name: string
  email: string
  phone: string
  postal_address: string
  contribution: string | undefined | null | number
  court: string
  charges: string
  pre_trial_restrictions: string
  on_bail_postal_address: string
  in_custody_location: string
}
