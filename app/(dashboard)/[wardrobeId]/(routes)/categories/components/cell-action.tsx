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

import { CategoryColumn } from "./columns";
import { Edit, Trash, MoreHorizontal, View } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import AlertModal from "@/components/modals/alert-modal";

interface CellActionProps {
  data: CategoryColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteCategory = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.wardrobeId}/categories/${data.id}`);
      router.refresh();
      toast({
        description: "Your category has been deleted.",
        title: "Category deleted",
        duration: 3000,
      });
    } catch (error) {
      toast({
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      {open && (
        <AlertModal
          loading={loading}
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Delete Category"
          description="Are you sure you want to delete this category? All items inside this category will be deleted as well."
          onConfirm={deleteCategory}
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
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.wardrobeId}/categories/${data.id}/items`)
            }
          >
            <View size={16} className="mr-2" />
            View Items
          </DropdownMenuItem>
          <DropdownMenuItem
          onClick={() => router.push(`/${params.wardrobeId}/categories/${data.id}/`)}
          >
            <Edit size={16} className="mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={loading}
            onClick={() => setOpen(true)}
          >
            <Trash size={16} className="mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
