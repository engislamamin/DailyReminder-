
import { useState } from "react";
import { CheckCircle2, Circle, Clock, Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Reminder {
  id: string;
  title: string;
  description?: string;
  time: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  completed: boolean;
}

interface ReminderCardProps {
  reminder: Reminder;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-700 border-green-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  high: 'bg-red-100 text-red-700 border-red-200'
};

const categoryColors = {
  work: 'bg-blue-100 text-blue-700',
  wellness: 'bg-purple-100 text-purple-700',
  personal: 'bg-pink-100 text-pink-700',
  health: 'bg-green-100 text-green-700',
  default: 'bg-gray-100 text-gray-700'
};

export const ReminderCard = ({ reminder, onToggle, onDelete }: ReminderCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(reminder.id);
    }, 200);
  };

  const categoryColor = categoryColors[reminder.category as keyof typeof categoryColors] || categoryColors.default;

  return (
    <div
      className={cn(
        "bg-white rounded-2xl p-4 shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md",
        reminder.completed && "opacity-75",
        isDeleting && "animate-scale-out"
      )}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(reminder.id)}
          className="mt-1 transition-colors duration-200"
        >
          {reminder.completed ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400 hover:text-blue-500" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              className={cn(
                "font-medium text-gray-900 transition-all duration-200",
                reminder.completed && "line-through text-gray-500"
              )}
            >
              {reminder.title}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-500 h-8 w-8 p-0 shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          {reminder.description && (
            <p className="text-sm text-gray-600 mb-3">{reminder.description}</p>
          )}

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{reminder.time}</span>
            </div>

            <div className={cn(
              "px-2 py-1 rounded-full text-xs font-medium border",
              priorityColors[reminder.priority]
            )}>
              {reminder.priority.charAt(0).toUpperCase() + reminder.priority.slice(1)}
            </div>

            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
              categoryColor
            )}>
              <Tag className="w-3 h-3" />
              {reminder.category}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
