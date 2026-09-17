import { title } from "node:process"
import { db } from "../../DB/connectionDB.js"
import authorModle from "../../DB/models/author.model.js"
import bookModle from "../../DB/models/book.model.js"





export const createBookCollection = async (req, res, next) => {
    try {
        await db.createCollection("books", {
            validator: {
                $and: [
                    { title: { $type: "string" } }
                ]
            }
        })
        res.status(201).json({ message: "book collection created successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const createAuthorCollection = async (req, res, next) => {
    try {
        const data = await authorModle.insertOne(req.body)
        res.status(201).json({ message: "author collection created successfully", data })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const createlogsCollection = async (req, res, next) => {
    try {
        await db.createCollection("logs", { capped: true, size: 1000000 })
        res.status(201).json({ message: "logs collection created successfully" })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const createTitleIndex= async (req, res, next) => {
    try {
        const data = await bookModle.createIndex({title:1})
        res.status(201).json({ message: "title index created successfully", data })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}