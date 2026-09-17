
import express from "express"
import { connectionDB } from "./DB/connectionDB.js"
import bookRouter from "./modules/book/book.controller.js"
import collectionRouter from "./modules/collections/collection.controller.js"
import authorRouter from "./modules/author/author.controller.js"
import logRouter from "./modules/log/log.controller.js"
const port = 3000
const app = express()
const bootstrap = async () => {
    app.use(express.json())

    app.get("/", (req, res, next) => {
        res.status(200).json({ message: "welcome" })
    })
    await connectionDB(app,port)
    app.use("/collections",collectionRouter)
    app.use("/books", bookRouter)
    app.use("/authors",authorRouter)
    app.use("/logs",logRouter)


    app.use("{/*demo}", (req, res, next) => {
        res.status(404).json({ message: `url:${req.originalUrl()}, method:${req.method()} not found` })
    })
}




export default bootstrap
