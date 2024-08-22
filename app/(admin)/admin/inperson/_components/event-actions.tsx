"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface MeditationActionsProps {
  disabled: boolean;
  id: string;
  isPublished: boolean;
};

export const EventActions = ({
  disabled,
  id,
  isPublished
}: MeditationActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/in-person/${id}/unpublish`);
        toast.success("Evento  inédito");
      } else {
        await axios.patch(`/api/in-person/${id}/publish`);
        toast.success("Evento publicado");
      }

      router.refresh();
    } catch {
      toast.error("Algo salió mal");
    } finally {
      setIsLoading(false);
    }
  }
  
  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/in-person/${id}`);

      toast.success("eliminado");
      router.refresh();
      router.push(`/admin/in-person`);
    } catch {
      toast.error("Algo salió mal");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Eliminar Evento" : "CORREO"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" className="bg-red-500" disabled={isLoading}>
          <Trash className="h-4 w-4 " />
        </Button>
      </ConfirmModal>
    </div>
  )
}