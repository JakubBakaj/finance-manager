import { Hono } from "@hono/hono"
import type { Transaction } from "../models/transaction.ts"

export const transactionsRoute = new Hono()

const transactions: Transaction[] = [
    {
        id: 1,
        title: "Kebab",
        amount: 25,
        type: "expense",
        createdAt: new Date().toISOString(),
    },
]

transactionsRoute.get("/", (c) => {
    return c.json(transactions)
})