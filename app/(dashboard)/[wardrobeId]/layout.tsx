import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import React from "react";
import { redirect } from "next/navigation";
import Header from "@/components/nav/header";

const DashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in ");
  }

  const wardrobe = await prisma.wardrobe.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!wardrobe) {
    redirect("/");
  }

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default DashboardLayout;
