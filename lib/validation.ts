import { z } from "zod";

export const wardrobeSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 1 character long" })
    .max(1000, {
      message: "Description must be less than 1000 characters long",
    }),
});

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" }),
});

export const itemSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 1 character long" })
    .max(1000),
  categoryId: z.string(),
  color: z.string().nonempty({ message: "Color is required" }),
  size: z.string().nonempty({ message: "Size is required" }),
  brand: z.string().nonempty({ message: "Brand is required" }),
  pattern: z.string().nonempty({ message: "Pattern is required" }),
  isFavorite: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  isFeatured: z.boolean().default(false).optional(),
  forSale: z.boolean().default(false).optional(),
  images: z
    .object({
      url: z.string().nonempty({ message: "Image is required" }),
    })
    .array(),
  
})
