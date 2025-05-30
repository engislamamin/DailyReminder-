import { CheckCircle2 } from "lucide-react";
import { ReminderCard } from "@/components/ReminderCard";
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

interface CompletedTasksPageProps {
  reminders: Reminder[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const CompletedTasksPage = ({ reminders, onToggle, onDelete }: CompletedTasksPageProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
          <h2 className="text-3xl font-bold text-gray-900">{t('completed.title')}</h2>
        </div>
        <p className="text-gray-600">{t('completed.description')}</p>
      </div>

      {reminders.length === 0 ? (
        <div className="text-center py-12">
          <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-500 mb-2">{t('completed.noTasks')}</h3>
          <p className="text-gray-400">{t('completed.noTasksDesc')}</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {reminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
