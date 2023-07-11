import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { wardrobeId: string } }
) {
    try {
        const { wardrobeId } = params;
        if(!wardrobeId) return new NextResponse("Bad Request", { status: 400 });

        const wardrobe = await prisma.wardrobe.findUnique({
            where: {
                id: wardrobeId,
            },
            include: {
                items: true,
                categories: true,
                orders: true,
            }
        });

        return NextResponse.json(wardrobe);
    } catch (error) {
        console.log("Error getting wardrobe: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(
  req: Request,
  { params }: { params: { wardrobeId: string } }
) {
  const { wardrobeId } = params;
  const body = await req.json();
  const { name, description } = body;
  const { userId } = auth();

  try {
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!wardrobeId) return new NextResponse("Bad Request", { status: 400 });

    const wardrobe = await prisma.wardrobe.updateMany({
      where: {
        id: wardrobeId,
        userId,
      },
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(wardrobe);
  } catch (error) {
    console.log("Error updating wardrobe: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { wardrobeId: string } }
) {
  const { wardrobeId } = params;
  const { userId } = auth();

  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  if (!wardrobeId) return new NextResponse("Bad Request", { status: 400 });

  try {
    const wardrobe = await prisma.wardrobe.deleteMany({
      where: {
        id: wardrobeId,
        userId,
      },
    });

    return NextResponse.json(wardrobe);
  } catch (error) {
    console.log("Error deleting wardrobe: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
