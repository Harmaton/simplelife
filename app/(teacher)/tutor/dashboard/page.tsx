"use client";

import React from "react";
import { Play, CheckSquare, Trophy, Coins } from "lucide-react";
import RatingBar from "./ratingbar";
import ActivityItem from "./activity-item";
import StatCard from "./statcard";
import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 p-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Play className="text-orange-500" />}
          value="8"
          label="Enrolled courses"
          bgColor="bg-orange-100"
        />
        <StatCard
          icon={<CheckSquare className="text-indigo-500" />}
          value="3"
          label="Active courses"
          bgColor="bg-indigo-100"
        />
        <StatCard
          icon={<Trophy className="text-green-500" />}
          value="5"
          label="Completed courses"
          bgColor="bg-green-100"
        />
        <StatCard
          icon={<Coins className="text-yellow-500" />}
          value="3,850"
          label="Total points"
          bgColor="bg-yellow-100"
        />
      </div>

      {/* Profile Section */}
      <div className="bg-indigo-900 text-white rounded-lg p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center">
          {user?.photoURL && (
            <Image
              src={user.photoURL}
              width={48}
              height={48}
              alt={user.displayName || "User"}
              className="rounded-full mr-4"
            />
          )}
          <div>
            <h2 className="text-xl font-bold">{user?.displayName || "User"}</h2>
            <p className="text-sm opacity-75">
              {user?.email || "No email provided"}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-4">
            <p className="text-sm">Steps 1/4</p>
            <div className="w-32 bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 rounded-full h-2 w-1/4"></div>
            </div>
            <p className="text-sm text-right">25% completa</p>
          </div>
          <Link href={"/tutor/profile"}>
            <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-blue-500">
              Editar biografía
            </button>
          </Link>
        </div>
      </div>

      {/* Recent Activity and Course Ratings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold mb-4 flex justify-between items-center">
          Actividad reciente
            <select className="text-sm bg-transparent border-none">
              <option>Todo el tiempo</option>
            </select>
          </h3>
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
          <ActivityItem />
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold mb-4 flex justify-between items-center">
          Calificaciones de los cursos
            <select className="text-sm bg-transparent border-none">
              <option>Todo el tiempo</option>
            </select>
          </h3>
          <div className="text-6xl font-bold text-orange-500 mb-4">5.0</div>
          <div className="space-y-2">
            <RatingBar stars={5} percentage={80} />
            <RatingBar stars={4} percentage={10} />
            <RatingBar stars={3} percentage={7} />
            <RatingBar stars={2} percentage={3} />
            <RatingBar stars={1} percentage={0} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
