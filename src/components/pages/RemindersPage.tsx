import { Clock, Bell } from "lucide-react";
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

interface RemindersPageProps {
  reminders: Reminder[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const RemindersPage = ({ reminders, onToggle, onDelete }: RemindersPageProps) => {
  const { t } = useLanguage();
  
  const upcomingReminders = reminders
    .filter(r => !r.completed)
    .sort((a, b) => a.time.localeCompare(b.time));

  const todayReminders = upcomingReminders.filter(r => {
    // For demo purposes, showing all reminders as "today"
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Bell className="w-8 h-8 text-blue-500" />
          <h2 className="text-3xl font-bold text-gray-900">{t('reminders.title')}</h2>
        </div>
        <p className="text-gray-600">{t('reminders.description')}</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {t('reminders.todayReminders')} ({todayReminders.length})
          </h3>
          
          {todayReminders.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg border">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">{t('reminders.noReminders')}</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {todayReminders.map((reminder) => (
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
      </div>
    </div>
  );
};
