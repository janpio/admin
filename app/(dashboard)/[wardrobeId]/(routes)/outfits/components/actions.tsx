"use client";
import { Button } from "@/components/ui/button";
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

import { useRouter, useParams } from "next/navigation";
import { Edit, Trash, MoreHorizontal, Plus, View } from "lucide-react";
import axios from "axios";
import { useState } from "react";


export type CellActionProps = {
  id: string;
};

const Actions: React.FC<CellActionProps> = ({ id }) => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      axios.delete(`/api/outfits/${id}`);
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
        description: "Outfit deleted successfully",
      });
    }
  };

  const handleEdit = () => {
    router.push(`/${params.wardrobeId}/outfits/${id}`);
  };

  return (
    <>
      {open && (
        <AlertModal
          title="Delete Outfit"
          description="Are you sure you want to delete this outfit? This action cannot be undone."
          isOpen={open}
          loading={loading}
          onClose={() => setOpen(false)}
          onConfirm={handleDelete}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleEdit}>
            <Edit size={16} className="mr-2" />
            Edit
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash size={16} className="mr-2" />
            Delete
          </DropdownMenuItem> */}
          <DropdownMenuItem
          onClick={() => router.push(`/${params.wardrobeId}/outfits/${id}/outfitItems`)}
          >
            <View size={16} className="mr-2" />
            See Outfit Items
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/${params.wardrobeId}/outfits/${id}/outfitItems/create`
              )
            }
          >
            <Plus size={16} className="mr-2" />
            Add Item to Outfit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Actions;
