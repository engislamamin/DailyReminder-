
import { ReminderFormData } from "@/types/reminder";

export const validateReminderForm = (formData: ReminderFormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!formData.title.trim()) {
    errors.title = 'Title is required';
  }
  
  if (!formData.time) {
    errors.time = 'Time is required';
  }

  return errors;
};
