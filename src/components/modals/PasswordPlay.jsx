"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { GameId } from "@/actions/play-game";

export function PasswordPlayModal({ open, onClose, id, onSuccess }) {
  const [senha, setSenha] = useState("");
  const [game, setGame] = useState({});

  useEffect(() => {
    async function run() {
      const gameId = await GameId(id, "verbo");
      setGame(gameId);
    }
    run();
  }, []);

  function validar() {
    if (!senha) {
      toast.error("Digite a senha do jogo.");
      return;
    }

    if (senha !== game.senha) {
      toast.error("Senha incorreta.");
      return;
    }

    onSuccess();
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">#{game.nome}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          <Input
            type="password"
            placeholder="Digite a senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Voltar
          </Button>
          <Button onClick={validar}>Entrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
