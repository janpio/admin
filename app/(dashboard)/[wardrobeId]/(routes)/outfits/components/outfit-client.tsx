"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Board from "@/components/ui/outfit-board";
import { formattedOutfit } from "@/types";
import { PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface OutfitClientProps {
  outfits: formattedOutfit[];
}

import React from "react";

const OutfitClient: React.FC<OutfitClientProps> = ({ outfits }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex flex-row items-center justify-between my-5">
        <Heading
          title={`Wardrobe Outfits (${outfits.length})`}
          subtitle="View all outfits in your wardrobe"
        />
        <Button
          onClick={() => router.push(`/${params.wardrobeId}/outfits/new`)}
        >
          <PlusCircle size={16} className="mr-2" />
          Add Outfit
        </Button>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {outfits.map(outfit => (
          <Board
            key={outfit.id}
            title={outfit.name}
            likes={outfit.likes}
            season={outfit.season}
            id={outfit.id}
            items={outfit?.items || 0}
          />
        ))}
      </ul>
    </>
  );
};

export default OutfitClient;
