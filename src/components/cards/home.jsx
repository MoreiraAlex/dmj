import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export function HomeCard({ href, image, title }) {
  return (
    <Card className="w-36 h-44 border border-primary bg-white/5 backdrop-blur-md flex flex-col items-center justify-between p-2 shadow-md hover:shadow-lg transition-shadow rounded-xl">
      <CardContent className="flex justify-center items-center w-full h-30 ">
        <Link href={href}>
          <Image src={image} alt={title} width={100} height={100} className="object-cover  " />
        </Link>
      </CardContent>
      <CardFooter className="text-sm font-bold whitespace-nowrap text-center">{title}</CardFooter>
    </Card>
  );
}
