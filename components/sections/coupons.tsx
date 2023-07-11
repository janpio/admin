import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Title from "../ui/title";
import Typography from "../ui/typography";

const Coupons = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Coupons</CardTitle>
        <CardDescription>Coupons Available</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className=" bg-muted p-4 rounded-md">
            <Title variant="H3" text="10% Off" />
            <Typography text="Valid until 12/31/2024" />
            <p>
              Code: <span className="font-bold">10OFF</span>
            </p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <Title variant="H3" text="20% Off" />
            <Typography text="Valid until 12/31/2024" />
            <p>
              Code: <span className="font-bold">20OFF</span>
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        Manage Coupons <span className="text-pink-500 font-medium ml-4">here</span>
      </CardFooter>
    </Card>
  );
};

export default Coupons;
