"use client";
import { useForm } from "react-hook-form";
import { Category } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/lib/validation";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AlertModal from "@/components/modals/alert-modal";
import Link from "next/link";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";

interface CategoryFormProps {
  initialData?: Category | null;
}

type CategoryValues = z.infer<typeof categorySchema>;

const CategoryForm = ({ initialData }: CategoryFormProps) => {
  const { toast } = useToast();
  const formTitle = initialData ? "Edit Category" : "Create Category";
  const formDescription = initialData
    ? "Edit your category filling out the required fields"
    : "Create a new category filling out the required fields";
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || "",
    },
  });

  const onSubmit = async (values: CategoryValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.wardrobeId}/categories/${params.categoryId}`,
          values
        );
      } else {
        await axios.post(`/api/${params.wardrobeId}/categories`, values);
      }
      router.refresh();
    } catch (error) {
      toast({
        description: "Something went wrong.",
      });
    } finally {
      setLoading(false);
      toast({
        description: initialData
          ? "Your category has been updated."
          : "Your category has been created.",
      });
    }
  };

  // delete category
  const deleteCategory = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.wardrobeId}/categories/${params.categoryId}`
      );
      router.push(`/${params.wardrobeId}/categories`);
    } catch (error) {
      toast({
        description: "Something went wrong.",
      });
    }
  };

  return (
    <>
      {open && (
        <AlertModal
          isOpen={open}
          loading={loading}
          onClose={() => setOpen(false)}
          title="Delete Category"
          description="Are you sure you want to delete this category? This action cannot be undone."
          onConfirm={deleteCategory}
        />
      )}
      <Heading title={formTitle} subtitle={formDescription} />
      <Form {...form}>
        <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 mt-8"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={formState.isSubmitting}
                    placeholder="Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(true)}
              disabled={initialData ? false : true}
            >
              Delete
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Save
            </Button>
            <Link className="p-2 underline" href={`/${params.wardrobeId}/categories`}>
              Cancel
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CategoryForm;
