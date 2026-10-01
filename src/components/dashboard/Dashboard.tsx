import { useAuth } from "../../hooks/useAuth";
import "./Dashboard.css";
import { DashboardHeader } from "./DashboardHeader";
import { RegistrationCard } from "./registration/RegistrationCard";
import { ActivityInsightsCard } from "./insights/ActivityInsightsCard";
import { useActivities } from "../../hooks/useActivities";

type summariesType = {
  title: string;
  description: string;
  unit: string;
  icon: string;
  type: string;
};
const summaries: summariesType[] = [
  {
    title: "Humör",
    description: "Hur mår du idag?",
    unit: "Ingen registrering ännu",
    icon: "☺",
    type: "mood",
  },
  {
    title: "Sömn",
    description: "Senaste natten",
    unit: "timmar sömn",
    icon: "☾",
    type: "sleep",
  },
  {
    title: "Aktivitet",
    description: "Din rörelse idag",
    unit: "steg idag",
    icon: "↗",
    type: "activity",
  },
  {
    title: "Vanor",
    description: "Dagens framsteg",
    unit: "vanor registrerade",
    icon: "✓",
    type: "habits",
  },
];

export function Dashboard() {
  const { user } = useAuth();
  const { activities, handleActivityCreated } = useActivities();
  return (
    <section className="dashboard" aria-labelledby="dashboard-title">
      {user && <DashboardHeader />}
      <div className="dashboard-summary-grid">
        {summaries.map((summary) => (
          <RegistrationCard
            summary={summary}
            onActivityCreated={handleActivityCreated}
            key={summary.title}
          />
        ))}
      </div>
      <div className="dashboard-section-heading">
        <h2>Dina insikter</h2>
        <p>Plats för dina mönster, din balans och dina framsteg.</p>
      </div>
      <div className="dashboard-analysis-grid">
        <ActivityInsightsCard activities={activities} />
      </div>
    </section>
  );
}
