import { Hono } from "@hono/hono";
import { transactionsRoute } from "./routes/transactions.ts";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Finance Manager działa");
});

app.route("/transactions", transactionsRoute);

Deno.serve(app.fetch);
