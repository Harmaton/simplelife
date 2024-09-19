import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { deleteTeacherProfile } from "@/app/actions/user";
import { useRouter } from "next/navigation";

const DeleteDialog = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleViewProfile = () => {
    window.open(`https://www.simplelifeofficial.com/tutors/${id}`, "_blank");
  };

  const handleDeleteProfile = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteTeacherProfile(id);
      toast.success(response.mesage);
      setOpen(false);
      location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Estás absolutamente seguro?</DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. El profesor será eliminado de
            nuestros servidores.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button onClick={handleViewProfile}>Ver perfil</Button>
          <Button className="bg-red-500" onClick={handleDeleteProfile}>
            <Trash className="w-4 h-4 mr-2" />
            {isDeleting ? "Eliminando..." : "Eliminar perfil"}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Cerca
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
