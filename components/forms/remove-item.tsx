"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import AlertModal from "@/components/modals/alert-modal";
import { useToast } from "@/components/ui/use-toast";

import { Trash } from "lucide-react";

interface RemoveItemProps {
  outfitId: string;
  itemId: string;
  params: { outfitId: string };
}

const RemoveItem: React.FC<RemoveItemProps> = ({ outfitId, itemId, params }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();

  const handleRemoveItemFromOutfit = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/outfits/${outfitId}/outfitItems/${id}`);
      router.refresh();
      toast({
        title: "Success 🎉",
        description: "Item removed from outfit successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "You must delete the item from the wardrobe first.",
      })
    }
  }

  return (
    <>
      {open && (
        <AlertModal
          onClose={() => setOpen(false)}
          title="Remove Item"
          description="Are you sure you want to remove this item from this outfit?"
          onConfirm={() => handleRemoveItemFromOutfit(itemId)}
          isOpen={open}
          loading={loading}
        />
      )}
      <Button variant={"destructive"} size={"icon"} title="Remove Item" onClick={() => setOpen(true)} type="button">
        <Trash size={24} />
      </Button>
    </>
  );
};

export default RemoveItem;
