import Image from "next/image";
import Title from "@/components/ui/title";
import Actions from "@/app/(dashboard)/[wardrobeId]/(routes)/outfits/components/actions";

interface BoardProps {
  likes: number;
  season: string;
  title: string;
  id: string;
  items: number;
}

const Board: React.FC<BoardProps> = ({ likes, season, title, id, items }) => {
  const seasonImage = () => {
    if (season === "winter") {
      return "/winter.jpg";
    } else if (season === "summer") {
      return "/summer.jpg";
    } else if (season === "spring") {
      return "/spring.jpg";
    } else if (season === "fall") {
      return "/fall.png";
    } else {
      return "/outfit.jpg";
    }
  };

  return (
    <li className="flex flex-col bg-card-foreground rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shrink-0">
        <Image
          className="h-48 w-full object-cover"
          src={seasonImage()}
          alt="Outfit"
          width={300}
          height={200}
        />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between bg-muted">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <Title text={title} variant="H3" />
            <Actions id={id} />
          </div>
          <div className="flex justify-between items-center">
            <p className="mt-3 text-sm text-gray-500">{season}</p>
            <div className="flex justify-between items-center">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {items} items
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Board;
