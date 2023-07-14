import prisma from "@/lib/prisma";
import CreateItemForm from "@/components/forms/create-item-form";

import React from "react";
import Container from "@/components/container";
import { auth } from "@clerk/nextjs";

const ItemPage = async ({
  params,
}: {
  params: {
    wardrobeId: string;
    itemId: string;
  };
}) => {
    const {userId} = auth()

    const wardrobe = await prisma.wardrobe.findMany({
        where: {
            userId: userId as string,
        }
    });

    const item = await prisma.item.findUnique({
        where: {
            id: params.itemId,
        },
        include: {
            images: true,
        }
    });

    const categories = await prisma.category.findMany({
        where: {
            wardrobeId: params.wardrobeId,
        }
    });
  return (
    <Container>
        <section>
            <CreateItemForm 
            wardrobe={wardrobe}
            initialData={item}
            categories={categories}
            />
        </section>
    </Container>
  );
};

export default ItemPage;
