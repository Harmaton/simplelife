"use client";

import React, { useState, useEffect } from "react";
import { getAllUsers } from "@/app/actions/user";
import { User } from "@prisma/client";
import { DataTable } from "./users/data-table";
import { columns } from "./users/columns";

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [todaySignIns, setTodaySignIns] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [teachersAwaitingReview, setTeachersAwaitingReview] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);

      // Count users signed in today
      const today = new Date().setHours(0, 0, 0, 0);
      const signedInToday = fetchedUsers.filter(
        (user) => new Date(user.createdAt).setHours(0, 0, 0, 0) === today
      ).length;
      setTodaySignIns(signedInToday);

      // Count total teachers
      const teachers = fetchedUsers.filter((user) => user.isTeacher === true);
      setTotalTeachers(teachers.length);

      // Count teachers awaiting application review
      const awaitingReview = teachers.filter(
        (user) => user.isRegistered === true
      );
      setTeachersAwaitingReview(awaitingReview.length);
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <div className="mb-4">
        <h1 className="text-xl font-bold">Gestión de usuarios</h1>
        <p className="text-gray-600 font-mono">
          Un vistazo a todos los usuarios de la plataforma
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Total de Usuarios</h2>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Registros de Hoy</h2>
          <p className="text-3xl font-bold">{todaySignIns}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Total de Profesores</h2>
          <p className="text-3xl font-bold">{totalTeachers}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Profesores en Revisión</h2>
          <p className="text-3xl font-bold">{teachersAwaitingReview}</p>
        </div>
      </div>

      <DataTable columns={columns} data={users} />
    </div>
  );
}
