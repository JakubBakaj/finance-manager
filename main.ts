import { Hono } from "@hono/hono"

const app = new Hono()

app.get("/", (c) =>{
    return c.text("finance mamager dziala")
})

Deno.serve(app.fetch)