import express from "express"
import { z } from "zod"
import { load, save } from "../utils/db"

const router = express.Router()

const NewsScheme = z.object ({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    time: z.string(),
    chairs: z.boolean(),
    tables: z.boolean(),
    cabinets: z.boolean(),
    lamps: z.boolean(),
    frames: z.boolean(),
    carpits: z.boolean(),
})

router.post("/", async (req, res) => {
    const parseResult = NewsScheme.safeParse(req.body)

    if(!parseResult.success){
        return res.sendStatus(400)
    }
    const user = parseResult.data

    const data = await load("news")
    const news = NewsScheme.array().parse(data) 
    await save("news", [ ...news, { ...user, createdAt: new Date().toISOString() } ])

    res.send(user)
  
})

export { router }