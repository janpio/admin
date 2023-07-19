"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const Navbar = ({
  className = "",
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) => {
  const params = useParams();
  const pathname = usePathname();

  const routes = [
    {
      name: "Dashboard",
      href: `/${params.wardrobeId}`,
      active: pathname === `/${params.wardrobeId}`,
    },
    {
      name: "Categories",
      href: `/${params.wardrobeId}/categories`,
      active: pathname === `/${params.wardrobeId}/categories`,
    },
    {
      name: "Outfits",
      href: `/${params.wardrobeId}/outfits`,
      active: pathname === `/${params.wardrobeId}/outfits`,
    },
    {
      name: "Clothes",
      href: `/${params.wardrobeId}/items`,
      active: pathname === `/${params.wardrobeId}/items`,
    },
    {
      name: "Settings",
      href: `/${params.wardrobeId}/settings`,
      active: pathname === `/${params.wardrobeId}/settings`,
    },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className={cn("hidden lg:flex items-center space-x-6", className)}
    >
      {routes.map(route => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
