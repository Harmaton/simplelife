"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";


interface BookActionsProps {
  disabled: boolean;
  id: string;
  isPublished: boolean;
};

export const BookActions = ({
  disabled,
  id,
  isPublished
}: BookActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/books/${id}/unpublish`);
        toast.success("Libra inédito");
      } else {
        await axios.patch(`/api/books/${id}/publish`);
        toast.success("Libra publicado");
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

      await axios.delete(`/api/books/${id}`);

      toast.success("eliminado");
      router.refresh();
      router.push(`/admin/addbook`);
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
        {isPublished ? "Eliminar sesión" : "CORREO"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" className="bg-red-500" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}