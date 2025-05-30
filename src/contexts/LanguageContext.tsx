
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.taskManager': 'Task Manager',
    'nav.board': 'Board',
    'nav.create': 'Create',
    'nav.completed': 'Completed',
    'nav.reminders': 'Reminders',
    
    // Task Board
    'board.title': 'Task Board',
    'board.description': 'Organize your tasks in a visual board',
    'board.todo': 'To Do',
    'board.highPriority': 'High Priority',
    'board.today': 'Today',
    'board.completed': 'Completed',
    'board.noTasks': 'No tasks yet',
    'board.tasksCount': 'tasks',
    
    // Create Task
    'create.title': 'Create New Task',
    'create.description': 'Add a new task to your board',
    'create.backToBoard': 'Back to Board',
    'create.cancel': 'Cancel',
    'create.createTask': 'Create Task',
    
    // Completed Tasks
    'completed.title': 'Completed Tasks',
    'completed.description': 'View and manage your completed tasks',
    'completed.noTasks': 'No completed tasks yet',
    'completed.noTasksDesc': 'Complete some tasks to see them here',
    
    // Reminders
    'reminders.title': 'Reminders',
    'reminders.description': 'Manage your upcoming reminders and notifications',
    'reminders.todayReminders': "Today's Reminders",
    'reminders.noReminders': 'No reminders for today',
    
    // Form
    'form.title': 'Title',
    'form.description': 'Description',
    'form.time': 'Time',
    'form.priority': 'Priority',
    'form.category': 'Category',
    'form.addReminder': 'Add Reminder',
    
    // Priority
    'priority.low': 'Low',
    'priority.medium': 'Medium',
    'priority.high': 'High',
    
    // Common
    'common.delete': 'Delete',
    'common.complete': 'Complete',
  },
  ar: {
    // Navigation
    'nav.taskManager': 'مدير المهام',
    'nav.board': 'اللوحة',
    'nav.create': 'إنشاء',
    'nav.completed': 'مكتملة',
    'nav.reminders': 'التذكيرات',
    
    // Task Board
    'board.title': 'لوحة المهام',
    'board.description': 'نظم مهامك في لوحة مرئية',
    'board.todo': 'للقيام',
    'board.highPriority': 'أولوية عالية',
    'board.today': 'اليوم',
    'board.completed': 'مكتملة',
    'board.noTasks': 'لا توجد مهام بعد',
    'board.tasksCount': 'مهام',
    
    // Create Task
    'create.title': 'إنشاء مهمة جديدة',
    'create.description': 'أضف مهمة جديدة إلى لوحتك',
    'create.backToBoard': 'العودة إلى اللوحة',
    'create.cancel': 'إلغاء',
    'create.createTask': 'إنشاء مهمة',
    
    // Completed Tasks
    'completed.title': 'المهام المكتملة',
    'completed.description': 'عرض وإدارة مهامك المكتملة',
    'completed.noTasks': 'لا توجد مهام مكتملة بعد',
    'completed.noTasksDesc': 'أكمل بعض المهام لرؤيتها هنا',
    
    // Reminders
    'reminders.title': 'التذكيرات',
    'reminders.description': 'إدارة التذكيرات والإشعارات القادمة',
    'reminders.todayReminders': 'تذكيرات اليوم',
    'reminders.noReminders': 'لا توجد تذكيرات لليوم',
    
    // Form
    'form.title': 'العنوان',
    'form.description': 'الوصف',
    'form.time': 'الوقت',
    'form.priority': 'الأولوية',
    'form.category': 'الفئة',
    'form.addReminder': 'إضافة تذكير',
    
    // Priority
    'priority.low': 'منخفضة',
    'priority.medium': 'متوسطة',
    'priority.high': 'عالية',
    
    // Common
    'common.delete': 'حذف',
    'common.complete': 'إكمال',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
