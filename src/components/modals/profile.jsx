"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pen, Trash } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function EditNameModal({ currentName, onSave }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    await onSave(name);
    setLoading(false);
    setOpen(false);
  }

  return (
    <>
      <span
        className="flex items-center gap-2 text-lg font-medium text-center cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {currentName}
        <Pen className="size-3 cursor-pointer" />
      </span>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar nome</DialogTitle>
          </DialogHeader>

          <Input value={name} onChange={(e) => setName(e.target.value)} />

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function DeleteAccountButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await authClient.deleteUser({
        callbackURL: "/",
      });

      if (res.error) {
        console.error("Erro ao deletar usuário:", res.error);
      } else {
        console.log("Conta deletada:", res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <div onClick={() => setOpen(true)} className="flex flex-col items-center gap-2 p-0">
        <Trash className="size-12 text-muted-foreground" />
        <span className="text-sm font-medium text-center">Apagar Conta</span>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
          </DialogHeader>

          <p>Tem certeza que quer excluir sua conta? Essa ação é irreversível.</p>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>
              {loading ? "Excluindo..." : "Excluir conta"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
