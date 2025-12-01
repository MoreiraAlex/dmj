"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

export function HintModal({ hint, setClicou }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
          setClicou(true);
        }}
        className="absolute top-[90%] left-[80%] hover:cursor-pointer"
      >
        <Lightbulb />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">DICA</DialogTitle>
          </DialogHeader>
          <div className="text-center">{hint}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}
