import prisma from "@/lib/prisma";

export const getOutfits = async () => {
    const outfits = await prisma.outfit.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            items: true,
            comments: true,
            likes: true,
            favorites: true,
        }
    }).catch((err) => {
        console.log(err)
    });

    return outfits;
}