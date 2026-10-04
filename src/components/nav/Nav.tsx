import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const links = [
  { to: "/", label: "Översikt" },
  { to: "/mood", label: "Humör" },
  { to: "/sleep", label: "Sömn" },
  { to: "/activity-overview", label: "Aktivitet" },
  { to: "/insights", label: "Insikter" },
  { to: "/settings", label: "Inställningar" },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const { user } = useAuth();

  return (
    <ul className="nav-links">
      {links.map(({ to, label }) => (
        <li key={to}>
          <NavLink to={to} end={to === "/"} onClick={onNavigate}>
            {label}
          </NavLink>
        </li>
      ))}
      <li className="border-t border-gray-300 mt-4 pt-4">
        {user ? (
          <button
            type="button"
            onClick={() => {
              console.log("Klickat på logga ut");
              onNavigate?.();
            }}
          >
            Logga ut
          </button>
        ) : (
          <NavLink to="/login" onClick={onNavigate}>
            Logga in
          </NavLink>
        )}
      </li>
    </ul>
  );
}

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <>
      <nav className="navbar hidden md:block" aria-label="Huvudnavigation">
        <div className="w-full flex items-center justify-center mt-4">
          <span className="mb-6 inline-block rounded-full bg-(--dusty-powder-blue-light) px-4 py-1.5 text-xs font-medium tracking-[0.15em] uppercase">
            Wellio
          </span>
        </div>
        <NavLinks />
      </nav>
      <div className="flex items-center justify-between p-3 md:hidden">
        <span>Wellio</span>
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button type="button" variant="outline" aria-label="Öppna meny">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Meny
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Meny</SheetTitle>
              <SheetDescription className="sr-only">
                Navigera mellan Wellios sidor.
              </SheetDescription>
            </SheetHeader>
            <nav aria-label="Mobilnavigation" className="px-6 pb-6">
              <NavLinks onNavigate={() => setMenuOpen(false)} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
