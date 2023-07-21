import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { outfitId: string ,outfitItemId: string } }
) {
  const { outfitItemId } = params;

  try {
    const getOutfitItem = await prisma.outfitItem.findUnique({
      where: {
        id: outfitItemId,
      },
      include: {
        outfit: true,
        item: {
          include: {
            images: true,
          },
        },
      },
    });

    return NextResponse.json(getOutfitItem);
  } catch (error) {
    console.log("Error getting outfit item: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { outfitId: string; outfitItemId: string} }
) {
  const { outfitItemId, outfitId } = params;
  const { userId } = auth();
  const body = await req.json();

  if (!userId)
    return new NextResponse("Authentication is required", { status: 401 });

    try {
      const outfitItem = await prisma.outfitItem.findMany({
        where: {
          outfitId: outfitId,
        }
      });
  
      //iterate through outfitItems and remove from the array the one that matches the outfitItemId
      const filteredOutfitItems = outfitItem.filter((item) => item.id !== outfitItemId);
  
      //update the outfit with the new array of outfitItems
      const updatedOutfit = await prisma.outfit.update({
        where: {
          id: outfitId,
        },
        data: {
          items: {
            set: filteredOutfitItems,
          }
        }
      });
  
      return NextResponse.json(updatedOutfit);
      
    } catch (error) {
      console.log("Error updating outfit item: ", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(
  req: Request,
  { params }: { params: { outfitId: string; outfitItemId: string} }
) {
  return new NextResponse("Not implemented", { status: 501 });
}
