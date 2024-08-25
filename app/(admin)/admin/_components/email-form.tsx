import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getAllTeachers } from '@/app/actions/user';

type Teacher = {
  email: string;
};

// Define a regex pattern for basic email validation
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailForm = () => {

  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string | null>(null);


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(null); // Reset error message when user starts typing
  };



  // Function to check if the email is registered in the database
  const checkEmailRegistered = async (email: string) => {
    try {
      const response = await fetch('/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      return data.isRegistered;
    } catch (error) {
      console.error('Error checking email registration:', error);
      return false;
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (!emailPattern.test(email)) {
        setEmailError('Por favor, introduce una dirección de correo electrónico válida.');
        return;
      }

      const isRegistered = await checkEmailRegistered(email.trim());
      if (!isRegistered) {
        setEmailError('El correo electrónico aún no ha aceptado nuestros términos y políticas.');
        return;
      }

      if (email && !emailList.includes(email)) {
        setEmailList([...emailList, email]);
        setEmail('');
      }
    }
  };

  const removeEmail = (index: number) => {
    setEmailList(emailList.filter((_, i) => i !== index));
  };
  const router = useRouter()
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Call the addTeacher function to handle input
    // addTeachers(emailList)
    console.log('Teachers submitted:', emailList);
    router.refresh()
    setEmailList([]); // Clear the list after submission
  };

  const [teachers, setTeachers] = useState<Teacher[]>([]);

  // Fetch all teachers on component mount
  useEffect(() => {
    const fetchTeachers = async () => {
      const allTeachers = await getAllTeachers();
      setTeachers(allTeachers);
    };

    fetchTeachers();
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <>
    <h2 className='p-4 m-2 text-blue-500 font-bold text-4xl'>Administrar maestros de vida simple</h2>
    <p className='p-4 font-italic m-2'>presione ENTER para agregar otro correo electrónico</p>
    <form onSubmit={handleSubmit} className="space-y-4 p-4 m-2">
      <div>
        <input
          type="text"
          className="block w-full px-4 py-2 border rounded-md"
          placeholder="Introduzca correos electrónicos"
          value={email}
          onChange={handleEmailChange}
          onKeyDown={handleKeyDown}
        />
        {emailError && <p className="text-red-600">{emailError}</p>}
        <ul className="mt-2 p-2">
          {emailList.map((email, index) => (
            <li key={index} className="flex items-center mt-1">
              {email}
              <button
                type="button"
                onClick={() => removeEmail(index)}
                className="ml-2 text-white bg-red-500 rounded-full w-5 h-5 flex justify-center items-center"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Button
        type="submit"
        className="px-4 py-2 text-white bg-purple-500 rounded-md"
      >
        Enviar correos electrónicos
      </Button>
    </form>
    <div className="teacher-list p-4 m-2">
        <h3 className="text-lg font-semibold">Lista de profesores</h3>
        {teachers.map((teacher, index) => (
  <li key={index} className="flex justify-between items-center mt-2 p-2 bg-gray-100 rounded-md">
    {teacher.email}
    <Trash2 className="ml-4 bg-red-500 text-white p-2 rounded-md"
  
    />
  </li>
))}
          
      </div>
      </>
  );
};

export default EmailForm;
