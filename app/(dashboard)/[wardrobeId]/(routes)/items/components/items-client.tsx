"use client";
import { ItemColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface ItemsClientProps {
  items: ItemColumn[];
}

const ItemsClient: React.FC<ItemsClientProps> = ({ items }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between my-5">
        <Heading
          title={`Wardrobe Items (${items.length})`}
          subtitle="View all items in your wardrobe"
        />
        <Button onClick={() => router.push(`/${params.wardrobeId}/items/new`)}>
            <Plus size={16} className="mr-2" />
            Add Item
        </Button>
      </div>
      <Separator />
      <DataTable 
      searchKey="name"
      columns={columns}
      data={items}
      />
    </>
  );
};

export default ItemsClient;
