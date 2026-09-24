//importando rutas
 
import movieRoutes from './routes/movieRoutes.js'
import authRoutes from './routes/authRoutes.js'


import express from "express"
import {config} from 'dotenv'

config();

const app = express();  
const PORT = 5001;


app.use(express.json())
app.use(express.urlencoded({extended:true}))

const server = app.listen(PORT,()=>{

    console.log(`Servidor correindo exitosamente. ${PORT}`)

})

app.get('/task', (req, res)=>{

    res.json({message:"Primera Prueba!"})

})

app.use("/movies", movieRoutes)
app.use("/auth", authRoutes)