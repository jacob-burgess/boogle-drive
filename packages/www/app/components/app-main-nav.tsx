"use client";

import { Link } from "@tanstack/react-router";

export function AppMainNav() {
  return (
    <div className="mr-4 flex">
      <Link to="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <p className="text-xl font-bold lg:inline-block">
          <span className="text-blue-300">boogle</span>
          <span className="text-green-600">drive</span>
        </p>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <NavItem to="/drive">Drive</NavItem>
        {/* <NavItem to="/search">Search</NavItem> */}
      </nav>
    </div>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: true }}
      className="transition-colors hover:text-foreground/80"
      activeProps={{ className: "text-foreground" }}
      inactiveProps={{ className: "text-foreground/60" }}
    >
      {children}
    </Link>
  );
}
