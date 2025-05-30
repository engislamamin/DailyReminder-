import { Clock, Tag, Trash2, Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface Reminder {
  id: string;
  title: string;
  description?: string;
  time: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Reminder;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700'
};

export const TaskCard = ({ task, onToggle, onDelete }: TaskCardProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h4 className={cn(
          "font-medium text-sm text-gray-900",
          task.completed && "line-through text-gray-500"
        )}>
          {task.title}
        </h4>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggle(task.id)}
            className="h-6 w-6 p-0"
          >
            {task.completed ? (
              <Check className="w-3 h-3 text-green-500" />
            ) : (
              <Circle className="w-3 h-3 text-gray-400" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
      
      {task.description && (
        <p className="text-xs text-gray-600 mb-2">{task.description}</p>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{task.time}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            priorityColors[task.priority]
          )}>
            {t(`priority.${task.priority}`)}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Tag className="w-3 h-3" />
            <span>{task.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
