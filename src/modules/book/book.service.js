import { skip } from "node:test"
import bookModel from "../../DB/models/book.model.js"
import { title } from "node:process"






export const createbook = async (req, res, next) => {
    try {
        const data = await bookModel.insertOne(req.body)
        res.status(201).json({ message: "book inserted successfully", data })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const insertMultibleBooks = async (req, res, next) => {
    try {
        const books = req.body
        if (books.length < 3) {
            return res.status(405).json({ message: "insert 3 or more books" })
        }
        const data = await bookModel.insertMany(books)
        res.status(201).json({ message: "books inserted successfully", data })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const updateBook = async (req, res, next) => {
    try {
        const data = await bookModel.updateOne(req.params, {
            $set: req.body
        })
        res.status(201).json({ message: "book updated successfully", data })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const findBook = async (req, res, next) => {
    try {
        const title = req.query
        const data = await bookModel.findOne(title)
        res.status(200).json({ message: "book found", data })
    } catch (error) {
        res.status(500).json({ error })
    }
}


export const findBookBetween = async (req, res, next) => {
    try {

        const from = Number(req.query.from)
        const to = Number(req.query.to)

        const data = await bookModel.find({
            $and: [
                { year: { $gt: from } },
                { year: { $lt: to } }

            ]
        }).toArray()
        res.status(200).json({ message: "book found", data })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const findBookByGenre = async (req, res, next) => {
    try {

        const genre = req.query.genre
        const data = await bookModel.find({
            genres: { $elemMatch: { $eq: genre } }
        }).toArray()
        res.status(200).json({ message: "book found", data })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const skipAndLimit = async (req, res, next) => {
    try {


        const data = await bookModel.aggregate(
            [
                { $skip: 2 },
                { $limit: 3 },
                { $sort: { year: -1 } }
            ]
        ).toArray()
        res.status(200).json({ message: "book found", data })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const findBookYearInt = async (req, res, next) => {
    try {
        const data = await bookModel.find({
            year: { $type: "int" }
        }).toArray()
        res.status(200).json({ message: "book found", data })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const findBookExecludeGenre = async (req, res, next) => {
    try {
        const genre = req.query.genre.split(",")
        const data = await bookModel.find({
            genres: {
                $nin: genre
            }
        }).toArray()

        res.status(200).json({ message: "book found", data })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteAllBooksBefore = async (req, res, next) => {
    try {
        const year = Number(req.query.year)
        const data = await bookModel.deleteMany({
            year: { $lt: year }
        })
        res.status(200).json({ message: "book deleted", data })
    } catch (error) {
        res.status(500).json({ error })
    }
}


export const aggregate1 = async (req, res, next) => {
    try {
        const year = Number(req.query.year) || 2000
        const data = await bookModel.aggregate([
            { $match: { year: { $gt: year } } },
            { $sort: { year: -1 } }
        ]).toArray()
        res.status(200).json({ message: "book found", data })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const aggregate2 = async (req, res, next) => {
    try {
        const year = Number(req.query.year) || 2000
        const data = await bookModel.aggregate([
            { $match: { year: { $gt: year } } },
            { $sort: { year: -1 } },
            { $project: { title: 1, author: 1, year: 1, _id: 0 } }
        ]).toArray()
        res.status(200).json({ message: "book found", data })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const aggregate3 = async (req, res, next) => {
    try {

        const data = await bookModel.aggregate([
            { $unwind: "$genres" },
            { $project: { title: 1, genres: 1, _id: 0 } }
        ]).toArray()
        res.status(200).json({ message: "book found", data })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const aggregate4 = async (req, res, next) => {
    try {

        const data = await bookModel.aggregate([
            {
                $lookup: {
                    from:"logs",
                    localField:"_id",
                    foreignField:"book_id",
                    as:"status"
                }
            }
        ]).toArray()
        res.status(200).json({ message: "book found", data })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
