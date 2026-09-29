import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import "./Dashboard.css";

const summaries = [
  {
    title: "Humör",
    description: "Hur mår du idag?",
    unit: "Ingen registrering ännu",
    icon: "☺",
  },
  {
    title: "Sömn",
    description: "Senaste natten",
    unit: "timmar sömn",
    icon: "☾",
  },
  {
    title: "Aktivitet",
    description: "Din rörelse idag",
    unit: "steg idag",
    icon: "↗",
  },
  {
    title: "Vanor",
    description: "Dagens framsteg",
    unit: "vanor registrerade",
    icon: "✓",
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
  return (
    <section className="dashboard" aria-labelledby="dashboard-title">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Välkommen tillbaka</p>
          <h1 id="dashboard-title">
            Amanda
            <span className="dashboard-sun" aria-hidden="true">
              ☀
            </span>
          </h1>
        </div>
      </header>
      <div className="dashboard-summary-grid">
        {summaries.map(({ title, description, unit, icon }) => (
          <Card key={title} className="dashboard-card dashboard-summary">
            <CardHeader>
              <CardTitle>
                <h2 className="dashboard-card-title">
                  <span className="dashboard-icon" aria-hidden="true">
                    {icon}
                  </span>
                  {title}
                </h2>
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="dashboard-summary-value">
              <span className="dashboard-value" aria-label="Ingen data">
                —
              </span>
              <span>{unit}</span>
            </CardContent>
          </Card>
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
