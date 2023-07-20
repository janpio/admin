import { getWardrobe } from "@/actions/get-wardrobe";
import Heading from "@/components/ui/heading";
import CardStats from "@/components/sections/card-stats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentItems } from "@/components/sections/recent-items";
import { getOutfits } from "@/actions/get-oufits";

interface WardrobePageProps {
  params: {
    wardrobeId: string;
  };
}

const WardrobePage = async ({ params }: WardrobePageProps) => {
  const wardrobe = await getWardrobe(params.wardrobeId);
  const itemsLength = wardrobe?.items?.length || 0;
  const categoriesLength = wardrobe?.categories?.length || 0;
  const recentItems = wardrobe?.items?.slice(0, 5) || [];
  const outfits = await getOutfits();
  const outfitsLength = outfits?.length || 0;

  return (
    <section className="flex flex-col space-y-8 py-10 px-4">
      <Heading
        title={wardrobe?.name || "Wardrobe"}
        subtitle={wardrobe?.description || "This is a wardrobe."}
      />
      <div className="">
        <div className="space-y-8">
          <div aria-label="stats" className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <CardStats
              items={itemsLength}
              title="Items"
              description="Total items in wardrobe"
              image="/icons/clothes.png" 
              link={`/${params.wardrobeId}/items`}
            />
            <CardStats
              items={outfitsLength}
              title="Outfits"
              description="Total outfits in wardrobe"
              image="/icons/fashion.png" 
              link={`/${params.wardrobeId}/outfits`}
            />
            <CardStats
              items={categoriesLength}
              title="Categories"
              description="Categories of items"
              image="/icons/category.png" 
              link={`/${params.wardrobeId}/categories`}
            />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Items</CardTitle>
                <CardDescription>
                  You&apos;ve added {recentItems.length} items recently.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentItems items={recentItems} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Outfits</CardTitle>
                <CardDescription>
                  Your outfits have been viewed 30 times.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {outfits?.map(outfit => (
                  <div key={outfit.id} className="space-y-1">
                    <div className="flex items-center">
                      <h3 className="text-sm font-medium leading-none">{outfit.name}</h3>
                      <p className="text-sm text-muted-foreground ml-auto capitalize">{outfit.season}</p>
                    </div>
                    <div className="text-sm text-muted-foreground space-x-2">
                      <span>
                        {outfit.items.length} {outfit.items.length === 1 ? "item" : "items"}
                      </span>
                      <span>
                        {outfit.likes.length} {outfit.likes.length === 1 ? "like" : "likes"}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WardrobePage;
