export type GetMattersPayload = {
  page?: number
  status?: number
  searchQuery?: string
}

export type MatterFields =
  | 'client_name'
  | 'matter_name'
  | 'email'
  | 'phone_number'
  | 'postal_address'
  | 'contribution'
  | 'court'
  | 'charges'
  | 'pre_trial_restriction'
  | 'on_bail_postal_address'
  | 'in_custody_location'
  | 'value'

export type IUpdatePayload = {
  id: string | string[] | undefined
  client_name: string
  matter_name: string
  email: string
  phone_number: string
  contribution: string | undefined | null | number
  postal_address: string
  charges: string
  court: string
  pre_trial_restriction: string
  value?: string
}
