import { IMatter } from '../interfaces'

export type TMatterResponse = {
  data: IMatter[]
  links: TLinks
  meta: TMeta
}

export type TLinks = {
  first: string
  last: string
  prev: null
  next: null
}

export type TMeta = {
  current_page: number
  from: number
  last_page: number
  links: TLink[]
  path: string
  per_page: number
  to: number
  total: number
}

export type TLink = {
  url: null | string
  label: string
  active: boolean
}
