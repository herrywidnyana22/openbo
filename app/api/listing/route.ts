import getCurrentUser from "@/app/action/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request:Request) {
    const user = await getCurrentUser()

    if(!user) return NextResponse.error()

    const body = await request.json()
    const {
        category,
        location,
        guestNumber,
        roomNumber,
        bathRoomNumber,
        image,
        price,
        title,
        desc
    } = body

    Object.keys(body).forEach((value: any) => {
        if(!body[value]){
            NextResponse.error()
        }
    })

    const createList = await prisma.listing.create({
        data:{
            category,
            locationValue: location.value,
            guestCount: guestNumber,
            roomCount: roomNumber,
            bathRoomCount: bathRoomNumber,
            image,
            price: parseInt(price),
            title,
            desc,
            userId: user.id
        }
    })

    return NextResponse.json(createList)
}