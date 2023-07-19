"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AlertModal from "@/components/modals/alert-modal";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { ItemColumn } from "./columns";

import { Edit, Trash, MoreHorizontal, Plus } from "lucide-react";

export type CellActionProps = {
  data: ItemColumn;
};

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      axios.delete(`/api/${params.wardrobeId}/items/${data.id}`);
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
      setOpen(false);
      toast({
        title: "Success 🎉",
        description: "Item deleted successfully",
      });
    }
  };

  const addToOutfit = () => {
    router.push(`/outfits/new?item=${data}`);
  };

  return (
    <>
      {open && (
        <AlertModal
          title="Delete Item"
          onConfirm={handleDelete}
          onClose={() => setOpen(false)}
          loading={loading}
          description="Are you sure you want to delete this item?"
          isOpen={open}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={addToOutfit}>
            <Plus className="h-4 w-4 mr-2" />
            Add to Outfit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.wardrobeId}/items/${data.id}`)
            }
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={loading} onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
