import { AppMainNav } from "@/components/app-main-nav";
import { AppMobileNav } from "@/components/app-mobile-nav";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        <div className="hidden md:flex w-full">
          <AppMainNav />
        </div>
        <div className="block md:hidden">
          <AppMobileNav />
        </div>
      </div>
    </header>
  );
}
