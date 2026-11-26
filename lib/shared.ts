import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { CORE_JS, EVENTS_JS } from "@/lib/shared-sources";

/**
 * shared/events.js       — the event data (the only file you edit)
 * shared/calendar-core.js — the calendar logic used by the three HTML pages
 *
 * Locally we read from disk so edits show up on refresh.
 * On Vercel the files may not be in the serverless bundle, so we fall back
 * to the build-time embed in lib/shared-sources.ts (see scripts/embed-shared.mjs).
 */
const DIR = path.join(process.cwd(), "shared");
export const EVENTS_FILE = path.join(DIR, "events.js");
export const CORE_FILE = path.join(DIR, "calendar-core.js");

async function readWithFallback(file: string, fallback: string) {
  try {
    return await readFile(file, "utf8");
  } catch {
    return fallback;
  }
}

export const readShared = (file: string) =>
  readWithFallback(file, file === CORE_FILE ? CORE_JS : EVENTS_JS);

interface Baps {
  errors: string[];
  title: string;
  icsFileName: string;
  buildIcs(): string;
}

/** Run events.js + calendar-core.js (same files the browser loads) and return window.BAPS. */
export async function loadBaps(): Promise<Baps> {
  const [events, core] = await Promise.all([readShared(EVENTS_FILE), readShared(CORE_FILE)]);
  const ctx: Record<string, unknown> = { console };
  ctx.window = ctx; // the scripts write to window.BAPS_CALENDAR / window.BAPS
  vm.createContext(ctx);
  try {
    vm.runInContext(events, ctx, { filename: "shared/events.js" });
  } catch (e) {
    throw new Error("shared/events.js could not be read — check for a missing quote, comma or bracket.\n" + (e as Error).message);
  }
  vm.runInContext(core, ctx, { filename: "shared/calendar-core.js" });
  const baps = ctx.BAPS as Baps | null;
  if (!baps) throw new Error("shared/events.js must set window.BAPS_CALENDAR = { ... };");
  if (baps.errors.length) throw new Error("shared/events.js has problems:\n" + baps.errors.join("\n"));
  return baps;
}
