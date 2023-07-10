"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { wardrobeSchema } from "@/lib/validation";

import Modal from "@/components/ui/modal";
import { useWardrobeModal } from "@/hooks/use-wardrobe-modal";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";

type WardrobeValues = z.infer<typeof wardrobeSchema>;

const CreateWardrobeModal = () => {
  const { isOpen, onClose } = useWardrobeModal();
  const maxDescriptionLength = 1000;
  const {toast} = useToast();

  const form = useForm<WardrobeValues>({
    resolver: zodResolver(wardrobeSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const createWardrobe = async (values: WardrobeValues) => {
    try {
        const response = await axios.post("/api/wardrobes", values);
        window.location.assign(`/${response.data.id}`);
    } catch (error) {
        toast({
            title: "Error",
            description: "There was an error creating your wardrobe. Please try again.",
        })
    }
  }

  return (
    <Modal
      title="Create Wardrobe"
      description="To create a wardrobe, please fill out the form below."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="py-2 pb-4">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(createWardrobe)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Eg. Summer Vacation"
                      disabled={formState.isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter a name for your wardrobe.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="eg. This is a wardrobe for my summer vacation. I will be taking it to the beach and will need a lot of swimwear."
                      disabled={formState.isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    {form.watch("description").length}/{maxDescriptionLength}{" "}
                    characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-6 space-x-2 w-full">
              <Button
                disabled={form.formState.isSubmitting}
                variant="outline"
                onClick={onClose}
                type="button"
              >
                Cancel
              </Button>
              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateWardrobeModal;
