"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getIcon } from "@/lib/icon-map";

export function ConquistaItem({ conquista, obtida }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <span
        onClick={() => setOpen(true)}
        className={`cursor-pointer rounded-[50%] size-16 flex items-center justify-center border-2 transition border-primary 
          ${obtida ? "bg-primary" : "opacity-30 grayscale"} 
        `}
        title={conquista.nome}
      >
        {getIcon(conquista.icone, 32, obtida ? "text-primary-foreground" : "text-primary")}
      </span>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{conquista.nome}</DialogTitle>
            <DialogDescription>{conquista.descricao}</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center py-4 gap-3">
            {getIcon(conquista.icone, 56, "text-primary")}

            <p className="text-sm">
              <strong>Pontos XP:</strong> {conquista.pontosXp ?? 0}
            </p>

            <p className={`text-sm font-semibold ${obtida ? "text-green-600" : "text-red-600"}`}>
              {obtida ? "Conquistada!" : "Ainda não conquistada"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
