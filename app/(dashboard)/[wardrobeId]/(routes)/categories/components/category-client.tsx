'use client'

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";

import { Plus } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

import {DataTable} from "@/components/ui/data-table";
import { CategoryColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";

interface CategoryTableProps {
    data: CategoryColumn[];
}

const CategoryClient = ({data}: CategoryTableProps) => {
    const router = useRouter();
    const params = useParams();

    return ( 
        <div className="mt-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 my-6">
                <Heading 
                title="Categories"
                subtitle="Manage your categories here."
                />
                <Button
                className="sm:mt-0 w-max"
                onClick={() => router.push(`/${params.wardrobeId}/categories/new`)}
                >
                    <Plus size={16} />
                    <span className="ml-2">Add Category</span>
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
        </div>
     );
}
 
export default CategoryClient;