"use client";

import { useState } from "react";
import { Bell, Search, ChevronDown, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function TopHeader() {
  const { data: session } = useSession();
  const user = session?.user;
  const displayName = user?.name || user?.email?.split("@")[0] || "Student";
  const initial = displayName.charAt(0).toUpperCase();
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/5 bg-navy/80 backdrop-blur-xl px-6">
      {/* Search */}
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input
          placeholder="Search courses, modules..."
          className="h-9 pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-electric/50 rounded-lg w-full max-w-sm"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Link href="/dashboard/notifications" onClick={() => setHasNotifications(false)}>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-400 hover:text-white hover:bg-white/5"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {hasNotifications && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose text-[9px] font-bold text-white">
                2
              </span>
            )}
          </Button>
        </Link>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-white/5 transition-colors focus:outline-none">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={displayName}
                  width={32}
                  height={32}
                  className="rounded-full ring-2 ring-electric/40"
                />
              ) : (
                <div className="h-8 w-8 rounded-full gradient-electric flex items-center justify-center text-sm font-bold text-white">
                  {initial}
                </div>
              )}
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-white leading-none">
                  {displayName}
                </p>
                <p className="text-[11px] text-slate-500">
                  {user?.email || "Pro Plan"}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-navy-light border-white/10"
          >
            <DropdownMenuItem
              render={<Link href="/dashboard" />}
              className="text-slate-300 focus:bg-white/5 focus:text-white"
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              render={<Link href="/dashboard/settings" />}
              className="text-slate-300 focus:bg-white/5 focus:text-white"
            >
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 focus:bg-white/5 focus:text-white">
              Billing
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-rose focus:bg-rose/10 focus:text-rose gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
