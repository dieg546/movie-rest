import express from 'express'

const router = express.Router();

router.get('/Hello', (req, res)=>{
    
    res.json({message:"Hello from movies"})

})

export default router;