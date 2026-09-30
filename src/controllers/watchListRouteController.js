import { db } from "../prisma/db.ts"


export const watchList = async(req, res)=>{

    res.json({message:"Watch List Routes"})

}

export const addToWatchList = async(req, res)=>{

    const {movieId, status, rating, notes, userId} = req.body

    const movie = await db.orm.public.Movie
        .where({id:movieId}).first()

    if(movie==null){

        return res.status(404).json({

            error:"This movies does not exists"

        })

    }

    const existsInWatchList = await db.orm.public.WatchListItem
        .where({userId,movieId})
        .first()
    
    console.log("HEREEEE: ",existsInWatchList)

    if(existsInWatchList!=null){
        return res.status(404).json({

            error:"This movie is in the watchList"

        })
    }    

    const watchListItem = await db.orm.public.WatchListItem
        .create({

            userId,
            movieId,
            status: status || "PLANNED",
            rating,
            notes

        })

    res.status(201).json({

        message:"Added to WatchList Succesfully",
        data:watchListItem
        

    })

}