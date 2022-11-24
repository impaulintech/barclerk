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
  extension?: string
  totalPrepUsed?: number
  totalFundUsed?: number
  remainingFund?: number
  nextCourtDate?: string
  preTrialRestriction?: IPreTrialRestriction
  status?: IStatus
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
  id: number
  code: string
}
