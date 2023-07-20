"use client";
import { Trash } from "lucide-react";

import { useForm } from "react-hook-form";
import { Wardrobe } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { wardrobeSchema } from "@/lib/validation";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

interface SettingsFormProps {
  initialData: Wardrobe;
}

type WardrobeValues = z.infer<typeof wardrobeSchema>;

const SettingsForm = ({ initialData }: SettingsFormProps) => {
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(wardrobeSchema),
    defaultValues: {
      name: initialData.name,
      description: initialData.description || "",
    },
  });

  const editWardrobe = async (values: WardrobeValues) => {
    try {
      await axios.patch(`/api/wardrobes/${params.wardrobeId}`, values);
      router.refresh();
    } catch (error) {
      toast({
        description: "Something went wrong.",
      });
    } finally {
      toast({
        description: "Your wardrobe has been updated.",
      });
    }
  };

  const deleteWardrobe = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/wardrobes/${params.wardrobeId}`);
      router.refresh();
      toast({
        title: "Wardrobe deleted",
        description: "Your wardrobe has been deleted.",
        duration: 3000,
        draggable: true,
      });
      router.push("/");
    } catch (error) {
      toast({
        description: "You must delete all items and outfits in this wardrobe first.",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              deleteWardrobe();
            }}
          >
            Retry
          </ToastAction>
        ),
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
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Delete wardrobe"
          description="Are you sure you want to delete this wardrobe? This action cannot be undone."
          onConfirm={deleteWardrobe}
          loading={loading}
        />
      )}
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(editWardrobe)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={formState.isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="description"
            control={form.control}
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormControl>
                  <Textarea {...field} disabled={formState.isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div
            aria-label="wardrobe actions"
            className="flex justify-end w-full space-x-4 items-center"
          >
            <Button
              type="button"
              variant="destructive"
              onClick={() => setOpen(true)}
              disabled={form.formState.isSubmitting}
              size={"icon"}
            >
              <Trash size={18} />
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
            <Link
              className="text-gray-500 hover:text-gray-600"
              href={`/${params.wardrobeId}`}
            >
              Cancel
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SettingsForm;
