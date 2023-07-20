import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Image, Item } from "@prisma/client";
import { format } from "date-fns";

interface Props {
  items: (Item & {
    images: Image[];
  })[];
}

export const RecentItems: React.FC<Props> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div>
        <span>No items yet.</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {items.map(item => (
        <div className="flex items-center" key={item.id}>
          <Avatar>
            <AvatarImage src={item.images[0].url} alt={item.name} />
          </Avatar>
          <div className="ml-4 space-y-1">
            <h3 className="text-sm font-medium leading-none">
              {item.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              Added on {format(new Date(item.createdAt), "MM/dd/yyyy")}
            </p>
          </div>
          <div className="ml-auto font-medium">
            <p className="text-sm tracking-wide">
              {item.isFeatured ? (
                <span className="text-green-500">Featured</span>
              ) : (
                <span className="text-red-500">Not Featured</span>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
