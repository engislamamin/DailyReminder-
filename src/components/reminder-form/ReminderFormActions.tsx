
import { Button } from "@/components/ui/button";

interface ReminderFormActionsProps {
  onCancel: () => void;
}

export const ReminderFormActions = ({ onCancel }: ReminderFormActionsProps) => {
  return (
    <div className="flex gap-3 pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="flex-1"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
      >
        Add Reminder
      </Button>
    </div>
  );
};
