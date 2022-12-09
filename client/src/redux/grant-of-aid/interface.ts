export interface ICode {
  id: number
  name: string
  code: string
  types: IType[]
}

export interface IType {
  id: number
  type: string
  rate: number
  time: number
  total_allowance: number
}

export interface IAddGrantOfAidPayload {
  client_id: string | string[] | undefined
  extension: string
  date_effective: string
  codes: number[]
}

export type GrantOfAidFields = 'extension' | 'date_effective' | 'codes'

export interface IGrantOfAid {
  id: number
  extension: string
  date_effective: string
}

export interface IGrantOfAidResponse {
  data: IGrantOfAid[]
  links: ILink
  meta: IMeta
}

export interface ILinks {
  first: string
  last: string
  prev: null
  next: null
}

export interface IMeta {
  current_page: number
  from: number
  last_page: number
  links: ILink[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface ILink {
  url: null | string
  label: string
  active: boolean
}

export interface IGOLRequest {
  client_id: string | string[] | undefined
  grant_id: number
}

export interface ISingleGrantofAid {
  id: number
  extension: string
  date_effective: string
  codes: ICode[]
}

export interface IGOLPaginate {
  client_id: string | string[] | undefined
  page: number
}

export interface IClause {
  value: number
  label: string
}

export interface IUpdatePayload {
  client_id: string | string[] | undefined
  grant_id: number
  extension: string
  date_effective: string
  codes: number[]
}
