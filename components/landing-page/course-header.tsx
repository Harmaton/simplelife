import Link from "next/link";

export default function CoursesHeader() {
  return (
    
      <div className="container mx-auto flex p-6 justify-between items-center mb-2 mt-2">
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-2xl font-bold mb-2">
          Próximos cursos
          </h1>
          <p className="text-sm md:text-base" data-aos="fade-up">
          Consulta nuestros próximos cursos
          </p>
        </div>
        <Link href="/courses" className="bg-white hover:bg-violet-500 text-black font-sm py-2 px-4 rounded-full border border-black">
        Todos los cursos
        </Link>
      </div>
    
  );
}
