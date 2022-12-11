export type RequiredValue = { 
    grant_id: number
    type_id: number
    description: string
    date: string
    hours: number
    amount: number
}

export type TimeEntries = { 
    data: {
        amount: number
        date: string
        description: string
        extension: {
            date_effective: string
            extension: string
            id: number
            remainingFunds: number
            totalFund: number
            totalFundUsed: number
        }
        hours: number
        id: number
    }[]
    links: {
        first: string
        last: string | null
        next: string | null
        prev: string | null
    }
    meta: {
        current_page: number
        from: number
        last_page: number
        links: {
            active: boolean
            label: string
            url: string | null
        }[]
        path: string
        per_page: number
        to: number
        total: number
    }
}

export type ExtensionList = {
    extension: string
    id: number
    types: {
        id: number
        rate: number
        time: number
        total_allowance: number
        type: string
    }[]
}[]
