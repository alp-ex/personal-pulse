"use client";

import { useState, useEffect, useCallback } from "react";

export type ProjectStatus = "idea" | "in_progress" | "done";

export interface Project {
  id: string;
  title: string;
  notes: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "personal-pulse-projects";

function load(): Project[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(projects: Project[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    /* ignore */
  }
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(load());
  }, []);

  const add = useCallback((title: string, notes: string, status: ProjectStatus = "idea") => {
    const now = new Date().toISOString();
    const project: Project = {
      id: crypto.randomUUID(),
      title,
      notes,
      status,
      createdAt: now,
      updatedAt: now,
    };
    setProjects((prev) => {
      const next = [project, ...prev];
      save(next);
      return next;
    });
  }, []);

  const update = useCallback((id: string, changes: Partial<Pick<Project, "title" | "notes" | "status">>) => {
    setProjects((prev) => {
      const next = prev.map((p) =>
        p.id === id ? { ...p, ...changes, updatedAt: new Date().toISOString() } : p
      );
      save(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setProjects((prev) => {
      const next = prev.filter((p) => p.id !== id);
      save(next);
      return next;
    });
  }, []);

  return { projects, add, update, remove };
}
