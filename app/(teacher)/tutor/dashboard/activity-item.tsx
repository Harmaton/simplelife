import { User } from "lucide-react";

const ActivityItem = () => (
    <div className="flex items-start mb-4">
      <div className="bg-orange-100 p-2 rounded-full mr-3">
        <User className="text-orange-500" />
      </div>
      <div>
        <p className="font-semibold">Kevin comments on your lecture "What is ux" in "2021 ui/ux design with figma"</p>
        <p className="text-sm text-gray-500">Just now</p>
      </div>
    </div>
  );

  export default ActivityItem