import Container from "@/components/container";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import OutfitClient from "./components/outfit-client";
import { format } from "date-fns";
import { formattedOutfit } from "@/types";

const OutfitsPage = async ({ params }: { params: { wardrobeId: string } }) => {
  // TODO: add pagination

  const outfits = await prisma.outfit.findMany({
    include: {
      likes: true,
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 16,
  });

  const formattedOutfits: formattedOutfit[] = outfits.map(outfit => ({
    id: outfit.id,
    name: outfit.name,
    season: outfit.season,
    likes: outfit.likes.length,
    createdAt: format(new Date(outfit.createdAt), "MM/dd/yyyy"),
    items: outfit.items.length
  }));

  return (
    <Container>
      <section className="flex flex-col mt-8 space-y-8">
        <OutfitClient 
        outfits={formattedOutfits}
        />
      </section>
    </Container>
  );
};

export default OutfitsPage;
