import Image from "next/image";
import Title from "@/components/ui/title";
import { Heart } from "lucide-react";
import Actions from "@/app/(dashboard)/[wardrobeId]/(routes)/outfits/components/actions";

interface BoardProps {
  likes: number;
  season: string;
  title: string;
  id: string;
}

const Board: React.FC<BoardProps> = ({ likes, season, title, id }) => {
  return (
    <li className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shrink-0">
        <Image alt="Outfit Image" src="/outfit.jpg" width={400} height={300} />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <Title text={title} variant="H3" />
            <Actions id={id} />
          </div>
          <div className="flex justify-between items-center">
            <p className="mt-3 text-sm text-gray-500">{season}</p>
            <div className="flex justify-between items-center">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {likes} <Heart size={16} className="ml-2" /></span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Board;
