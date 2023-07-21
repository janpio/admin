import prisma from "@/lib/prisma";
import { format } from "date-fns";
import CategoryClient from "./components/category-client";
import { CategoryColumn } from "./components/columns";
import Container from "@/components/container";

const CategoriesPage = async ({
  params,
}: {
  params: { wardrobeId: string };
}) => {
  const categories = await prisma.category.findMany({
    where: {
      wardrobeId: params.wardrobeId,
    },
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map(category => ({
    id: category.id,
    name: category.name,
    items: category.items.length,
    createdAt: format(new Date(category.createdAt), "MMM dd, yyyy"),
  }));

  return (
    <Container>
      <section className="flex flex-col">
        <CategoryClient 
        data={formattedCategories}
        />
      </section>
    </Container>
  );
};

export default CategoriesPage;
