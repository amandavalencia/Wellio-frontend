import { NavLink } from "react-router-dom";
import "./Nav.css";
import { useAuth } from "../../hooks/useAuth";

export const Nav = () => {
  const { user } = useAuth();
  return (
    <nav className="navbar" aria-label="Huvudnavigation">
      <div className="w-full flex items-center justify-center mt-4">
        <span className="mb-6 inline-block rounded-full bg-(--dusty-powder-blue-light) px-4 py-1.5 text-xs font-medium tracking-[0.15em] uppercase">
          Wellio
        </span>
      </div>
      <ul className="nav-links ">
        <li>
          <NavLink to="/" end>
            Översikt
          </NavLink>
        </li>
        <li>
          <NavLink to="/mood">Humör</NavLink>
        </li>
        <li>
          <NavLink to="/sleep">Sömn</NavLink>
        </li>
        <li>
          <NavLink to="/activity">Aktivitet</NavLink>
        </li>
        <li>
          <NavLink to="/insights">Insikter</NavLink>
        </li>
        <li>
          <NavLink to="/settings">Inställningar</NavLink>
        </li>
        <li className="border-t border-gray-300 mt-4 pt-4">
          {user ? (
            <button
              type="button"
              onClick={() => console.log("Klickat på logga ut")}
            >
              Logga ut
            </button>
          ) : (
            <NavLink to="/login">Logga in</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};
