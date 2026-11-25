/* =====================================================================
   BAPS Orlando Calendar — SHARED LOGIC (used by every calendar page)
   Reads the data in events.js and provides:
     BAPS.data          the raw object from events.js
     BAPS.errors        list of problems found in events.js ([] = all good)
     BAPS.events        events checked, sorted by date then start time, with
                        extra fields: allDay, stop (end or start+2h), y, m, d, i
     BAPS.timeLabel()   "17:00" -> "5 PM", "18:30" -> "6:30 PM"
     BAPS.buildIcs()    the full .ics calendar text (RFC 5545)
     BAPS.icsDataUrl()  the .ics as a data: link
     BAPS.icsBlobUrl()  the .ics as a blob: link (for iPhone/iPad Safari)
     BAPS.downloadIcs() saves the .ics file
     BAPS.icsFileName   e.g. "BAPS Orlando Calendar 2027.ics"
   Load order in each page:  events.js  ->  calendar-core.js  ->  page script
   You don't need to edit this file to change events — edit events.js.
   ===================================================================== */
(function () {
  var S = window.BAPS_CALENDAR;
  if (!S) { window.BAPS = null; return; }

  var CATS = S.categories || [];
  var YEAR = +S.year;
  var TZ = S.timezone || 'America/New_York';
  var TITLE = S.calendar || ('BAPS Orlando Calendar ' + YEAR);
  var LOC = S.location || {};
  var WHERE = (LOC.name ? LOC.name + ', ' : '') + (LOC.address || '');

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function plus2h(t) { var h = +t.slice(0, 2) + 2; return h > 23 ? '23:59' : pad(h) + t.slice(2); }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function timeLabel(t) {
    if (!t) return '';
    var h = +t.slice(0, 2), m = t.slice(3, 5), ap = h < 12 ? 'AM' : 'PM';
    h = h % 12 || 12;
    return h + (m !== '00' ? ':' + m : '') + ' ' + ap;
  }

  /* ---------- check ---------- */
  var errors = [];
  (S.events || []).forEach(function (e, i) {
    var w = 'Event ' + (i + 1) + ' "' + (e.name || '?') + '": ';
    if (!e.name) errors.push(w + 'missing name');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date || '') || isNaN(Date.parse(e.date))) errors.push(w + 'bad date "' + e.date + '" (use YYYY-MM-DD)');
    else if (+e.date.slice(0, 4) !== YEAR) errors.push(w + 'date ' + e.date + ' is not in ' + YEAR);
    if (CATS.length && CATS.indexOf(e.type) < 0) errors.push(w + 'unknown type "' + e.type + '" (use one of: ' + CATS.join(', ') + ')');
    if (e.start && !/^\d{2}:\d{2}$/.test(e.start)) errors.push(w + 'bad start "' + e.start + '" (use HH:MM)');
    if (e.end && !/^\d{2}:\d{2}$/.test(e.end)) errors.push(w + 'bad end "' + e.end + '" (use HH:MM)');
    if (e.end && !e.start) errors.push(w + 'has an end but no start');
  });
  if (errors.length && window.console) console.error('events.js has problems:\n' + errors.join('\n'));

  /* ---------- normalise + sort (all-day first on a day, then by start, then file order) ---------- */
  var events = (S.events || []).map(function (e, i) {
    var o = {}; for (var k in e) o[k] = e[k];
    var p = String(e.date).split('-');
    o.y = +p[0]; o.m = +p[1]; o.d = +p[2]; o.i = i;
    o.start = e.start || ''; o.end = e.end || '';
    o.allDay = !e.start;
    o.stop = e.start ? (e.end || plus2h(e.start)) : '';
    o.womensWing = !!e.womensWing;
    return o;
  }).sort(function (a, b) {
    var sa = a.start || '00:00', sb = b.start || '00:00';
    return a.date < b.date ? -1 : a.date > b.date ? 1 : sa < sb ? -1 : sa > sb ? 1 : a.i - b.i;
  });

  /* ---------- .ics ---------- */
  function icsText(s) { return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n'); }
  function bytes(ch) { return unescape(encodeURIComponent(ch)).length; }
  function fold(line) { // max 75 octets per line; continuation lines start with a space
    var out = [], cur = '', n = 0;
    Array.from(line).forEach(function (ch) {
      var b = bytes(ch);
      if (n + b > (out.length ? 74 : 75)) { out.push(cur); cur = ''; n = 0; }
      cur += ch; n += b;
    });
    out.push(cur);
    return out.join('\r\n ');
  }
  function ymd(d) { return d.replace(/-/g, ''); }
  function nextDay(d) {
    var p = d.split('-'), t = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2] + 1));
    return t.getUTCFullYear() + pad(t.getUTCMonth() + 1) + pad(t.getUTCDate());
  }
  function hms(t) { return t.replace(':', '') + '00'; }

  function buildIcs() {
    var stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
    var L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//BAPS Orlando//Calendar ' + YEAR + '//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'X-WR-CALNAME:' + icsText(TITLE), 'X-WR-TIMEZONE:' + TZ,
      'BEGIN:VTIMEZONE', 'TZID:' + TZ,
      'BEGIN:DAYLIGHT', 'TZOFFSETFROM:-0500', 'TZOFFSETTO:-0400', 'TZNAME:EDT', 'DTSTART:19700308T020000', 'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU', 'END:DAYLIGHT',
      'BEGIN:STANDARD', 'TZOFFSETFROM:-0400', 'TZOFFSETTO:-0500', 'TZNAME:EST', 'DTSTART:19701101T020000', 'RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU', 'END:STANDARD',
      'END:VTIMEZONE'];
    events.forEach(function (e) {
      // stable UID: re-importing the file updates events instead of duplicating them
      var uid = e.uid || ('ev-' + e.date + '-' + (e.start ? e.start.replace(':', '') : 'allday') + '-' + slug(e.name));
      L.push('BEGIN:VEVENT', 'UID:' + icsText(uid) + '@baps-orlando', 'DTSTAMP:' + stamp);
      if (e.allDay) L.push('DTSTART;VALUE=DATE:' + ymd(e.date), 'DTEND;VALUE=DATE:' + nextDay(e.date), 'TRANSP:TRANSPARENT');
      else L.push('DTSTART;TZID=' + TZ + ':' + ymd(e.date) + 'T' + hms(e.start), 'DTEND;TZID=' + TZ + ':' + ymd(e.date) + 'T' + hms(e.stop));
      L.push('SUMMARY:' + icsText(e.name), 'DESCRIPTION:' + icsText(e.type), 'CATEGORIES:' + icsText(e.type), 'LOCATION:' + icsText(WHERE),
        'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + icsText('Tomorrow: ' + e.name),
        'TRIGGER:' + (e.allDay ? '-PT15H' : '-P1D'), 'END:VALARM', 'END:VEVENT');
    });
    L.push('END:VCALENDAR');
    return L.map(fold).join('\r\n') + '\r\n';
  }

  var FILE = TITLE.replace(/[^\w\- ]+/g, '') + '.ics';
  function icsDataUrl() {
    return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(buildIcs())
      .replace(/'/g, '%27').replace(/[!()*]/g, function (c) { return '%' + c.charCodeAt(0).toString(16).toUpperCase(); });
  }
  function icsBlobUrl() { return URL.createObjectURL(new Blob([buildIcs()], { type: 'text/calendar;charset=utf-8' })); }
  function downloadIcs() {
    var u = icsBlobUrl(), a = document.createElement('a');
    a.href = u; a.download = FILE; a.rel = 'noopener';
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(u); a.remove(); }, 10000);
  }

  window.BAPS = {
    data: S, errors: errors, events: events, year: YEAR, title: TITLE, timezone: TZ, location: LOC, where: WHERE,
    timeLabel: timeLabel, buildIcs: buildIcs, icsDataUrl: icsDataUrl, icsBlobUrl: icsBlobUrl, downloadIcs: downloadIcs, icsFileName: FILE
  };
})();
