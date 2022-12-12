export interface IMatter {
  id: number
  email?: string
  clientName: string
  matterName?: string
  phoneNumber?: string
  postalAddress?: string
  contribution: number
  court?: string
  charges?: ICharges[]
  extension?: {
    extension?: string
    totalFund?: string
    totalFundUsed?: string
    remainingFunds?: string
  }
  courtAppearance?: {
    next_court_date?: string
  }
  preTrialRestriction?: IPreTrialRestriction
  status?: IStatus
}

export interface IMatterStatus {
  id: number
  name: string
}

export interface IClientProfile {
  id: number
  client_name: string
  charges?: ICharges[]
  contribution?: number
  court?: string
  court_appearances?: ICourtAppearance[]
  extensions?: IExtension[]
  matter_name?: string
  matter_status?: IMatterStatus
  pre_trial_restriction?: IPreTrialRestriction
  pre_trial_restriction_location_or_address: IPreTrialRestrictionLocation
}

export interface IPreTrialRestrictionLocation {
  client_id?: number
  created_at?: string
  pre_trial_restriction_id?: number
  updated_at?: string
  value?: string
}

export interface IExtension {
  id: number
  extension: string
  date_effective: number
}

export interface ICourtAppearance {
  id: number
  date?: string
  time?: string
  court?: string
  judicial_officer?: string
  next_court_date?: string
  orders?: string
  other_notes?: string
}

export interface ILastCourtDates {
  id: number
  date: string
  orders: string
}

export interface ITypes {
  id: number
  type: string
  rate: number
  time: number
  total_allowance: number
}

export interface IClientExtension {
  id: number
  extension?: string
  types?: ITypes[]
}

export interface ISingleClientExtension {
  preparation: number
  other_types: number
  attendance: number
  total_fund: number
  total_fund_used: number
  remaining_fund: number
}

export interface IUser {
  id: number
  first_name: string
  last_name: string
  email: string
  created_at: string
  updated_at: string
}

export interface IPreTrialRestriction {
  id: number
  name: string
}

export interface IStatus {
  id: number
  name: string
}

export interface ICharges {
  id: number
  name: string
}

export interface IGrantOfAid {
  id: number
  extension: string
  date_effective: string
  status: boolean
  codes: ICode[]
}

export interface ICode {
  value: string
  label: string
}

export interface ISingleMatter {
  id: number
  matter_name: string
  client_name: string
  email: string
  phone_number: string
  postal_address: string
  contribution: number
  court: string
  charges: ICharges[]
  pre_trial_restriction: {
    id: number
    name: string
  }
  pre_trial_restriction_location_or_address: {
    client_id: number
    pre_trial_restriction_id: number
    value: string
    created_at: string
    updated_at: string
  }
}
