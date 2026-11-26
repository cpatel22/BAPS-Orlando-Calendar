import { loadBaps } from "@/lib/shared";

// Rebuilt from shared/events.js on every request, so subscribed calendars pick up each edit.
export const dynamic = "force-dynamic";

/**
 * The single calendar feed for all pages.
 *   GET /calendar.ics            -> inline (calendar subscriptions: iPhone webcal://, Google, Outlook)
 *   GET /calendar.ics?download=1 -> file download (re-import updates events, it doesn't duplicate them)
 */
export async function GET(req: Request) {
  try {
    const baps = await loadBaps();
    const download = new URL(req.url).searchParams.has("download");
    return new Response(baps.buildIcs(), {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${baps.icsFileName}"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response((e as Error).message, { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
}
