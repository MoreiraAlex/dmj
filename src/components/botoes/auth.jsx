"use client";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { Home, LogOut } from "lucide-react";
import { useState } from "react";

export function GoogleButton({ loading, setLoading }) {
  async function signInGoogle() {
    try {
      setLoading(true);
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (err) {
      console.log("ERROR GOOGLE:", err);
      setLoading(false);
    }
  }

  return (
    <Button
      variant="outline"
      className="w-3xs hover:cursor-pointer"
      onClick={signInGoogle}
      disabled={loading}
    >
      <FcGoogle />
    </Button>
  );
}

export function AnonymousButton({ loading, setLoading }) {
  const router = useRouter();

  async function signInAnonymous() {
    try {
      setLoading(true);
      await authClient.signIn.anonymous({
        fetchOptions: {
          onSuccess: () => {
            router.replace("/");
          },
        },
      });
    } catch (err) {
      console.log("ERROR ANONYMOUS:", err);
      setLoading(false);
    }
  }

  return (
    <Button
      variant="link"
      onClick={signInAnonymous}
      disabled={loading}
      className="font-bold italic underline"
    >
      Entrar como anônimo
    </Button>
  );
}

export function Logout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function logout() {
    try {
      setLoading(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.replace("/login");
          },
        },
      });
    } catch (err) {
      console.log("ERROR LOGOUT:", err);
      setLoading(false);
    }
  }

  return (
    <Button variant="ghost" disabled={loading} onClick={logout}>
      <LogOut className="size-10" />
    </Button>
  );
}
