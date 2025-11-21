import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-screen w-screen">
      <Image
        // className="dark:invert"
        src="/logo.png"
        alt="DoMeuJeito logo"
        width={400}
        height={100}
        priority
      />
      <Spinner className="size-8" />
    </div>
  );
}
