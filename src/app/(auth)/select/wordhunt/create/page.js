"use client";
import { Button } from "@/components/ui/button";
import { checkAnonymousSession } from "@/lib/check-session";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateGame() {
  const router = useRouter();
  const [anonymous, setAnonymous] = useState(false);

  useEffect(() => {
    async function run() {
      const isAnonymous = await checkAnonymousSession();
      setAnonymous(isAnonymous);
    }
    run();
  }, []);

  if (anonymous)
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg ">Sem permissão suficiente para acessar essa página</p>
        <Button onClick={() => router.push("/")}>Voltar para Home</Button>
      </div>
    );

  return <>{anonymous}</>;
}
