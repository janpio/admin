import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const getOutfitItems = await prisma.outfitItem.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
        outfit: true,
        item: {
            include: {
                images: true,
            }
        }
    }
  });

  return NextResponse.json(getOutfitItems);
}

export async function POST(req: Request) {
  const { userId } = auth();
  const body = await req.json();

  if(!userId) return new NextResponse("Authentication is required", { status: 401 });


  try {
    const outfitItem = await prisma.outfitItem.create({
        data: {
            outfit: {
              connect: {
                id: body.outfitId,
              }
            },
            item: {
              connect: {
                id: body.itemId,
              }
            }
        },
        include: {
            outfit: true,
            item: {
                include: {
                    images: true,
                }
            }
        }
    });

    return NextResponse.json(outfitItem);
  } catch (error: any) {
    console.log("Error creating outfit item: ", error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
