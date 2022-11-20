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
