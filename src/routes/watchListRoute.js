import express from 'express'
import { addToWatchList, watchList } from '../controllers/watchListRouteController.js'


const router = express.Router()

router.get("/watchList", watchList)
router.post("/", addToWatchList)




export default router