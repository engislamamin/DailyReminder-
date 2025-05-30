
import { useState } from "react";
import { ReminderFormData } from "@/types/reminder";
import { validateReminderForm } from "@/utils/reminderValidation";

export const useReminderForm = () => {
  const [formData, setFormData] = useState<ReminderFormData>({
    title: '',
    description: '',
    time: '',
    priority: 'medium',
    category: 'personal'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors = validateReminderForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      time: '',
      priority: 'medium',
      category: 'personal'
    });
    setErrors({});
  };

  return {
    formData,
    setFormData,
    errors,
    validateForm,
    resetForm
  };
};
