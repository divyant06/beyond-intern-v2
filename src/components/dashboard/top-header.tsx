"use client";

import { Bell, Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TopHeader() {
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
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-400 hover:text-white hover:bg-white/5"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose text-[9px] font-bold text-white">
            3
          </span>
        </Button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-white/5 transition-colors">
              <div className="h-8 w-8 rounded-full gradient-electric flex items-center justify-center text-sm font-bold text-white">
                S
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-white leading-none">Student</p>
                <p className="text-[11px] text-slate-500">Pro Plan</p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-navy-light border-white/10"
          >
            <DropdownMenuItem className="text-slate-300 focus:bg-white/5 focus:text-white">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 focus:bg-white/5 focus:text-white">
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 focus:bg-white/5 focus:text-white">
              Billing
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="text-rose focus:bg-rose/10 focus:text-rose">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
