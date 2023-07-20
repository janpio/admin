import prisma from "@/lib/prisma";

export const getWardrobe = async (wardrobeId: string) => {
    const wardrobe = await prisma.wardrobe.findUnique({
        where: {
            id: wardrobeId,
        },
        include: {
            items: {
                include: {
                    images: true,
                    outfits: {
                        include: {
                            outfit: true,
                        }
                    }
                }
            },
            categories: true,
        }
    }).catch((err) => {
        console.log(err)
    });

    return wardrobe;
}
