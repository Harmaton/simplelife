import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { getAllStudents } from '@/app/actions/user';


type Student = {
  email: string;
};

// Define a regex pattern for basic email validation
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const StudentForm = () => {

  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [duration, setDuration] = useState(30); 

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(e.target.value));
  };


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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Call the addStudent function to handle input
    const updatedUsers = [];

    for (const email of emailList) {
      if (emailPattern.test(email)) {
        const user = await fetch('/api/check-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }).then((response) => response.json());

        if (user.isRegistered) {
          const expirationDate = duration
            ? new Date(new Date().getTime() + duration * 24 * 60 * 60 * 1000)
            : null;

          const isExpired = user.studentStatusExpiresAt && user.studentStatusExpiresAt <= new Date();

          const updatedUser = await fetch('/api/add-students', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              emailList: [email],
              durationInDays: duration,
            }),
          }).then((response) => response.json());

          updatedUsers.push(updatedUser);
        } else {
          setEmailError('El correo electrónico aún no ha aceptado nuestros términos y políticas.');
        }
      }
    }

    if (updatedUsers.length > 0) {
      console.log('Students submitted:', emailList);
      setEmailList([]); // Clear the list after submission
    } else {
      console.log('No users updated');
    }
  };

  const [students, setStudents] = useState<Student[]>([]);

  // Fetch all Students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      const allStudents = await getAllStudents();
      setStudents(allStudents);
    };

    fetchStudents();
  }, []); 

  return (
    <>
    <h2 className='p-4 m-2 text-blue-500 font-bold text-4xl'>Agregar estudiantes pagados a SimpleLife</h2>
    <p className='p-4 font-italic m-2'>presione ENTER para agregar otro correo electrónico</p>
    <form onSubmit={handleSubmit} className="space-y-4 p-4 m-2">
    <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
        Duración (en días):
        </label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={duration}
          onChange={handleDurationChange}
          className="mt-1 p-2 border rounded-md"
        />
      </div>
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
        <h3 className="text-lg font-semibold underline-offset-0">Lista de estudiantes</h3>
        {students.map((student, index) => (
     <li key={index} className="flex justify-between items-center mt-2 p-2 bg-gray-100 rounded-md">
    {student.email}

    <Trash2 className="ml-4 bg-red-500 text-white p-2 rounded-md"
    />
  </li>
))}
          
      </div>
      </>
  );
};

export default StudentForm;
