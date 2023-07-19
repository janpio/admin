/*
Create a function that creates item to an outfit
*/
import prisma from "@/lib/prisma";
import { Item } from "@prisma/client";

// export const createItem = async (items: Item, outfitId: string) => {
//     try {
//         const createOutfitItem = await prisma.outfit.create({
//             data: {
//                 items: {
//                     create: {
//                         ...items,
//                     }
//                 },
//             }
//         })
//     } catch (error) {
//         console.log("CREATE ITEM ERROR: ", error);
//     }
// };