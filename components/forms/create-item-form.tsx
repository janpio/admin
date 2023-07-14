"use client";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { itemSchema } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { Category, Image, Item} from "@prisma/client";
import AlertModal from "../modals/alert-modal";
import Heading from "../ui/heading";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from "@/components/ui/image-upload";
import Link from "next/link";

interface CreateItemFormProps {
  initialData:
    | (Item & {
        images: Image[];
      })
    | null;
  categories: Category[];
}

export type ItemValues = z.infer<typeof itemSchema>;

const CreateItemForm: React.FC<CreateItemFormProps> = ({
  initialData,
  categories,
}) => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const maxDescriptionLength = 1000;

  const title = initialData ? "Edit Item" : "Create Item";
  const desc = initialData ? "Edit your item" : "Create a new item";
  const buttonText = initialData ? "Edit Item" : "Create Item";
  const toastMessage = initialData ? "Item updated successfully" : "Item created successfully";

  const form = useForm<ItemValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: initialData ? {
      ...initialData,
    } : {
      name: "",
      brand: "",
      size: "",
      color: "",
      description: "",
      categoryId: "",
      pattern: "",
      isFavorite: false,
      isFeatured: false,
      isArchived: false,
      images: [],
    }
  });

  const onSubmit = async (values: ItemValues) => {
    try {
      if(initialData) {
        await axios.patch(
          `/api/${params.wardrobeId}/items/${params.itemId}`,
          values
        )
      } else {
        await axios.post(`/api/${params.wardrobeId}/items`, values);
      }
      router.refresh();
      toast({
        title: "Success 🎉",
        description: toastMessage,
      });
      router.push(`/${params.wardrobeId}/items`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      axios.delete(`/api/${params.wardrobeId}/items/${params.itemId}`);
      router.push(`/${params.wardrobeId}/items`);
      toast({
        title: "Success 🎉",
        description: "Item deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
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
          title="Delete Item"
          onConfirm={handleDelete}
          onClose={() => setOpen(false)}
          loading={loading}
          description="Are you sure you want to delete this item?"
          isOpen={open}
        />
      )}
      <div className="flex flex-col space-y-8">
        <Heading title={title} subtitle={desc} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8"
          >
            <FormField
              name="images"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map(image => image.url)}
                      disabled={form.formState.isSubmitting}
                      onRemove={url =>
                        field.onChange([
                          ...field.value.filter(current => current.url !== url),
                        ])
                      }
                      onChange={url =>
                        field.onChange([...field.value, { url }])
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Upload images of your item. You can upload up to 5 images.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your item name"
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="brand"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="brand">Brand</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your item brand"
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="size"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="size">Size</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your item size"
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="color"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="color">Color</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your item color"
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter your item description"
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value.length}/{maxDescriptionLength} characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <FormField
                name="categoryId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="categoryId">Category</FormLabel>
                    <Select
                      disabled={form.formState.isSubmitting}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a category"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="pattern"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="pattern">Pattern</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your item pattern"
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <FormField
                name="isFavorite"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        disabled={form.formState.isSubmitting}
                        checked={field.value}
                        // @ts-ignore
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="isFavorite">Favorite</FormLabel>
                      <FormDescription>
                        Mark this item as a favorite
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                name="isFeatured"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        disabled={form.formState.isSubmitting}
                        checked={field.value}
                        // @ts-ignore
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="isFeatured">Featured</FormLabel>
                      <FormDescription>
                        Featured items are displayed on your profile
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                name="isArchived"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        disabled={form.formState.isSubmitting}
                        checked={field.value}
                        // @ts-ignore
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="isArchived">Archived</FormLabel>
                      <FormDescription>
                        Archived items are not visible to the public
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row justify-end space-x-4">
              <Link
              className="text-gray-500 hover:text-gray-600 hover:underline transition"
              href={`/${params.wardrobeId}/items`}>
                Cancel
              </Link>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {buttonText}
              </Button>
              {initialData && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setOpen(true)}
                >
                  Delete
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CreateItemForm;
