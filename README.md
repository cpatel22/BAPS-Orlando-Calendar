# BAPS Orlando Calendar — Next.js 

The three original calendar designs, unchanged, served by one Next.js app with
one shared event file and one calendar feed.

| URL | Design | File |
|---|---|---|
| `/` | Month list (search, filters, PDF, upcoming) | `public/index.html` |
| `/v1` | Bold month pages | `public/index-v1.html` |
| `/v2` | Year wheel | `public/index-v2.html` |
| `/calendar.ics` | Live calendar feed for all pages | `app/calendar.ics/route.ts` |

## Edit events

Edit **`shared/events.js`** only. All three pages and `/calendar.ics` read it
on every request, so a refresh shows the change (no rebuild needed when running
`next start` on a server). If the file has a mistake, `/calendar.ics` returns
the exact problem, e.g. `unknown type "Party"`.

## One "Add to calendar" action

Every page's **Add to calendar** button runs `BAPS.addToCalendar()` in
`shared/calendar-core.js`:

- **iPhone / iPad** – subscribes with `webcal://…/calendar.ics`. Later edits
  appear in the phone's Calendar by themselves.
- **Android** – opens Google Calendar to subscribe (needs the site to be on a
  public address; Google re-checks every few hours).
- **Computers** – downloads `/calendar.ics`. Downloading and opening it again
  updates events instead of duplicating them; the notice also offers a
  subscribe link for Outlook / Google / Apple Calendar.
- **In-app browsers** (WhatsApp, Instagram…) – asks to open in Safari/Chrome.

The `.ics` text is built by `buildIcs()` in `shared/calendar-core.js`. The
server runs that same file (`lib/shared.ts`) to produce `/calendar.ics`, so
there is one calendar logic for everything.

Tip: if you may change an event's date, time or name later, give it an
`"id"` (e.g. `"id": "annakut-2027"`). Downloaded calendars then update that
event instead of adding a second copy. Subscribed calendars always stay in sync.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Deploy anywhere Next.js runs (Azure App Service, Vercel, a VM). On Vercel,
editing `shared/events.js` means commit + redeploy.

## Layout

```
shared/events.js           event data (edit this)
shared/calendar-core.js    shared logic: checks, sorting, .ics, Add to calendar
public/*.html              the three designs
public/images/baps-logo.png
app/events.js/route.ts         serves shared/events.js
app/calendar-core.js/route.ts  serves shared/calendar-core.js
app/calendar.ics/route.ts      the calendar feed
lib/shared.ts              runs the shared files on the server
```
