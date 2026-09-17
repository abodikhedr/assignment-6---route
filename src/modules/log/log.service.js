import logModel from "../../DB/models/log.model.js"
import { ObjectId } from 'mongodb';
export const insertLog = async (req, res, next) => {
    try {
        const {book_id,action}=req.body
        const data = await logModel.insertOne({
            book_id:new ObjectId(book_id),
            action:action
        })
        res.status(201).json({ message: "log inserted successfully", data })
    } catch (error) {
        res.status(500).json({ error:error.message })
    }
}
