
export interface Reminder {
  title: string;
  description?: string;
  time: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  completed: boolean;
}

export interface AddReminderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (reminder: Omit<Reminder, 'id'>) => void;
}

export interface ReminderFormData {
  title: string;
  description: string;
  time: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

export const categories = [
  { value: 'work', label: 'Work' },
  { value: 'wellness', label: 'Wellness' },
  { value: 'personal', label: 'Personal' },
  { value: 'health', label: 'Health' },
];
