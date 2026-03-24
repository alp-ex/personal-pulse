"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { FeedContainer } from "@/components/FeedContainer";
import { HealthTracker } from "@/components/HealthTracker";
import { ProjectsGallery } from "@/components/ProjectsGallery";
import { TABS } from "@/lib/tabs";

export default function Home() {
  const [activeTab, setActiveTab] = useState("news");
  const currentTab = TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-screen">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          {currentTab.description}
        </p>
        {activeTab === "news" && <FeedContainer />}
        {activeTab === "health" && <HealthTracker />}
        {activeTab === "projects" && <ProjectsGallery />}
      </main>
    </div>
  );
}
