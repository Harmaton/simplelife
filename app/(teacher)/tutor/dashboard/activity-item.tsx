import { User } from "lucide-react";

const ActivityItem = () => (
  <div className="flex items-start mb-4">
    <div className="bg-orange-100 p-2 rounded-full mr-3">
      <User className="text-orange-500" />
    </div>
    <div>
      <p className="font-semibold">
        Kevin comenta en tu sesion de terapia ¿Qué es la ansiedad? en Terapia
        cognitivo-conductual 2021
      </p>
      <p className="text-sm text-gray-500">Hace 2 minutos</p>
    </div>
  </div>
);

export default ActivityItem;
