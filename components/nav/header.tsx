import { UserButton, auth } from "@clerk/nextjs";

import prisma from "@/lib/prisma";

import Navbar from "@/components/nav/navbar";
import WardrobeSwitcher from "@/components/nav/wardrobe-switcher";
import { redirect } from "next/navigation";
import MobileNav from "@/components/nav/mobile-nav";
import ThemeSwitcher from "@/components/nav/toggle";

const Header = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");

  const wardrobes = await prisma.wardrobe.findMany({
    where: {
      userId,
    },
  });

  return (
    <header className="h-16 flex justify-between items-center p-4 border-b">
      <div className="flex items-center space-x-4">
        <MobileNav />
        <WardrobeSwitcher items={wardrobes} />
      </div>
      <Navbar />
      <div className="flex items-center space-x-4">
        <ThemeSwitcher />
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
