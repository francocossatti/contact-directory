import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import db from "@/app/libs/db"

export async function POST(request: Request) {
    try {
        const data = await request.json()
    
        const usernameFound = await db.user.findUnique({
            where: {
                username: data.username
            }
        })
        const emailfound = await db.user.findUnique({
            where: {
                email: data.email
            }
        })
    
        if(usernameFound) {
            return NextResponse.json({
                message: "El username ya existe"
            }, {
                status: 400
            })
        } else if (emailfound){
            return NextResponse.json({
                message: "El email ya existe"
            }, {
                status: 400
            })
        }
    
        const hashedPassword = await bcrypt.hash(data.password, 10)
        const newUser = await db.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashedPassword
            }
        })
        return NextResponse.json(newUser)
    } catch (error: any) {
        return NextResponse.json(
        {
          message: error.message
        }, {
            status: 500
        })
    }
}