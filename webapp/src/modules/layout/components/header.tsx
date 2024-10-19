import * as React from "react";
import { ThemeSwitcher } from "./theme-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useAccount, useDisconnect } from "wagmi";
import { Badge } from "@/components/ui/badge";
import { usePolygonStore } from "@/modules/polygon/store/polygon-store";

export function Header() {
  const { loadingErc20, erc20Price } = usePolygonStore();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <div className="w-full flex h-16 items-center justify-between py-4 mb-8">
      <div className="flex flex-row gap-4">
        <div className="flex gap-1 md:gap-0">
          <img
            src="https://cdn.prod.website-files.com/61c25b8fda22538c7d02b8ae/64109452b73a8648ed02afee_mode-logo.svg"
            className="w-24 max-w-full"
            alt={"Mode Mobile To-do List"}
          />
        </div>
        {!loadingErc20 && (
          <Badge
            className="text-sm md:text-md border-blue-500"
            variant="secondary"
          >
            Curr Erc20 Balance: {erc20Price}
          </Badge>
        )}
      </div>
      <div className="flex flex-row gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-14 h-14 p-0 rounded-full m-0 border-none"
            >
              <div className="w-12 h-12">
                <img
                  src={"https://ui.shadcn.com/avatars/02.png"}
                  className="rounded-full w-12 h-12"
                />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="flex flex-row gap-1">
              Welcome back {address?.slice(0, 8)}...
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={async (event) => {
                signOut();
                disconnect();
                window.location.href = "/login";
              }}
              className="cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
