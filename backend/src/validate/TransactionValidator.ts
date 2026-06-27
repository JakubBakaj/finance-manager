export function validateTransaction(t: unknown): string | null{
    if(typeof t !== "object" || t == null){
        return "Body must be an object!"
    }

    const data = t as Record<string, unknown>

        if (typeof data.title !== "string" || data.title.trim().length === 0) {
        return "Title is required"
    }

    if (typeof data.amount !== "number" || data.amount <= 0) {
        return "Amount must be greater than 0"
    }

    if (data.type !== "income" && data.type !== "expense") {
        return "Type must be income or expense"
    }

    return null
}