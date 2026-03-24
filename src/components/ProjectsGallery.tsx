"use client";

import { useState } from "react";
import { useProjects, type ProjectStatus } from "@/hooks/useProjects";

const STATUS_CONFIG: Record<ProjectStatus, { label: string; color: string }> = {
  idea: { label: "Idea", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  in_progress: { label: "In Progress", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  done: { label: "Done", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
};

const ALL_STATUSES: (ProjectStatus | "all")[] = ["all", "idea", "in_progress", "done"];

function AddProjectForm({ onAdd }: { onAdd: (title: string, notes: string) => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), notes.trim());
    setTitle("");
    setNotes("");
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 py-4 text-sm text-slate-400 dark:text-slate-500 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-500 dark:hover:text-slate-400 transition-colors"
      >
        + New project
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project title"
        autoFocus
        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm mb-2 outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
      />
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes, ideas, links..."
        rows={3}
        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm mb-3 outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 resize-none"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!title.trim()}
          className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function ProjectCard({
  project,
  onUpdate,
  onRemove,
}: {
  project: { id: string; title: string; notes: string; status: ProjectStatus; updatedAt: string };
  onUpdate: (id: string, changes: Partial<{ title: string; notes: string; status: ProjectStatus }>) => void;
  onRemove: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [notes, setNotes] = useState(project.notes);
  const config = STATUS_CONFIG[project.status];

  function handleSave() {
    if (!title.trim()) return;
    onUpdate(project.id, { title: title.trim(), notes: notes.trim() });
    setEditing(false);
  }

  function cycleStatus() {
    const order: ProjectStatus[] = ["idea", "in_progress", "done"];
    const idx = order.indexOf(project.status);
    const next = order[(idx + 1) % order.length];
    onUpdate(project.id, { status: next });
  }

  if (editing) {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm mb-2 outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100"
        />
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm mb-3 outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 resize-none"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity"
          >
            Save
          </button>
          <button
            onClick={() => { setTitle(project.title); setNotes(project.notes); setEditing(false); }}
            className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-sm leading-snug">{project.title}</h3>
        <button
          onClick={cycleStatus}
          className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}
        >
          {config.label}
        </button>
      </div>
      {project.notes && (
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 whitespace-pre-line mb-3">
          {project.notes}
        </p>
      )}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {new Date(project.updatedAt).toLocaleDateString()}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setEditing(true)}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onRemove(project.id)}
            className="text-xs text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProjectsGallery() {
  const { projects, add, update, remove } = useProjects();
  const [filter, setFilter] = useState<ProjectStatus | "all">("all");

  const filtered = filter === "all"
    ? projects
    : projects.filter((p) => p.status === filter);

  return (
    <div>
      {/* Status filter */}
      <div className="flex gap-1 mb-4">
        {ALL_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === s
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {s === "all" ? "All" : STATUS_CONFIG[s].label}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {filtered.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onUpdate={update}
            onRemove={remove}
          />
        ))}
      </div>

      <AddProjectForm onAdd={(title, notes) => add(title, notes)} />
    </div>
  );
}
