import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) return redirect("/sign-in");

  const wardrobe = await prisma.wardrobe.findFirst({
    where: {
      userId,
    },
  });

  if (wardrobe) {
    redirect(`/${wardrobe.id}`);
  }

  return <>{children}</>;
}
