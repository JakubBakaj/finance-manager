import { Hono } from '@hono/hono'
import { Transation } from './models/transaction.ts'
const app = new Hono()

app.get('/', (c) => {
    return c.text('finance manager dziala')
})

app.get('/transactions', (c) => {
    const transactions: Transation[] = [
        {
            id: 1,
            title: 'water',
            amount: 2,
            type: 'expense',
            createdAt: new Date().toISOString(),
        },
    ]

    return c.json(transactions)
})

Deno.serve(app.fetch)
