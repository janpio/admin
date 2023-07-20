"use client";
import { Image, Outfit, Item } from "@prisma/client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { z } from "zod";
import { outfitSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import AlertModal from "@/components/modals/alert-modal";
import Heading from "@/components/ui/heading";

interface FormProps {
  items: (Item & {
    images: Image[];
  })[];
  initialData: Outfit | null;
}

type OutfitValues = z.infer<typeof outfitSchema>;

const CreateForm: React.FC<FormProps> = ({ initialData, items }) => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const title = initialData ? "Edit Outfit" : "Create Outfit";
  const description = initialData ? "Edit your outfit" : "Create a new outfit";
  const buttonText = initialData ? "Edit Outfit" : "Create Outfit";
  const toastTitle = initialData ? "Outfit Updated" : "Outfit Created";
  const toastDescription = initialData
    ? "Your outfit has been updated"
    : "Your outfit has been created";

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(outfitSchema),
    defaultValues: {
      name: initialData?.name || "",
      season: initialData?.season || "",
    },
  });

  const onSubmit = async (values: OutfitValues) => {
    try {
      if (initialData) {
        await axios.patch(`/api/outfits/${initialData.id}`, values);
      } else {
        await axios.post(`/api/outfits`, values);
      }

      toast({
        title: toastTitle,
        description: toastDescription,
      });
      router.refresh();
      router.push(`/${params.wardrobeId}/outfits`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/outfits/${initialData?.id}`);
      toast({
        title: "Outfit Deleted",
        description: "Your outfit has been deleted",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      router.push(`/${params.wardrobeId}/outfits`);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Delete Outfit"
        description="Are you sure you want to delete this outfit? This action cannot be undone."
        onConfirm={onDelete}
        loading={loading}
      />
      
      <Heading title={title} subtitle={description} />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 mt-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter outfit name" />
                </FormControl>
                <FormDescription>Give your outfit a name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="season"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="season">Season</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Outfit Season" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="winter">Winter</SelectItem>
                    <SelectItem value="spring">Spring</SelectItem>
                    <SelectItem value="summer">Summer</SelectItem>
                    <SelectItem value="fall">Fall</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  What season is this outfit for?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex justify-end space-x-4">
            <Button
            variant="link"
            onClick={() => router.push(`/${params.wardrobeId}/outfits`)}
            type="button"
            >
              Cancel
            </Button>
            {/* {initialData && 
            <Button
            variant="destructive"
            onClick={() => setOpen(true)}
            type="button"
            >
              Delete
            </Button>} */}
            <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            >
              {buttonText}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateForm;
