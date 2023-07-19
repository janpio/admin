import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { outfitId: string } }
) {
  const { outfitId } = params;

  try {
    const outfit = await prisma.outfit.findUnique({
      where: {
        id: outfitId,
      },
      include: {
        items: true,
        comments: true,
        likes: true,
        favorites: true,
      },
    });

    return NextResponse.json(outfit);
  } catch (error) {
    console.log("Error getting outfit: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { outfitId: string } }
) {
  const { outfitId } = params;
  const body = await req.json();
  const { userId } = auth();

  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  if (!outfitId) return new NextResponse("Bad Request", { status: 400 });

  const outfitOwner = await prisma.outfit.findUnique({
    where: {
      id: outfitId,
    },
  });

  if (outfitOwner?.userId !== userId)
    return new NextResponse("Unauthorized", { status: 401 });

  try {
    const editOutfit = await prisma.outfit.update({
      where: {
        id: outfitId,
      },
      data: {
        ...body,
      }
    });

    return NextResponse.json(editOutfit);
  } catch (error) {
    console.log("Error updating outfit: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { outfitId: string; itemId: string } }
) {
  //protect route
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  
  const { outfitId } = params;

  if (!outfitId) return new NextResponse("Bad Request", { status: 400 });

  const outfit = await prisma.outfit.findUnique({
    where: {
      id: outfitId,
    },
  });

  if (outfit?.userId !== userId)
    return new NextResponse("Unauthorized", { status: 401 });
  try {
    const deleteOutfit = await prisma.outfit.deleteMany({
      where: {
        id: outfitId,
      }
    })

    return NextResponse.json(deleteOutfit);
  } catch (error) {
    console.log("Error deleting outfit: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
