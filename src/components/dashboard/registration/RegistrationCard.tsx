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
import { ActivityRegistration } from "./ActivityRegistration";
import { SleepRegistration } from "./SleepRegistration";
import { MoodRegistration } from "./MoodRegistration";
import { useAuth } from "../../../hooks/useAuth";

type summariesProps = {
  title: string;
  description: string;
  unit: string;
  icon: string;
  type: string;
};
type RegisrationCardProps = {
  summary: summariesProps;
};

export const RegistrationCard = ({ summary }: RegisrationCardProps) => {
  const { user } = useAuth();
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
        {user ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-fit">
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
              {summary.type === "activity" && <ActivityRegistration />}
              {summary.type === "sleep" && <SleepRegistration />}
              {summary.type === "mood" && <MoodRegistration />}
            </DialogContent>
          </Dialog>
        ) : (
          `Logga in för att registrera ${summary.title.toLowerCase()}`
        )}
      </CardContent>
    </Card>
  );
};
