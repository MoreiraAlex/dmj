"use client";

import Image from "next/image";

export default function Coming() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 text-center px-4">
      <div className="animate-fadeIn">
        <Image
          src="/logo.png"
          alt="DoMeuJeito logo"
          width={300}
          height={100}
          priority
          className="opacity-90 drop-shadow-lg"
        />
      </div>

      <h1 className="text-4xl font-bold mt-4 animate-fadeInSlow">Em breve</h1>

      <p className="text-gray-500 max-w-md ">
        Estamos preparando algo novo e incrível para você. Volte mais tarde para conferir!
      </p>
    </div>
  );
}
