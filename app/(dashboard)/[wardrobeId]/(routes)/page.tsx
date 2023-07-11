import Calendar from "@/components/sections/calendar";
import Clock from "@/components/sections/clock";
import Coupons from "@/components/sections/coupons";
import ClientOnly from "@/components/client-only";
import { getWardrobe } from "@/actions/get-wardrobe";
import Heading from "@/components/ui/heading";
import CardStats from "@/components/sections/card-stats";

interface WardrobePageProps {
  params: {
    wardrobeId: string;
  };
}

const WardrobePage = async ({ params }: WardrobePageProps) => {
  const wardrobe = await getWardrobe(params.wardrobeId);

  return (
    <section className="flex flex-col space-y-8 py-10 px-4">
      <Heading
        title={wardrobe?.name || "Wardrobe"}
        subtitle={wardrobe?.description || "This is a wardrobe."}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <div aria-label="stats" className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <CardStats
              items={0}
              title="Items"
              description="Total items in wardrobe"
              image="/icons/clothes.png" 
              link={`/${params.wardrobeId}/items`}
            />
            <CardStats
              items={0}
              title="Outfits"
              description="Total outfits in wardrobe"
              image="/icons/fashion.png" 
              link={`/${params.wardrobeId}/outfits`}
            />
            <CardStats
              items={0}
              title="Orders"
              description="Number of sales"
              image="/icons/sales.png" 
              link={`/${params.wardrobeId}/orders`}
            />
            <CardStats
              items={0}
              title="Categories"
              description="Categories of items"
              image="/icons/category.png" 
              link={`/${params.wardrobeId}/categories`}
            />
          </div>
          {/* Recent Sales */}
          {/* Recent Orders */}
          {/* Recent Comments */}
          {/* Recent Products */}
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <ClientOnly>
            <Clock />
            <Calendar />
            <Coupons />
          </ClientOnly>
        </div>
      </div>
    </section>
  );
};

export default WardrobePage;
