"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";

export function PasswordModal({
  title,
  privacy,
  password,
  errors,
  handleChange,
  onOpen,
  handleCreate,
}) {
  const [open, setOpen] = useState(false);

  function tryOpenModal() {
    if (onOpen && !onOpen()) return;
    setOpen(true);
  }

  return (
    <>
      <Button onClick={tryOpenModal} className="mt-4 flex items-center gap-2">
        <Plus size={18} />
        Criar Jogo
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Criar novo jogo</DialogTitle>
          </DialogHeader>

          {errors && <p className="text-red-500 text-sm font-medium">{errors}</p>}

          <div className="flex flex-col gap-1">
            <Label className="font-semibold">Título</Label>
            <input
              className="bg-transparent border-b border-primary/50 focus:border-primary outline-none py-1 px-0 text-lg"
              placeholder="Digite o título"
              value={title}
              required
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center py-2">
            <div className="flex flex-col">
              <Label className="font-semibold">Privacidade do jogo</Label>
              <span className="text-xs text-muted-foreground">
                {privacy === "private"
                  ? "Somente convidados podem entrar"
                  : "Qualquer pessoa pode jogar"}
              </span>
            </div>

            <Switch
              checked={privacy === "private"}
              onCheckedChange={(isPrivate) =>
                handleChange("privacy", isPrivate ? "private" : "public")
              }
            />
          </div>

          {privacy === "private" && (
            <div className="flex flex-col gap-1">
              <Label className="font-semibold">Senha</Label>
              <input
                type="password"
                className="bg-transparent border-b border-primary/50 focus:border-primary outline-none py-1 px-0 text-lg"
                placeholder="Digite a senha"
                required
                value={password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </div>
          )}

          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Voltar
            </Button>

            <Button onClick={() => handleCreate()}>Criar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
