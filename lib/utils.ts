import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  const names = name.split(" ");
  const initials = names.map(n => n[0]).join("");
  return initials;
}

export const formatPrice = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
});

