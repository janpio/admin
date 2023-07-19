import Container from "@/components/container";
import prisma from "@/lib/prisma";
import ItemsClient from "./components/items-client";
import { ItemColumn } from "./components/columns";
import { format } from "date-fns";

const ItemsPage = async ({
  params,
}: {
  params: {
    wardrobeId: string;
  };
}) => {
  const items = await prisma.item.findMany({
    where: {
      wardrobeId: params.wardrobeId,
    },
    include: {
      category: true,
        images: true,
        favorites: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedItems: ItemColumn[] = items.map(item => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    category: item.category.name,
    images: item.images.map(image => ({
        id: image.id,
        url: image.url,
    })),
    color: item.color,
    size: item.size,
    isArchived: item.isArchived,
    favorites: item.favorites.length,
    createdAt: format(new Date(item.createdAt), "MM/dd/yyyy"),
    isFavorite: item.isFavorite,
  }))

  return (
    <Container>
      <section>
        <ItemsClient items={formattedItems} />
      </section>
    </Container>
  );
};

export default ItemsPage;
