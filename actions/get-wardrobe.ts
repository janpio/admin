import prisma from "@/lib/prisma";

export const getWardrobe = async (wardrobeId: string) => {
    const wardrobe = await prisma.wardrobe.findUnique({
        where: {
            id: wardrobeId
        }
    }).catch((err) => {
        console.log(err)
    });

    return wardrobe;
}

/*include: {
            items: {
                take: 100,
                include: {
                    outfits: true,
                }
            },
            categories: true,
            orders: true,
        } */