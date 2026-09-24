import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

export const db = postgres<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
});

// const connectDB = async()=>{

//   try {

//     await db.connect()
//     console.log("DB Connected via PRISMA")

//   } catch (error) {
    
//     console.log(error)

//   }

// }

// const disconnectDB = async()=>{

//   try {

//     await db.
//     console.log("DB Connected via PRISMA")

//   } catch (error) {
    
//     console.log(error)

//   }

// }