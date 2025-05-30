
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddReminderDialogProps } from "@/types/reminder";
import { useReminderForm } from "@/hooks/useReminderForm";
import { ReminderFormFields } from "@/components/reminder-form/ReminderFormFields";
import { ReminderFormActions } from "@/components/reminder-form/ReminderFormActions";

export const AddReminderDialog = ({ open, onOpenChange, onAdd }: AddReminderDialogProps) => {
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
    onOpenChange(false);
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Add New Reminder
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <ReminderFormFields 
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
          <ReminderFormActions onCancel={handleCancel} />
        </form>
      </DialogContent>
    </Dialog>
  );
};
