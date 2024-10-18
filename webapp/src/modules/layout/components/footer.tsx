import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";
import { ThemeSwitcher } from "./theme-switcher";

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className, "w-full")}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-2 sm:px-4 md:px-8 md:flex-row md:gap-2 md:px-0">
          <img
            src="https://cdn.prod.website-files.com/61c25b8fda22538c7d02b8ae/64109452b73a8648ed02afee_mode-logo.svg"
            className="w-12"
          />
          <p className="text-center text-sm leading-loose md:text-left">
            To-do App by{" "}
            <a
              href={"https://www.modemobile.com/"}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Mode Mobile
            </a>
          </p>
          <p className="gap-4 sm:px-2 md:px-8  text-center text-sm text-muted-foreground">
            <Link
              href="https://www.modemobile.com/privacy"
              className="hover:text-brand hover:underline hover:underline-offset-4"
            >
              Privacy Policy
            </Link>
            <span className="px-2">·</span>
            <Link
              href="https://www.modemobile.com/terms"
              className="hover:text-brand hover:underline hover:underline-offset-4"
            >
              Terms of Use
            </Link>
          </p>
        </div>
        <div>
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
}
