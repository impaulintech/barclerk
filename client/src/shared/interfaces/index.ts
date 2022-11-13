export interface Matter {
  id: number
  client_name: string
  contribution: string | number | undefined | null
  restrictions: string
  extension: string
  total_prep_used: number
  total_fund_used: number
  remaining_fund: number
  next_court_date: string
  status: string
}
