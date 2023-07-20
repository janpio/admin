import Container from "@/components/container";
import Heading from "@/components/ui/heading";
import prisma from "@/lib/prisma";
import { CreateOutfitItem } from "@/components/forms/create-outfit-item";

const CreateOutfitItemPage = async ({
  params,
}: {
  params: { outfitId: string; wardrobeId: string };
}) => {
  const outfits = await prisma.outfit.findMany();
  const items = await prisma.item.findMany({
    include: {
      images: true,
    },
    where: {
      wardrobeId: params.wardrobeId,
    },
  });

  return (
    <Container>
      <Heading title="Create Outfit Item" subtitle="Choose the outfit and the items you would like to add" />
      <CreateOutfitItem items={items} outfits={outfits} />
    </Container>
  );
};

export default CreateOutfitItemPage;
