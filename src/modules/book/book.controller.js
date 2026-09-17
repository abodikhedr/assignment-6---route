import { Router } from "express";
import * as BS from "./book.service.js";

const bookRouter = Router()
bookRouter.post("/",BS.createbook)
bookRouter.post("/batch",BS.insertMultibleBooks)
bookRouter.patch("/:title",BS.updateBook)
bookRouter.get("/title",BS.findBook)
bookRouter.get("/year",BS.findBookBetween)
bookRouter.get("/genre",BS.findBookByGenre)
bookRouter.get("/skip-limit",BS.skipAndLimit)
bookRouter.get("/year-int",BS.findBookYearInt)
bookRouter.get("/execlude-genres",BS.findBookExecludeGenre)
bookRouter.delete("/before-year",BS.deleteAllBooksBefore)
bookRouter.get("/aggregate1",BS.aggregate1)
bookRouter.get("/aggregate2",BS.aggregate2)
bookRouter.get("/aggregate3",BS.aggregate3)
bookRouter.get("/aggregate4",BS.aggregate4)










export default bookRouter