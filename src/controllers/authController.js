import { use } from 'react';
import {db} from '../prisma/db.ts'
import bcrypt from 'bcryptjs';
import { generateToken } from '../helpers/generateToken.js';


const checkUser = async(email)=>{

    const userExist = await db.orm.public.User.
        where({email}).first();

    return userExist

}

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

    // console.log(userExist.id)

    const token = generateToken(newUser.id, res)

    res.status(201).json({
        message:"User created succesfully",
        data:{
            user:{
                name: newUser.name, 
                lastname: newUser.lastname, 
                email: newUser.email, 
                password: newUser.password
            },
            token
        }
    })

}

export const login = async (req,res)=>{


    const {email, password} = req.body

    const userExist = await db.orm.public.User.
        where({email}).first();

    if(userExist == null){
        return res
            .status(401)
            .json({error:"User Do not exist"})
    }

    const hashedPassword = await bcrypt.compare(password, userExist.password)

    if(!hashedPassword){

        return res
            .status(401)
            .json({error:"Invalid Password"})

    }

    const token = generateToken(userExist.id, res)

    return res.status(201).json({

        message:"Success",
        data:{
            userLogged:{
                email,
            },
            token
        } 

    })

}

export const logout = async (req, res)=>{

    res.cookie("jwt", "", {
        httpOnly:true,
        expires: new Date(0)
    })

    res.status(200).json({
        message:"Loggedout succesfully"
    })

}