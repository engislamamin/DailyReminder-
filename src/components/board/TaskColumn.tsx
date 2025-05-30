import { TaskCard } from "./TaskCard";
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

interface TaskColumnProps {
  title: string;
  tasks: Reminder[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  color: 'blue' | 'red' | 'yellow' | 'green';
}

const colorClasses = {
  blue: 'border-blue-200 bg-blue-50',
  red: 'border-red-200 bg-red-50',
  yellow: 'border-yellow-200 bg-yellow-50',
  green: 'border-green-200 bg-green-50'
};

const headerClasses = {
  blue: 'text-blue-700 bg-blue-100',
  red: 'text-red-700 bg-red-100',
  yellow: 'text-yellow-700 bg-yellow-100',
  green: 'text-green-700 bg-green-100'
};

export const TaskColumn = ({ title, tasks, onToggle, onDelete, color }: TaskColumnProps) => {
  const { t } = useLanguage();
  
  return (
    <div className={`rounded-lg border-2 ${colorClasses[color]} h-fit min-h-[400px]`}>
      <div className={`p-4 rounded-t-lg ${headerClasses[color]}`}>
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className="text-sm opacity-75">{tasks.length} {t('board.tasksCount')}</span>
      </div>
      
      <div className="p-4 space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">{t('board.noTasks')}</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};
