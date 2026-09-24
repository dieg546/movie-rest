import {db} from '../prisma/db.ts'
import bcrypt from 'bcryptjs';

export const register = async (req,res)=>{

    const { name, lastname, email, password} = req.body

    const userExist = await db.orm.public.User.
        where({email}).first();

    if(userExist != null){
        return res
            .status(400)
            .json({error:"User Already Exist"})
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = await db.orm.public.User.create({
        name,
        lastname,
        email, 
        password: hashedPassword
    })

    res.status(201).json({
        message:"User created succesfully",
        data:{
            user:{
                name: newUser.name, 
                lastname: newUser.lastname, 
                email: newUser.email, 
                password: newUser.password
            }
        }
    })

}