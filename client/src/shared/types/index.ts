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

// Consumes a lot of time for me, for now I added type any. Need help on this.
export type Cookie = string | boolean | any

export type MatterFormValues = {
  client_name: string
  matter_name: string
  email: string
  phone_number: string
  postal_address: string
  contribution: string | undefined | null | number
  court: string
  charges: string
  pre_trial_restriction: string
  on_bail_postal_address: string
  in_custody_location: string
  value?: string
}

export type CourtAppearanceFormValues = {
  date: string
  next_court_date: string
  time: string
  court: string
  judicial_officer: string
  orders: string
  other_notes?: string
}

export type TimeEntryFormValues = {
  description: string
  date: string
  extension: string
  type: string
  code: string
  hoursUnit: number
  ratePerHour: number
  amount: number
}

export type Profile = {
  first_name: string
  last_name: string
  email: string
}

export type Security = {
  current_password: string
  new_password: string
  confirm_password: string
}

export type GrantOfAidFormValues = {
  extension: string
  date_effective: string
  codes: {
    id: string
    code: string
  }[]
}
