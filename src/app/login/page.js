"use client";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import { AnonymousButton, GoogleButton } from "@/components/botoes/auth";

export default function Login() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col gap-10 justify-center items-center h-screen w-screen">
      <Image src="/logo.png" alt="DoMeuJeito logo" width={400} height={100} priority />

      {loading ? (
        <Spinner className="size-8" />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <GoogleButton loading={loading} setLoading={setLoading} />
          <span className="font-bold italic">ou</span>
          <AnonymousButton setLoading={setLoading} />
        </div>
      )}
    </div>
  );
}
