import prisma from "@/lib/prisma";
import CategoryForm from "@/components/forms/create-category-form";
import Container from "@/components/container";

const CreateCategoryPage = async ({params}: {
    params: { wardrobeId: string, categoryId: string } 
}) => {
    const category = await prisma.category.findUnique({
        where: {
            id: params.categoryId
        }
    });

    const wardrobe = await prisma.wardrobe.findUnique({
        where: {
            id: params.wardrobeId
        }
    });

    return (
        <Container>
            <CategoryForm 
            initialData={category}
            />
        </Container>
    )
}


export default CreateCategoryPage;