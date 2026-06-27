import { Hono } from '@hono/hono'
import type { Transaction } from '../models/transaction.ts'
import { validateTransaction } from '../validate/TransactionValidator.ts'
import { prisma } from '../db.ts'

export const transactionsRoute = new Hono()



transactionsRoute.get('/', async (c) => {
    const transactions = await prisma.transaction.findMany({orderBy: {createdAt: "desc"}})

    return c.json(transactions)
})



transactionsRoute.post("/", async (c) => {
    
    const body = await c.req.json()

    const error = validateTransaction(body)

    if (error !== null) {
        return c.json({ error }, 400)
    }

    const data = body as {
        title: string
        amount: number
        type: "income" | "expense"
    }

    const transaction = await prisma.transaction.create({
        data: {
            title: body.title.trim(),
            amount: body.amount,
            type: body.type
        }
    })
    return c.json(transaction, 201)
})
