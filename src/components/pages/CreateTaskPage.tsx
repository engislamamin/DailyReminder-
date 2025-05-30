import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReminderForm } from "@/hooks/useReminderForm";
import { ReminderFormFields } from "@/components/reminder-form/ReminderFormFields";
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

interface CreateTaskPageProps {
  onAdd: (reminder: Omit<Reminder, 'id'>) => void;
  onBack: () => void;
}

export const CreateTaskPage = ({ onAdd, onBack }: CreateTaskPageProps) => {
  const { t } = useLanguage();
  const { formData, setFormData, errors, validateForm, resetForm } = useReminderForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onAdd({
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      time: formData.time,
      priority: formData.priority,
      category: formData.category,
      completed: false
    });

    resetForm();
    onBack();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('create.backToBoard')}
        </Button>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('create.title')}</h2>
        <p className="text-gray-600">{t('create.description')}</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <ReminderFormFields 
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              {t('create.cancel')}
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              {t('create.createTask')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
