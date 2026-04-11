"use client";

import { useState } from "react";
import {
  THINKING_SESSIONS,
  type ThinkingSession,
  type SessionSection,
} from "@/lib/thinking-sessions";

function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
      {tag}
    </span>
  );
}

function SessionCard({
  session,
  onClick,
}: {
  session: ThinkingSession;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {new Date(session.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span className="text-xs text-slate-300 dark:text-slate-600">·</span>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {session.sections.length} sections
        </span>
      </div>
      <h3 className="font-semibold text-base leading-snug mb-2">
        {session.title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-3">
        {session.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {session.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </button>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-4 rounded-lg border border-slate-200 dark:border-slate-800">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800/50">
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left px-3 py-2 font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="border-t border-slate-100 dark:border-slate-800"
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-3 py-2 text-slate-700 dark:text-slate-300 whitespace-nowrap ${
                    ci === 0 ? "font-medium" : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionBlock({ section, index }: { section: SessionSection; index: number }) {
  return (
    <div className="mb-8">
      <h3 className="text-base font-bold mb-3 flex items-center gap-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold shrink-0">
          {index + 1}
        </span>
        {section.title}
      </h3>

      {section.highlight && (
        <div className="mb-3 px-4 py-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30">
          <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
            {section.highlight}
          </p>
        </div>
      )}

      <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
        {section.content}
      </div>

      {section.table && (
        <DataTable headers={section.table.headers} rows={section.table.rows} />
      )}
    </div>
  );
}

function SessionReader({
  session,
  onBack,
}: {
  session: ThinkingSession;
  onBack: () => void;
}) {
  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 mb-4 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to sessions
      </button>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {new Date(session.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <h2 className="text-xl font-bold leading-tight mb-3">
          {session.title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
          {session.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {session.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </div>

      {/* Section navigation */}
      <div className="mb-6 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
          Contents
        </p>
        <ol className="space-y-1">
          {session.sections.map((section, i) => (
            <li key={i}>
              <a
                href={`#section-${i}`}
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              >
                {i + 1}. {section.title}
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* Sections */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {session.sections.map((section, i) => (
          <div key={i} id={`section-${i}`} className="pt-6 first:pt-0">
            <SectionBlock section={section} index={i} />
          </div>
        ))}
      </div>

      {/* Sources */}
      {session.sources.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
            Sources
          </p>
          <ul className="space-y-1">
            {session.sources.map((source, i) => (
              <li key={i}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function ThinkingGallery() {
  const [activeSession, setActiveSession] = useState<string | null>(null);

  const session = activeSession
    ? THINKING_SESSIONS.find((s) => s.id === activeSession)
    : null;

  if (session) {
    return (
      <SessionReader session={session} onBack={() => setActiveSession(null)} />
    );
  }

  return (
    <div className="space-y-3">
      {THINKING_SESSIONS.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          onClick={() => setActiveSession(session.id)}
        />
      ))}
      {THINKING_SESSIONS.length === 0 && (
        <div className="text-center py-12 text-sm text-slate-400 dark:text-slate-500">
          No thinking sessions yet. Start a research conversation to create one.
        </div>
      )}
    </div>
  );
}
