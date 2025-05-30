
import { Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddFirst: () => void;
}

export const EmptyState = ({ onAddFirst }: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="mb-6">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4">
          <Calendar className="w-12 h-12 text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No reminders yet
        </h3>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          Start your day organized! Create your first reminder to stay on top of your daily tasks.
        </p>
      </div>
      
      <Button
        onClick={onAddFirst}
        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Your First Reminder
      </Button>
    </div>
  );
};
