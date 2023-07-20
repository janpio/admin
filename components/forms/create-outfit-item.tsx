"use client";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Outfit, Image as ImageType, Item } from "@prisma/client";
import Image from "next/image";
import { Avatar, AvatarImage } from "../ui/avatar";

interface CreateOutfitItemProps {
  items:
    | (Item & {
        images: ImageType[];
      })[];
  outfits: Outfit[];
}

interface FormValues {
  outfitId: string;
  itemId: string;
}

export const CreateOutfitItem = ({ items, outfits }: CreateOutfitItemProps) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<FormValues>({
    defaultValues: {
      outfitId: "",
      itemId: "",
    },
  });

  const handleCreateOutfitItem = async (values: FormValues) => {
    try {
      await axios.post(`/api/outfits/${params.outfitId}/outfitItems`, values);
      toast({
        title: "Success",
        description: "Outfit item created",
      });

      router.refresh();
      router.push(`/${params.wardrobeId}/outfits`);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        duration: 5000,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateOutfitItem)}
        className="flex space-x-7 mt-8"
      >
        <FormField
          control={form.control}
          name="outfitId"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="outfitId">Outfit</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[380px]">
                    <SelectValue placeholder="Select an outfit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {outfits.map(outfit => (
                    <SelectItem key={outfit.id} value={outfit.id}>
                      {outfit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select an outfit to add this item to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itemId"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="itemId">Item</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[380px]">
                    <SelectValue placeholder="Select an item" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {items.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      <div className="flex flex-row items-center space-x-2">
                        <Avatar>
                          <AvatarImage
                            src={item.images[0].url}
                            alt={item.name}
                          />
                        </Avatar>
                        <span>{item.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select an item to add to this outfit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row items-center justify-end space-x-2">
          <Button type="button" variant="link" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
