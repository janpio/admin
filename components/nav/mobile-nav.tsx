"use client";
import { AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const params = useParams();
  const pathname = usePathname();

  const routes = [
    {
      name: "Dashboard",
      href: `/${params.wardrobeId}`,
      active: pathname === `/${params.wardrobeId}`,
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
      name: "Orders",
      href: `/${params.wardrobeId}/orders`,
      active: pathname === `/${params.wardrobeId}/orders`,
    },
    {
      name: "Settings",
      href: `/${params.wardrobeId}/settings`,
      active: pathname === `/${params.wardrobeId}/settings`,
    },
  ];

  return (
    <div className="lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size="icon">
            <AlignJustify size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {routes.map((route, i) => (
              <DropdownMenuItem key={i}>
                <Link
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    route.active
                      ? "text-black dark:text-white"
                      : "text-muted-foreground"
                  )}
                  href={route.href}
                >
                  {route.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileNav;
