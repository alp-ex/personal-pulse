"use client";

import { ThemeToggle } from "./ThemeToggle";
import { TABS } from "@/lib/tabs";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <h1 className="text-lg font-bold tracking-tight">
            Personal Pulse
          </h1>
          <ThemeToggle />
        </div>
        <nav className="flex gap-1 overflow-x-auto pb-2 -mb-px scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
