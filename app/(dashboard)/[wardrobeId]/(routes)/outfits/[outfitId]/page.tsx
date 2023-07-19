import Container from "@/components/container";
import Form from "@/components/forms/form";
import prisma from "@/lib/prisma";


const Outfit = async({params}: {params: {wardrobeId: string; outfitId: string}}) => {
    const outfit = await prisma.outfit.findUnique({
        where: {
            id: params.outfitId
        }
    });


    const wardrobeItems = await prisma.item.findMany({
        where: {
            wardrobeId: params.wardrobeId
        },
        include: {
            images: true
        }
    });


  return (
    <Container>
        <Form 
        items={wardrobeItems}
        initialData={outfit}
        />
    </Container>
  )
}

export default Outfit