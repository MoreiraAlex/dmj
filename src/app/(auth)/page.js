"use client";
import { Logout } from "@/components/botoes/auth";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      Home
      <Logout loading={loading} setLoading={setLoading} />
    </div>
  );
}
