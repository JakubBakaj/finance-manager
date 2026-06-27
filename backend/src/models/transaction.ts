export type TransactionType = 'income' | 'expense'

export type Transation = {
    id: number
    title: string
    amount: number
    type: TransactionType
    createdAt: string
}
