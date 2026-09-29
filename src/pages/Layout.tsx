import { Outlet } from "react-router-dom";
import { Nav } from "../components/nav/Nav";
import AppBackground from "../components/background/AppBackground";
import "../App.css";

export const Layout = () => (
  <>
    <AppBackground>
      <div className="app-layout">
        <Nav />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </AppBackground>
  </>
);
