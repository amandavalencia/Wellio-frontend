export const DashboardHeader = () => {
  return (
    <header className="dashboard-header">
      <div>
        <p className="dashboard-eyebrow">Välkommen tillbaka!</p>
        <h1 id="dashboard-title">
          Amanda
          <span className="dashboard-sun" aria-hidden="true">
            ☀
          </span>
        </h1>
      </div>
    </header>
  );
};
