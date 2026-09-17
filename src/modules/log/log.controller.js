import { Router } from "express"
import * as LS from "./log.service.js"



const logRouter = Router()
logRouter.post("/",LS.insertLog)


export default logRouter