
'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, PenBoxIcon, Plus, SkullIcon } from "lucide-react";
import { ApproveTeacher, DisApproveTeacher, getAllRegistredTeachers } from "@/app/actions/user"; 
import { User } from '@prisma/client';
import Link from "next/link";
import { toast } from "sonner";
export default function Page() {
  const [teachers, setTeachers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeacher, setSelectedTeacher] = useState<User | null>(null);
  const [loading, setLoading] = useState(false); // Loading state
  const teachersPerPage = 4;

  useEffect(() => {
    const fetchTeachers = async () => {
      const result = await getAllRegistredTeachers();
      if (result) {
        setTeachers(result); 
      } else {
        console.error('Failed to fetch teachers');
        setTeachers([]);
      }
    };
    fetchTeachers();
  }, []);

  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = teachers.slice(indexOfFirstTeacher, indexOfLastTeacher);
  const totalPages = Math.ceil(teachers.length / teachersPerPage) || 1; 

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleTeacherClick = (teacher: User) => {
    setSelectedTeacher(teacher);
  };

  const handleApprove = async (teacherId: string) => {
    setLoading(true);
    const approvestate = await ApproveTeacher(teacherId);
    if (approvestate.success) {
      toast.success('Estado del profesor actualizado.');
      setLoading(false)
    } else {
      toast.error('Error al actualizar el estado del profesor.');
      setLoading(false)
    }
  };

  const handleReject = async (teacherId: string) => {
    setLoading(true);
    const approvestate = await DisApproveTeacher(teacherId);
    if (approvestate.success) {
      toast.success('Estado del profesor actualizado.');
      setLoading(false)
    } else {
      toast.error('Error al actualizar el estado del profesor.');
      setLoading(false)
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
      <div className="overflow-y-auto max-h-screen">
        {currentTeachers.length > 0 ? (
          <>
            <h2 className="text-xl font-bold mb-3">Profesores Registrados</h2>
            <p className="text-sm text-gray-600 mb-4">Haz clic en un profesor para ver más detalles.</p>
            {currentTeachers.map((teacher: User) => (
              <div 
                key={teacher.id} 
                className="flex items-center p-4 border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => handleTeacherClick(teacher)}
              >
                <div className="flex-grow">
                  <h3 className="font-semibold">{teacher.nickname}</h3>
                  <p className="text-sm text-gray-600 truncate">{teacher.email}</p>
                </div>
              </div>
            ))}
            <div className="flex justify-end mt-4">
              <Button onClick={handlePreviousPage} disabled={currentPage === 1} className="mx-1">
                <ArrowLeft />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`mx-1 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {page}
                </Button>
              ))}
              <Button onClick={handleNextPage} disabled={currentPage === totalPages} className="mx-1">
                <ArrowRight />
              </Button>
            </div>
          </>
        ) : (
         <div className="flex items-center justify-center h-full">
           <p className="p-4 text-center m-auto text-gray-500">No se encontraron solicitudes de profesores.</p> 
         </div>
        )}
      </div>
      <div className="p-4 border-l">
        {selectedTeacher ? (
          <div className="border p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{selectedTeacher.nickname}</h2>
              <p className="flex items-center">
                {selectedTeacher.isTeacher ? (
                  <span className="text-green-500">Aprobado <PenBoxIcon className="h-4 w-4 border rounded-full m-auto ml-4" /> </span>
                ) : (
                  <span className="text-red-500">No Aprobado <SkullIcon className="h-4 w-4 border rounded-full m-auto ml-4" /></span>
                )}
              </p>
            </div>
            <div className="y-2">
              <h1 className="text-sm font-bold text-gray-600">Correo electrónico:</h1>
              <p className="text-sm text-gray-600">{selectedTeacher.email}</p>
            </div>
           
            <div className="y-2">
              <h1 className="text-sm font-bold text-gray-600">Profesión:</h1>
              <p className="text-sm text-gray-600">{selectedTeacher.profession || 'N/A'}</p>
            </div>
            <div className="y-2">
              <h1 className="text-sm font-bold text-gray-600">Descripción:</h1>
              <p className="text-sm text-gray-600">{selectedTeacher.description || 'N/A'}</p>
            </div>

            <div className="y-2 flex items-center space-x-4 mb-4">
            <h3 className="mb-2 mt-2 font-sm">Enlaces</h3>
              <Link href={`https://wa.me/${selectedTeacher.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <Button className="bg-green-500 text-white rounded-full p-2">
                  <span className="material-icons">whatsapp</span>
                </Button>
              </Link>
              {selectedTeacher.linkedIn ? (
                <Link href={selectedTeacher.linkedIn} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-blue-500 text-white rounded-full p-2">
                    <span className="material-icons">LinkedIn</span>
                  </Button>
                </Link>
              ) : (
                <span className="text-gray-500">LinkedIn no disponible</span>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <Button 
                className="mt-4 bg-green-500 text-white flex space-x-2" 
                onClick={() => handleApprove(selectedTeacher.id)} 
                disabled={loading}
              >
                {loading ? 'Aprobando...' : 'Aprobar'}
                <Plus className="h-4 w-4 border rounded-full m-auto ml-4" />
              </Button>
              <Button 
                className="mt-4 bg-red-500 text-white flex space-x-4" 
                onClick={() => handleReject(selectedTeacher.id)} 
                disabled={loading}
              >
                {loading ? 'Rechazando...' : 'Rechazar'}
                <SkullIcon className="h-4 w-4 border rounded-full m-auto ml-4" />
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No se ha seleccionado ningún profesor.</p>
        )}
      </div>
    </div>
  );
}
