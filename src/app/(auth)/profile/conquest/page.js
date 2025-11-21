import { auth } from "@/lib/auth";
import { Lamp, Trophy } from "lucide-react";
import { headers } from "next/headers";

export default async function Conquest() {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });

  const conquest = [
    {
      icone: <Lamp />,
      content: "teste",
    },
    {
      icone: <Lamp />,
      content: "teste",
    },
    {
      icone: <Lamp />,
      content: "teste",
    },
    {
      icone: <Lamp />,
      content: "teste",
    },
    {
      icone: <Lamp />,
      content: "teste",
    },
    {
      icone: <Lamp />,
      content: "teste",
    },
    {
      icone: <Lamp />,
      content: "teste",
    },
    {
      icone: <Lamp />,
      content: "teste",
    },
    {
      icone: <Lamp />,
      content: "teste",
    },
    {
      icone: <Lamp />,
      content: "teste",
    },
    {
      icone: <Lamp />,
      content: "teste",
    },
    {
      icone: <Lamp />,
      content: "teste",
    },
    {
      icone: <Lamp />,
      content: "teste",
    },
    {
      icone: <Lamp />,
      content: "teste",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center">
        <Trophy className="size-20 text-muted-foreground" />
        <span className="text-md font-medium text-center">Conquistas</span>
        <span className="text-sm font-medium text-center">13/50</span>
      </div>
      <div className="flex gap-1 border-2 m-2 p-2 rounded-md flex-wrap justify-center content-start">
        {conquest.map((item, index) => (
          <div
            className="rounded-[50%] size-16 flex items-center justify-center border"
            key={index}
          >
            {item.icone}
          </div>
        ))}
      </div>
    </div>
  );
}
