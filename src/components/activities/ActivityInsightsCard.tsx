import { useAuth } from "../../hooks/useAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  filterByDateRange,
  getCurrentWeek,
  sumDurationMinutes,
} from "../../utils";
import type { Activity } from "../../types/Activity";

type ActivityInsightsCardProps = {
  activities: Activity[];
};

export const ActivityInsightsCard = ({
  activities,
}: ActivityInsightsCardProps) => {
  const { user } = useAuth();
  const { start, end } = getCurrentWeek();

  const activitiesThisWeek = filterByDateRange(activities, start, end);
  const totalMinutesThisWeek = sumDurationMinutes(activitiesThisWeek);

  const hours = Math.floor(totalMinutesThisWeek / 60);
  const minutes = totalMinutesThisWeek % 60;
  return (
    <>
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>
            <h3 className="dashboard-card-title">Rörelse i vardagen</h3>
          </CardTitle>
          <CardDescription>Följ din aktivitet över tid.</CardDescription>
        </CardHeader>
        <CardContent>
          {user ? (
            <span className="flex flex-col gap-4">
              <div className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-border p-4 rounded-lg">
                <h2>Antal registrerade aktiviteter denna veckan:</h2>
                <p className="text-2xl font-bold">
                  {activitiesThisWeek.length}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-border p-4 rounded-lg">
                <h2>Antal registrerade timmar denna veckan:</h2>
                <p className="text-2xl font-bold">
                  {hours}h {minutes}m
                </p>
              </div>
            </span>
          ) : (
            <div className="dashboard-empty">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="5"
                  y="5"
                  width="30"
                  height="30"
                  rx="9"
                  stroke="currentColor"
                  opacity=".3"
                />
                <path
                  d="M12 26v-6m8 6V13m8 13v-9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
