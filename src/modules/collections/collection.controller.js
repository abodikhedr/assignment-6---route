import { Router } from "express"
import * as CS from "./collection.service.js"



const collectionRouter = Router()
collectionRouter.post("/books",CS.createBookCollection)
collectionRouter.post("/authors",CS.createAuthorCollection)
collectionRouter.post("/logs",CS.createlogsCollection)
collectionRouter.post("/books/index",CS.createTitleIndex)



export default collectionRouter