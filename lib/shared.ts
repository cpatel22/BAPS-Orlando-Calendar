import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

/**
 * shared/events.js       — the event data (the only file you edit)
 * shared/calendar-core.js — the calendar logic used by the three HTML pages
 *
 * The server serves both files to the pages AND runs them itself to build
 * /calendar.ics, so pages and server always use the exact same logic.
 */
const DIR = path.join(process.cwd(), "shared");
export const EVENTS_FILE = path.join(DIR, "events.js");
export const CORE_FILE = path.join(DIR, "calendar-core.js");

export const readShared = (file: string) => readFile(file, "utf8");

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
