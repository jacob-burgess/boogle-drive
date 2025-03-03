import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";

export function AppFooter() {
  return (
    <footer className="py-6 px-4 md:px-8 md:py-0">
      <div className="flex items-center h-8 md:h-16 justify-between gap-4">
        <p className="text-balance text-sm leading-loose text-muted-foreground">
          by{" "}
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            boogie
          </a>
          .
        </p>
        <nav className="flex items-center">
          <Link to={siteConfig.links.github} target="_blank" rel="noreferrer">
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "h-8 w-8 px-0"
              )}
            >
              <Icons.gitHub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <Link to={siteConfig.links.twitter} target="_blank" rel="noreferrer">
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "h-8 w-8 px-0"
              )}
            >
              <Icons.twitter className="h-3 w-3 fill-current" />
              <span className="sr-only">Twitter</span>
            </div>
          </Link>
        </nav>
      </div>
    </footer>
  );
}
