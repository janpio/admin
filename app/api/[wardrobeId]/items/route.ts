import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { wardrobeId: string } }
) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || undefined;
  const color = searchParams.get("color") || undefined;
  const categoryId = searchParams.get("categoryId") || undefined;
  const brand = searchParams.get("brand") || undefined;
  const size = searchParams.get("size") || undefined;
  const skip = searchParams.get("skip");
  const take = searchParams.get("take");
  const isFeatured = searchParams.get("isFeatured");

  const items = await prisma.item.findMany({
    where: {
      wardrobeId: params.wardrobeId,
      name: name ? { contains: name } : undefined,
      color: color ? { contains: color } : undefined,
      categoryId,
      brand: brand ? { contains: brand } : undefined,
      size: size ? { contains: size } : undefined,
      isFeatured: isFeatured === "true" ? true : undefined,
    },
    skip: skip ? parseInt(skip, 0) : undefined,
    take: take ? parseInt(take, 16) : undefined,
  });

  return NextResponse.json(items);
}

export async function POST(
  req: Request,
  { params }: { params: { wardrobeId: string } }
) {
  const { userId } = auth();
  const body = await req.json();
  if (!params.wardrobeId)
    return new NextResponse("Bad Request", { status: 400 });
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const wardrobeOwner = await prisma.wardrobe.findFirst({
      where: {
        id: params.wardrobeId,
        userId: userId as string,
      },
    });

    if (!wardrobeOwner)
      return new NextResponse("Unauthorized", { status: 401 });

    const item = await prisma.item.create({
      data: {
        ...body,
        wardrobeId: params.wardrobeId,
        images: {
          createMany: {
            data: [...body.images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.log("Error creating wardrobe item: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
