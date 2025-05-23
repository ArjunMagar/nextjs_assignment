
// check if incoming req/user is logged in also check if logged in --> 
// role admin or not 

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

//@ts-ignore
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


const authMiddleware = async (req:NextRequest)=>{
    const session = await getServerSession(authOptions)
    
    if(!session || session.user.role !== "admin"){
        return Response.json({
            messsage : "You dont have permission to perform this action"
        },{status : 401})
    }
    return NextResponse.next()
}




export default authMiddleware