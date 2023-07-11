import prisma from "@/lib/prisma";
import { format } from "date-fns";
import CategoryClient from "./components/category-client";
import { CategoryColumn } from "./components/columns";
import Link from "next/link";
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
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-screen space-y-2">
            <h1 className="text-2xl font-semibold">No categories found.</h1>
            <p className="text-gray-500 mt-2">
              Create a new category to get started.
            </p>
            <Link
              className="inline-block p-2 bg-gray-200 rounded-md"
              href={`/${params.wardrobeId}/categories/new`}
            >
              Create a category
            </Link>
          </div>
        ) : (
          <CategoryClient data={formattedCategories} />
        )}
      </section>
    </Container>
  );
};

export default CategoriesPage;
