"use client";
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
import { Category, Image, Item, Wardrobe } from "@prisma/client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { ItemValues } from "./create-item-form";

interface FormProps {
  onSubmit: SubmitHandler<ItemValues>;
  categories: Category[];
  wardrobe: Wardrobe[];
  onDelete: () => void;
  buttonText: string;
  form: UseFormReturn<ItemValues>;
  disabled?:
    | (Item & {
        images: Image[];
      })
    | null;
  link: () => void;
}

const CreateForm: React.FC<FormProps> = ({
  onSubmit,
  categories,
  onDelete,
  buttonText,
  link,
  disabled,
  form,
}) => {
  const maxDescriptionLength = 1000;

  return (
    <Form {...form}>
      <form className="space-y-8 my-8" onSubmit={form.handleSubmit(onSubmit)}>
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
                      ...field.value.filter(image => image.url !== url),
                    ])
                  }
                  onChange={url => field.onChange([...field.value, { url }])}
                />
              </FormControl>
              <FormDescription>
                Upload images of your item. You can upload up to 5 images.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FormField
            name="name"
            control={form.control}
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={formState.isSubmitting}
                    placeholder="Enter the name of your item"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="brand"
            control={form.control}
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={formState.isSubmitting}
                    placeholder="Enter the brand of your item"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="color"
            control={form.control}
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={formState.isSubmitting}
                    placeholder="Enter the color of your item"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="size"
            control={form.control}
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={formState.isSubmitting}
                    placeholder="Enter the size of your item"
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
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={formState.isSubmitting}
                  placeholder="Enter the description of your item"
                  maxLength={maxDescriptionLength}
                  minLength={10}
                />
              </FormControl>
              <FormDescription>
                {field.value.length}/{maxDescriptionLength} characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FormField
            name="categoryId"
            control={form.control}
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  disabled={formState.isSubmitting}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select a category"
                        defaultValue={field.value}
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
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Pattern</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={formState.isSubmitting}
                    placeholder="Enter the pattern of your item"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FormField
            name="isFavorite"
            control={form.control}
            render={({ field, formState }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    disabled={formState.isSubmitting}
                    // @ts-ignore
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Favorite</FormLabel>
                  <FormDescription>
                    Mark this item as your favorite
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            name="forSale"
            control={form.control}
            render={({ field, formState }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    disabled={formState.isSubmitting}
                    // @ts-ignore
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Would Like to sell?</FormLabel>
                  <FormDescription>Mark this item as for sale</FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            name="isFeatured"
            control={form.control}
            render={({ field, formState }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    disabled={formState.isSubmitting}
                    // @ts-ignore
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Featured</FormLabel>
                  <FormDescription>
                    Feature this item to be displayed on your profile
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            name="isArchived"
            control={form.control}
            render={({ field, formState }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    disabled={formState.isSubmitting}
                    // @ts-ignore
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Archive</FormLabel>
                  <FormDescription>
                    Archive this item to be hidden from your profile
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row justify-end space-x-2">
          <Button
            onClick={link}
            disabled={form.formState.isSubmitting}
            variant={"link"}
            type="button"
          >
            Cancel
          </Button>
          {disabled && (
            <Button
              disabled={form.formState.isSubmitting}
              variant="destructive"
              onClick={onDelete}
              type="button"
            >
              Delete
            </Button>
          )}
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateForm;
