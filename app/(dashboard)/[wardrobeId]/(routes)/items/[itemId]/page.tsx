import prisma from "@/lib/prisma";
import CreateItemForm from "@/components/forms/create-item-form";

import React from "react";
import Container from "@/components/container";

const ItemPage = async ({
  params,
}: {
  params: {
    wardrobeId: string;
    itemId: string;
  };
}) => {
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
            initialData={item}
            categories={categories}
            />
        </section>
    </Container>
  );
};

export default ItemPage;
