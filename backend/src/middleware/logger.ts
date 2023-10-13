import { Request, Response, NextFunction } from "express"

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log("--- Request arrived at " + new Date().toISOString() + " ---")
  console.log(`[${req.method}] -> ${req.url}`)
  console.log(`Path variables: ${JSON.stringify(req.params, null, 2)}`)
  console.log(`Query params: ${JSON.stringify(req.query, null, 2)}`)

  next()
}