'use client'
import { Button } from "@/components/ui/button";
import {ColumnDef} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import CellAction from "./cell-action";

export type CategoryColumn = {
    id: string;
    name: string;
    items: number;
    createdAt: string;
}


export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "items",
        header: "Items",
        cell: ({row}) => row.original.items,
    },
    {
        accessorKey: "createdAt",
        header: ({column}) => {
            return (
                <Button
                variant={"ghost"}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2" size={16} />
                </Button>
            )
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({row}) => <CellAction data={row.original} />,
    }
]