import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import SettingsForm from "./components/settings-form";
import Heading from "@/components/ui/heading";
import Container from "@/components/container";

const SettingsPage = async ({ params }: { params: { wardrobeId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const wardrobe = await prisma.wardrobe.findFirst({
    where: {
      id: params.wardrobeId,
      userId,
    },
  });

  if (!wardrobe) {
    redirect("/");
  }

  return (
    <Container>
      <section className="flex flex-col space-y-8 ">
        <Heading title="Settings" subtitle="Manage your wardrobe settings" />
        <SettingsForm initialData={wardrobe} />
      </section>
    </Container>
  );
};

export default SettingsPage;
