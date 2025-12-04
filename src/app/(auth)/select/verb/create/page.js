"use client";
import { Verbo } from "@/actions/create-game";
import CreateVerbHelp from "@/components/helpers/createVerb";
import { PasswordCreateModal } from "@/components/modals/passwordCreate";
import { AchievementsSonner } from "@/components/sonner/AchievementsSonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { checkAnonymousSession } from "@/lib/check-session";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateGame() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [unlockAchievement, setUnlockAchievement] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [errors, setErrors] = useState("");
  const [form, setForm] = useState({
    word: "",
    tries: "",
    hint: "",
    title: "",
    privacy: "public",
    password: "",
  });

  useEffect(() => {
    async function run() {
      const isAnonymous = await checkAnonymousSession();
      setAnonymous(isAnonymous);
    }
    run();
  }, []);

  async function handleChange(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleOpenModal() {
    if (!form.word) {
      setErrors("O título é obrigatório.");
      return false;
    }

    if (!form.tries) {
      setErrors("As tentativas são obrigatórias.");
      return false;
    }

    setErrors("");
    return true;
  }

  async function handleCreate() {
    if (loading) return;
    setLoading(true);

    if (!form.title) return setErrors("O título é obrigatório.");

    if (form.privacy === "private" && !form.password)
      return setErrors("Para jogos privados, a senha é obrigatória.");

    const result = await Verbo({
      word: form.word,
      tries: form.tries,
      hint: form.hint,
      title: form.title,
      privacy: form.privacy,
      password: form.password,
    });

    if (result.error) return setErrors(result.error);
    setUnlockAchievement(true);

    router.push(`/select/verb/${result.jogoId}`);
  }

  if (anonymous)
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center h-screen">
        <CreateVerbHelp />
        <p className="text-lg font-semibold">Sem permissão suficiente para acessar essa página</p>
        <Button onClick={() => router.push("/")}>Voltar para Home</Button>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-6 text-center">
      {unlockAchievement && <AchievementsSonner nome="Começando" check={true} />}
      <CreateVerbHelp />

      <Image
        src="/verb.png"
        alt="Verbo"
        width={150}
        height={150}
        className="object-contain rounded-lg shadow-md"
      />

      <h1 className="text-3xl font-bold">Criar novo jogo</h1>

      <div className="w-full max-w-sm flex flex-col gap-6 text-left bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md">
        {errors && <p className="text-red-500 text-sm font-semibold">{errors}</p>}

        <div className="flex flex-col gap-1">
          <Label className="font-semibold">Palavra do jogo</Label>
          <input
            className="bg-transparent border-b border-primary/50 focus:border-primary outline-none py-1 px-0 text-lg"
            placeholder="Digite a palavra"
            maxLength={15}
            minLength={3}
            value={form.word}
            required
            onChange={(e) => handleChange("word", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="font-semibold">Número de tentativas</Label>
          <input
            type="number"
            className="bg-transparent border-b border-primary/50 focus:border-primary outline-none py-1 px-0 text-lg"
            placeholder="Ex: 5"
            required
            value={form.tries}
            onChange={(e) => handleChange("tries", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="font-semibold">Dica</Label>
          <input
            className="bg-transparent border-b border-primary/50 focus:border-primary outline-none py-1 px-0 text-lg"
            placeholder="(opcional)"
            maxLength={15}
            value={form.hint}
            onChange={(e) => handleChange("hint", e.target.value)}
          />
        </div>

        <PasswordCreateModal
          title={form.title}
          privacy={form.privacy}
          password={form.password}
          errors={errors}
          handleChange={handleChange}
          onOpen={handleOpenModal}
          handleCreate={handleCreate}
          loading={loading}
        />
      </div>
    </div>
  );
}
