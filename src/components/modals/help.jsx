"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";
import { useHelp } from "../context/help";

export function HelpModal() {
  const { content } = useHelp();
  const [open, setOpen] = useState(false);

  if (!content) return null;

  return (
    <>
      <HelpCircle className="size-10" onClick={() => setOpen(true)} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm space-y-6">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center">
              <HelpCircle className="size-12" />
            </DialogTitle>
          </DialogHeader>
          <div className="text-center">{content}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}
