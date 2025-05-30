import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskColumn } from "@/components/board/TaskColumn";
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

interface TaskBoardPageProps {
  reminders: Reminder[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: (reminder: Omit<Reminder, 'id'>) => void;
}

export const TaskBoardPage = ({ reminders, onToggle, onDelete }: TaskBoardPageProps) => {
  const { t } = useLanguage();
  
  const todoTasks = reminders.filter(r => !r.completed);
  const completedTasks = reminders.filter(r => r.completed);
  const highPriorityTasks = todoTasks.filter(r => r.priority === 'high');
  const todayTasks = todoTasks.filter(r => {
    const today = new Date().toDateString();
    return new Date().toDateString() === today;
  });

  return (
    <div className="h-full">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('board.title')}</h2>
        <p className="text-gray-600">{t('board.description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
        <TaskColumn
          title={t('board.todo')}
          tasks={todoTasks}
          onToggle={onToggle}
          onDelete={onDelete}
          color="blue"
        />
        <TaskColumn
          title={t('board.highPriority')}
          tasks={highPriorityTasks}
          onToggle={onToggle}
          onDelete={onDelete}
          color="red"
        />
        <TaskColumn
          title={t('board.today')}
          tasks={todayTasks}
          onToggle={onToggle}
          onDelete={onDelete}
          color="yellow"
        />
        <TaskColumn
          title={t('board.completed')}
          tasks={completedTasks}
          onToggle={onToggle}
          onDelete={onDelete}
          color="green"
        />
      </div>
    </div>
  );
};
