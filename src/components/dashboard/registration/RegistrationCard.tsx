import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";

type summariesProps = {
  title: string;
  description: string;
  unit: string;
  icon: string;
  type: string;
};
type RegisrationCardProps = {
  summary: summariesProps;
  onOpenForm: () => void;
};

export const RegistrationCard = ({
  summary,
  onOpenForm,
}: RegisrationCardProps) => {
  return (
    <Card key={summary.title} className="dashboard-card dashboard-summary">
      <CardHeader>
        <CardTitle>
          <h2 className="dashboard-card-title">
            <div className="dashboard-icon" aria-hidden="true">
              ↗
            </div>
            {summary.title}
          </h2>
        </CardTitle>
        <CardDescription>{summary.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-fit" onClick={onOpenForm}>
              Registrera ny {summary.title.toLowerCase()}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Lägg till uppgift</DialogTitle>
              <DialogDescription>
                Fyll i information om uppgiften.
              </DialogDescription>
            </DialogHeader>
            {/* Ditt formulär här */}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
