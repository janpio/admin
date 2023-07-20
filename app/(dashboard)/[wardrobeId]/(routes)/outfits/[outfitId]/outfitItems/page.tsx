import Container from "@/components/container";
import Heading from "@/components/ui/heading";
import prisma from "@/lib/prisma";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const OutfitItemsPage = async ({
  params,
}: {
  params: { outfitId: string, wardrobeId: string };
}) => {
  const outfitItems = await prisma.outfitItem.findMany({
    where: {
      outfitId: params.outfitId,
    },
    include: {
      item: {
        include: { images: true },
      },
      outfit: true,
    },
  });

  return (
    <Container>
      <div className="my-16 flex justify-between items-center">
        <Heading
          title={`Outfit Items`}
          subtitle="Click on an item to remove it from this outfit."
        />
        <Link className="p-2 bg-slate-900 text-white hover:opacity-80 rounded-md" href={`/${params.wardrobeId}/outfits/${params.outfitId}/outfitItems/create`}>
          Create Outfit Item
        </Link>
      </div>
      <Table>
        <TableCaption>Outfit Items</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Favorite</TableHead>
            <TableHead>Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {outfitItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>No items in this outfit.</TableCell>
            </TableRow>
          ) : (
            outfitItems.map(outfitItem => (
              <TableRow key={outfitItem.id}>
                <TableCell className="font-medium">
                  {outfitItem.item.name}
                </TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={outfitItem.item.images[0].url}
                      alt={outfitItem.item.name}
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="font-light">
                  {outfitItem.item.isFavorite ? "Yes" : "No"}
                </TableCell>
                <TableCell className="font-light">
                  {outfitItem.item.size}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default OutfitItemsPage;
