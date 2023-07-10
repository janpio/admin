import prisma from "@/lib/prisma";
import {auth} from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try {
        const wardrobes = await prisma.wardrobe.findMany({});
        return NextResponse.json(wardrobes);
    } catch (error) {
        console.log("GET ALL WARDROBES ERROR: ", error);
    }
}

export async function POST(req: Request) {
    try {
        const {userId} = auth();
        const body = await req.json();

        if(!userId) return new NextResponse("Unauthorized", {status: 401});
        if(!body.name || !body.description) return new NextResponse("Missing required fields", {status: 400});

        const wardrobe = await prisma.wardrobe.create({
            data: {
                ...body,
                userId,
            }
        });

        return NextResponse.json(wardrobe);
    } catch (error) {
        console.log("CREATE WARDROBE ERROR: ", error);
        return new NextResponse("Error creating wardrobe", {status: 500});
    }
}