import {z} from 'zod';

export const wardrobeSchema =z.object({
    name: z.string().min(1, {message: "Name must be at least 1 character long"}),
    description: z.string().min(1, {message: "Description must be at least 1 character long"}).max(1000, {
        message: "Description must be less than 1000 characters long"
    }),
});

export const categorySchema = z.object({
    name: z.string().min(1, {message: "Name must be at least 1 character long"}),
});