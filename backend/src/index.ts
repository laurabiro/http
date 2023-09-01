import express from "express"
import type { Request, Response } from "express"
import cors from "cors"
import { z } from "zod"
import fs from "fs/promises"

const server = express()

server.use(cors())
server.use(express.json())

const RequestSchema = z.object ({
    v1: z.string(),
    v2: z.string(),
})

const QuerySchema = z.object({
    name: z.string(),
})

type User = {
    id:number
    name:string
    age:number
}



const stringify = (data: User[]): string => data
.map(user => `${user.id},${user.name},${user.age}`).join("\r\n")

const parse = (data:string): User[] => data
    .split("\r\n")
    .filter(row => !!row)
    .map(row => ({
        id: +row.split(",")[0],
        name: row.split(",")[1],
        age: +row.split(",")[2],
    }))



// REST API - GET /api/users
server.get("/api/users", async (req:Request, res:Response) => {

    /* req.query
    req.headers
    req.method
    req.body
    req.path
    req.params */
    const userData = await fs.readFile("./database/users.txt", "utf-8")
    const users = parse(userData)

    const result = QuerySchema.safeParse(req.query)
    
    if (!result.success) {
        return res.json(users)
    }
    
    const query = result.data
    let filteredUsers = users.filter(user => user.name.includes(query.name))
   
    res.json(filteredUsers)
})

const NewUserScheme = z.object ({
    name:z.string(),
    age:z.number(),
})



// POST
server.post("/api/users", async (req:Request, res:Response) => {
    const result = NewUserScheme.safeParse(req.body)
    if(!result.success){
        return res.status(400).json(result.error.issues)
    }
    
    const userData = await fs.readFile("./database/users.txt", "utf-8")
    const users = parse(userData)

    const id = Math.random()
    users.push({name: result.data.name, age: result.data.age, id/* : users.length ? users[users.length-1].id + 1 : 0 */})
    fs.writeFile("./database/users.txt", stringify(users), "utf-8")

    res.json({ id })
})



// DELETE
// /api/users?name=John || /api/users?age=30&name=John
// path variable
server.delete("/api/users/:id", async (req:Request, res:Response) => {
    const id = +req.params.id
    
    const userData = await fs.readFile("./database/users.txt", "utf-8")
    const users: User[] = parse(userData)
    let filteredUsers = users.filter(user => user.id !== id)
    fs.writeFile("./database/users.txt", stringify(filteredUsers), "utf-8")

    if(filteredUsers){
        return res.sendStatus(200)
    }else{
        res.sendStatus(404)
    }

})


// GET /api/users/1 (id!!) path variable -> HTTP200
server.get("/api/users/:id", async (req:Request, res:Response) => {
    const id = +req.params.id

 /*    const result = QuerySchema.safeParse(req.query)
    if (!result.success) {
        return res.sendStatus(400)
    } */

    const userData = await fs.readFile("./database/users.txt", "utf-8")
    const users: User[] = parse(userData)

    /* res.json(users.filter(user => user.name.includes(query.name))) */

    let filteredUser = users.find(user => user.id === id)
    if(!filteredUser){
        return res.sendStatus(404)
    }
    
    res.json(filteredUser)

})

const PatchSchema = z.object ({
    name: z.string().min(1).optional(),
    age: z.number().optional(),
})


// PATCH
server.patch("/api/users/:id", async (req, res) => {
    const id= +req.params.id

    const result = PatchSchema.safeParse(req.body)
    if(!result.success)
        return res.status(400).json(result.error.issues)

    const userData = await fs.readFile("./database/users.txt", "utf-8")
    const users: User[] = parse(userData)

    let filteredUsers = users.map((user) => user.id === id ? {name: result.data.name || user.name, age: result.data.age === undefined ? user.age : result.data.age , id} : user)
    fs.writeFile("./database/users.txt", stringify(filteredUsers), "utf-8")

    if(filteredUsers){
        return res.sendStatus(200)
    }else{
        res.sendStatus(404)
    }


})

server.listen(3333)

// PRACTICE
// GET /api/tweets?content=valami (also without query params) -> array (empty...)
// GET /api/tweets/15 -> object / 404
// POST /api/tweets -> id / 400
// PATCH /api/tweets/15 -> 200 / 400 / 404
// DELETE /api/tweets/15 -> 200 / ?404

// GET /api/users/15/tweets -> array