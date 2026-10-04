import { useState } from "react";
import { FormDialog } from "../Dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Button } from "../ui/button";
import { useAuth } from "../../hooks/useAuth";
import { ActivityRegistration } from "../activities/ActivityRegistration";
import { SleepRegistration } from "../sleep/SleepRegistration";
import { MoodRegistration } from "../mood/MoodRegistration";

type summariesProps = {
  title: string;
  description: string;
  unit: string;
  icon: string;
  type: string;
};
type RegisrationCardProps = {
  summary: summariesProps;
  refreshActivities: () => void;
};

export const RegistrationCard = ({
  summary,
  refreshActivities,
}: RegisrationCardProps) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
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
          <div>
            <Button onClick={() => setOpen(true)}>
              Registrera {summary.title.toLowerCase()}
            </Button>

            <FormDialog
              open={open}
              onOpenChange={setOpen}
              title={`Registrera ${summary.title.toLowerCase()}`}
              description="Fyll i uppgifterna nedan."
            >
              {summary.type === "activity" && (
                <ActivityRegistration refreshActivities={refreshActivities} />
              )}
              {summary.type === "sleep" && <SleepRegistration />}
              {summary.type === "mood" && <MoodRegistration />}
            </FormDialog>
          </div>
        ) : (
          `Logga in för att registrera ${summary.title.toLowerCase()}`
        )}
      </CardContent>
    </Card>
  );
};
