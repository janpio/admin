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
  const { outfitItemId } = params;
  const { userId } = auth();
  const body = await req.json();

  if (!userId)
    return new NextResponse("Authentication is required", { status: 401 });

  try {
    const outfitItem = await prisma.outfitItem.update({
      where: {
        id: outfitItemId,
      },
      data: {
        outfit: {
          connect: {
            id: body.outfitId,
          },
        },
        item: {
          connect: {
            id: body.itemId,
          },
        },
      },
    });

    return NextResponse.json(outfitItem);
  } catch (error) {
    console.log("Error updating outfit item: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { outfitId: string; outfitItemId: string} }
) {
  const { outfitItemId, outfitId } = params;
  const { userId } = auth();

  if (!userId)
    return new NextResponse("Authentication is required", { status: 401 });

  try {
    //remove outfititem from outfit
    const outfitItem = await prisma.outfitItem.delete({
      where: {
        id: outfitItemId,
        outfitId: outfitId,
      },
    });

    return NextResponse.json(outfitItem);
  } catch (error) {
    console.log("Error deleting outfit item: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
