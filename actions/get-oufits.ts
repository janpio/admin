import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export const getOutfits = async () => {

    const { userId } = auth();

    const outfits = await prisma.outfit.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            items: true,
            comments: true,
            likes: true,
            favorites: true,
        },
        where: {
            userId: userId as string,
        }
    }).catch((err) => {
        console.log(err)
    });

    return outfits;
}