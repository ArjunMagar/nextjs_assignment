
import dbConnect from "@/database/connection"
import User from "@/database/models/User"




export async function GET() {
    dbConnect
    await User.create({
        username : "siddhartha",
        email : "arjun@202gmail.com",
        password : "hero",
        role : "student"


        
    })
    return Response.json({
        message : "you hit api route"
    })
 }