import { Request,Response , NextFunction } from "express";
import jwt from  'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const {
TOKEN_SECRET
} = process.env

const verifiy_Token=async (req:Request,res:Response,next:NextFunction)=>{
    if (!req.headers.authorization) {
        res.status(401)
        res.json("invalid token")
        return; 
    }
        
        try{
        const authHeader=req.headers['authorization'] as string;
        const  token:string= authHeader && authHeader.split(' ')[1]
        jwt.verify(token,process.env.TOKEN_SECRET as string)
        next();
        
        }
        catch(err){
            res.status(401)
        }

}
export default verifiy_Token;