"use client";

import React, { useState, useEffect } from "react";
import { getAllUsers } from "@/app/actions/user";
import { User } from "@prisma/client";
import { DataTable } from "./users/data-table";
import { columns } from "./users/columns";
import { Ruler, TrendingUp } from "lucide-react";

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [todaySignIns, setTodaySignIns] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [teachersAwaitingReview, setTeachersAwaitingReview] = useState(0);
  const [userIncrease, setUserIncrease] = useState(false);
  const [teacherIncrease, setTeacherIncrease] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);

      const now = new Date();
      const today = now.setHours(0, 0, 0, 0);
      const yesterday = new Date(now.setDate(now.getDate() - 1)).setHours(0, 0, 0, 0);

      // Count users signed in today
      const signedInToday = fetchedUsers.filter(
        (user) => new Date(user.createdAt).setHours(0, 0, 0, 0) === today
      ).length;
      setTodaySignIns(signedInToday);

      // Check if there's an increase in users in the last 24 hours
      const usersYesterday = fetchedUsers.filter(
        (user) => new Date(user.createdAt) < new Date(today)
      ).length;
      setUserIncrease(users.length > usersYesterday);

      // Count total teachers
      const teachers = fetchedUsers.filter((user) => user.isTeacher === true);
      setTotalTeachers(teachers.length);

      // Check if there's an increase in teachers in the last 24 hours
      const teachersYesterday = fetchedUsers.filter(
        (user) => user.isTeacher === true && new Date(user.createdAt) < new Date(today)
      ).length;
      setTeacherIncrease(teachers.length > teachersYesterday);

      // Count teachers awaiting application review
      const awaitingReview = teachers.filter(
        (user) => user.isRegistered === true
      );
      setTeachersAwaitingReview(awaitingReview.length);
    };
    fetchUsers();
  }, []);

  const StatBox = ({ title, value, showTrend }: {title: string, value: number, showTrend: boolean}) => (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="flex justify-between">
        <p className="text-3xl font-bold">{value}</p>
        
        {showTrend ? (
          <TrendingUp className="ml-2 text-blue-500" size={12} />
        ) : <Ruler className="ml-2 text-blue-500" size={12} /> }

      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-4">
        <h1 className="text-xl font-bold">Gestión de usuarios</h1>
        <p className="text-gray-600 font-mono">
          Un vistazo a todos los usuarios de la plataforma
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatBox title="Total de Usuarios" value={users.length} showTrend={userIncrease} />
        <StatBox title="Registros de Hoy" value={todaySignIns} showTrend={todaySignIns > 0} />
        <StatBox title="Total de Profesores" value={totalTeachers} showTrend={teacherIncrease} />
        <StatBox title="Profesores en Revisión" value={teachersAwaitingReview} showTrend={false} />
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}