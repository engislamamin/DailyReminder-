import { useState } from "react";
import { Plus, Calendar, CheckSquare, Clock, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { CreateTaskPage } from "@/components/pages/CreateTaskPage";
import { TaskBoardPage } from "@/components/pages/TaskBoardPage";
import { CompletedTasksPage } from "@/components/pages/CompletedTasksPage";
import { RemindersPage } from "@/components/pages/RemindersPage";

interface Reminder {
  id: string;
  title: string;
  description?: string;
  time: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  completed: boolean;
}

type Page = 'board' | 'create' | 'completed' | 'reminders';

const Index = () => {
  const { t } = useLanguage();
  
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Morning meditation',
      description: 'Start the day with 10 minutes of mindfulness',
      time: '08:00',
      priority: 'high',
      category: 'wellness',
      completed: false
    },
    {
      id: '2',
      title: 'Review weekly goals',
      time: '14:30',
      priority: 'medium',
      category: 'work',
      completed: true
    }
  ]);
  
  const [currentPage, setCurrentPage] = useState<Page>('board');

  const toggleReminder = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  const addReminder = (newReminder: Omit<Reminder, 'id'>) => {
    const reminder: Reminder = {
      ...newReminder,
      id: Date.now().toString()
    };
    setReminders(prev => [...prev, reminder]);
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'create':
        return (
          <CreateTaskPage 
            onAdd={addReminder}
            onBack={() => setCurrentPage('board')}
          />
        );
      case 'completed':
        return (
          <CompletedTasksPage 
            reminders={reminders.filter(r => r.completed)}
            onToggle={toggleReminder}
            onDelete={deleteReminder}
          />
        );
      case 'reminders':
        return (
          <RemindersPage 
            reminders={reminders}
            onToggle={toggleReminder}
            onDelete={deleteReminder}
          />
        );
      default:
        return (
          <TaskBoardPage 
            reminders={reminders}
            onToggle={toggleReminder}
            onDelete={deleteReminder}
            onAdd={addReminder}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{t('nav.taskManager')}</h1>
          <div className="flex items-center gap-2">
            <Button
              variant={currentPage === 'board' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('board')}
              size="sm"
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              {t('nav.board')}
            </Button>
            <Button
              variant={currentPage === 'create' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('create')}
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t('nav.create')}
            </Button>
            <Button
              variant={currentPage === 'completed' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('completed')}
              size="sm"
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              {t('nav.completed')}
            </Button>
            <Button
              variant={currentPage === 'reminders' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('reminders')}
              size="sm"
            >
              <Clock className="w-4 h-4 mr-2" />
              {t('nav.reminders')}
            </Button>
            <LanguageToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto h-full">
          {renderCurrentPage()}
        </div>
      </main>
    </div>
  );
};

export default Index;
