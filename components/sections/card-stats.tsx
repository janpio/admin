import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface CardStatsProps {
  items: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

const CardStats: React.FC<CardStatsProps> = ({
  items,
  title,
  description,
  image,
  link,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div 
        className="flex items-center justify-center w-10 h-10 p-1 bg-muted  rounded-full">
          <Image
            src={image}
            width={40}
            height={40}
            alt={title}
            loading="lazy"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{items}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Link href={link}>
          See more
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardStats;
