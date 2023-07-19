"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Heart } from "lucide-react";
import CellAction from "./cell-action";
import Image from "next/image";

export type ItemColumn = {
  id: string;
  name: string;
  createdAt: string;
  isFeatured: boolean;
  category: string;
  color: string;
  size: string;
  isArchived: boolean;
  images: {
    id: string;
    url: string;
  }[];
  favorites: number;
  isFavorite: boolean;
};

export const columns: ColumnDef<ItemColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.original.images[0];
      return (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={image.url}
            alt={row.original.name}
            width={50}
            height={50}
            loading="lazy"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "favorited",
    header: "Favorited",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <Heart className="w-6 h-6 text-red-500" />
          <span className="ml-2 text-sm text-gray-500">
            {row.original.favorites}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFavorite",
    header: "Favorite",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => {
      return <CellAction data={row.original} />;
    },
  },
];
