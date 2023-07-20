import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

interface HeadingProps {
  title: string;
  subtitle: string;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col space-y-1">
      <h1 className={`${dmSans.className} text-2xl md:text-3xl font-bold text-primary`}>{title}</h1>
      <p className="text-muted-foreground text-sm md:text-base font-light">{subtitle}</p>
    </div>
  );
};

export default Heading;
