import { readShared, EVENTS_FILE as FILE } from "@/lib/shared";

// Serves shared/events.js to the HTML pages. no-cache: browsers re-check it, so edits show on the next refresh.
export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(await readShared(FILE), {
    headers: { "Content-Type": "text/javascript; charset=utf-8", "Cache-Control": "no-cache" },
  });
}
