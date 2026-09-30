import { useAuth } from "../../hooks/useAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import "./Dashboard.css";
import { DashboardHeader } from "./DashboardHeader";
import { RegistrationCard } from "./registration/RegistrationCard";

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

const analyses = [
  {
    title: "Ditt humör över tid",
    description: "Lär känna hur ditt mående förändras.",
    empty: "Här visas dina humörregistreringar när det finns data.",
  },
  {
    title: "Din sömn",
    description: "En överblick över dina nätter och din återhämtning.",
    empty: "Här visas dina sömnmönster när det finns data.",
  },
  {
    title: "Rörelse i vardagen",
    description: "Följ din aktivitet över tid.",
    empty: "Här visas din aktivitet när det finns data.",
  },
  {
    title: "Små vanor, stora framsteg",
    description: "Se hur dina rutiner utvecklas.",
    empty: "Här visas dina vanor när det finns data.",
  },
];

export function Dashboard() {
  const { user } = useAuth();
  return (
    <section className="dashboard" aria-labelledby="dashboard-title">
      {user && <DashboardHeader />}
      <div className="dashboard-summary-grid">
        {summaries.map((summary) => (
          <RegistrationCard summary={summary} key={summary.title} />
        ))}
      </div>
      <div className="dashboard-section-heading">
        <h2>Dina insikter</h2>
        <p>Plats för dina mönster, din balans och dina framsteg.</p>
      </div>
      <div className="dashboard-analysis-grid">
        {analyses.map(({ title, description, empty }) => (
          <Card key={title} className="dashboard-card">
            <CardHeader>
              <CardTitle>
                <h3 className="dashboard-card-title">{title}</h3>
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
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
                <strong>Ingen data ännu</strong>
                <p>{empty}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
