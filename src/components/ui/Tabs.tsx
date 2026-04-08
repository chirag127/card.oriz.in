import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: { id: string; label: string; content: ReactNode }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex border-b border-border-default overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px",
              activeTab === tab.id
                ? "text-gold border-gold"
                : "text-text-secondary border-transparent hover:text-text-primary hover:border-border-bright"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-6">
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
}
