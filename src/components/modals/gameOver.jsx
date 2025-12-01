"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Link from "next/link";
import { AchievementsSonner } from "../sonner/AchievementsSonner";

export function ModalGameOver({ aberto, ganhou, tentativas, ajuda, palavraUpper, link }) {
  return (
    <>
      {ganhou && <AchievementsSonner nome="Primeira Vitória" check={true} />}
      <Dialog open={aberto}>
        <DialogContent className="" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              {ganhou ? "PARABÉNS!" : "POXA..."}
            </DialogTitle>
          </DialogHeader>
          <div className="text-center">
            {ganhou ? (
              <div>
                <div>Tentativas: {tentativas}</div>
                <div>Ajuda: {ajuda ? "Sim" : "Não"}</div>
              </div>
            ) : (
              <div>Resposta: {palavraUpper}</div>
            )}
          </div>
          <DialogFooter>
            <div className="flex justify-evenly items-center w-full">
              <Button className="hover:cursor-pointer w-28">
                <Link href={link}>Voltar</Link>
              </Button>
              <Button className="hover:cursor-pointer w-28">
                <Link href="/">Menu</Link>
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
