import "express-async-errors"
import express from "express"
import cors from "cors"
import { logger } from "./middleware/logger"
import { router as furnitures } from "./routes/furnitures"
import { router as news } from "./routes/news"
import { errorHandler } from "./middleware/errorhandler"

const app = express()
app.use(cors())
app.use(express.json())
app.use(logger)
app.use((req, res, next) => {
  console.log("loading...\n")
  setTimeout(next, 2000)
})

app.use("/api/furnitures", furnitures)
app.use("/api/news", news)

app.use(errorHandler)

const PORT = 8000
app.listen(PORT, () => console.log(`Listening on ${PORT}...\n`))