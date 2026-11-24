/*
 * Kriya — spa booking app
 * Vanilla JS single-page app (no build step). Hash routing, view functions
 * that return HTML, one delegated event handler for all interactions.
 */
(function () {
  'use strict';

  var D = window.KRIYA_DATA;
  var Store = window.KriyaStore;
  var view = document.getElementById('view');

  /* ------------------------------------------------------------------ *
   * Icons (24px line set)
   * ------------------------------------------------------------------ */
  var ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    gift: '<rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8M12 8v13"/><path d="M12 8C10 4 6 4 6 6.5S9 8 12 8c3 0 6-.5 6-1.5S14 4 12 8z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
    sparkle: '<path d="M12 3c.5 4.5 2 6 6.5 6.5-4.5.5-6 2-6.5 6.5-.5-4.5-2-6-6.5-6.5C10 9 11.5 7.5 12 3z"/><path d="M18.5 15c.2 1.8.8 2.4 2.5 2.5-1.7.2-2.3.8-2.5 2.5-.2-1.7-.8-2.3-2.5-2.5 1.7-.1 2.3-.7 2.5-2.5z"/>',
    leaf: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19 13 11"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>',
    pin: '<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    refresh: '<path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/>',
    share: '<path d="M12 3v13M7 8l5-5 5 5"/><path d="M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M21 20H3"/>',
    crown: '<path d="m3 8 4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.5 3.5-5 6.5-5s5.5 1.5 6.5 5"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.5 0 4 1.5 4.5 4"/>',
    cake: '<path d="M4 21V13a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8M2 21h20"/><path d="M4 16c2 1.5 4 1.5 5.3 0 1.4 1.5 4 1.5 5.4 0 1.3 1.5 3.3 1.5 5.3 0M12 11V7"/><path d="M12 3.5c.8.8.8 2 0 2.5-.8-.5-.8-1.7 0-2.5z"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    message: '<path d="M4 5h16v11H8l-4 4z"/>',
    wave: '<path d="M2 12c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-2 5-1.5"/><path d="M2 17c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-2 5-1.5"/><path d="M2 7c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-2 5-1.5"/>',
  };
  function icon(name, cls) {
    return '<svg class="ico ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
  }
  var MOOD_ICON = { calm: 'moon', restore: 'leaf', glow: 'sun', release: 'drop' };
  var CAT_ICON = { Massage: 'wave', Facial: 'sparkle', Body: 'leaf', Thermal: 'drop', Mind: 'moon' };

  /* ------------------------------------------------------------------ *
   * Utilities
   * ------------------------------------------------------------------ */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function money(n) {
    var cents = Math.round(n * 100) % 100 !== 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: D.spa.currency,
      minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0,
    }).format(n);
  }
  function pad(n) { return String(n).padStart(2, '0'); }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parseYmd(s) { var p = s.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function addDays(dateStr, n) { var d = parseYmd(dateStr); d.setDate(d.getDate() + n); return ymd(d); }
  function at(dateStr, min) { var d = parseYmd(dateStr); d.setMinutes(min); return d; }
  function today() { return ymd(new Date()); }
  function nowMin() { var n = new Date(); return n.getHours() * 60 + n.getMinutes(); }
  function timeLabel(min) {
    var h = Math.floor(min / 60), m = min % 60;
    return ((h + 11) % 12 + 1) + ':' + pad(m) + ' ' + (h < 12 ? 'AM' : 'PM');
  }
  function durLabel(m) {
    if (m < 60) return m + ' min';
    var h = Math.floor(m / 60), r = m % 60;
    return h + ' hr' + (r ? ' ' + r + ' min' : '');
  }
  function dayLabel(dateStr, long) {
    if (dateStr === today()) return 'Today';
    if (dateStr === addDays(today(), 1)) return 'Tomorrow';
    return parseYmd(dateStr).toLocaleDateString('en-US', long
      ? { weekday: 'long', month: 'long', day: 'numeric' }
      : { weekday: 'short', month: 'short', day: 'numeric' });
  }
  function relative(dateStr, min) {
    var diff = at(dateStr, min) - new Date();
    var h = Math.round(diff / 36e5);
    if (h < 1) return 'starting soon';
    if (h < 24) return 'in ' + h + ' hour' + (h === 1 ? '' : 's');
    var d = Math.round(h / 24);
    return 'in ' + d + ' day' + (d === 1 ? '' : 's');
  }
  function initials(name) {
    return (name || '').trim().split(/\s+/).slice(0, 2).map(function (p) { return p[0]; }).join('').toUpperCase() || '✦';
  }
  function firstName() { return (Store.get().user.name || '').trim().split(/\s+/)[0]; }
  function artStyle(a) { return '--a:' + a[0] + ';--b:' + a[1] + ';--c:' + a[2]; }
  function hash(str) {
    var h = 2166136261 >>> 0;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function svc(id) { return D.services.find(function (s) { return s.id === id; }); }
  function therapist(id) { return D.therapists.find(function (t) { return t.id === id; }); }
  function addOn(id) { return D.addOns.find(function (a) { return a.id === id; }); }
  function avatar(t) {
    return '<span class="avatar" style="--a:' + t.art[0] + ';--b:' + t.art[1] + '">' + initials(t.name) + '</span>';
  }

  /* ------------------------------------------------------------------ *
   * Availability engine
   * Other clients' bookings are simulated deterministically so the
   * calendar looks real; swap synthBusy() for an API call in production.
   * ------------------------------------------------------------------ */
  function works(t, dateStr) { return t.days.indexOf(parseYmd(dateStr).getDay()) !== -1; }
  function busyRate(dateStr, min) {
    var dow = parseYmd(dateStr).getDay();
    var r = 0.3;
    if (dow === 0 || dow === 6) r += 0.18;
    if (dow === 5) r += 0.08;
    if (dow === 2 || dow === 3) r -= 0.08;
    if (min >= 17 * 60) r += 0.12;
    if (min < 11 * 60) r -= 0.06;
    return r;
  }
  function synthBusy(tid, dateStr, min) {
    return (hash(tid + '|' + dateStr + '|' + min) % 1000) / 1000 < busyRate(dateStr, min);
  }
  function activeBookings() {
    return Store.get().bookings.filter(function (b) { return b.status !== 'cancelled'; });
  }
  function userBusy(tid, dateStr, start, dur, ignoreId) {
    return activeBookings().some(function (b) {
      return b.id !== ignoreId && b.therapistId === tid && b.date === dateStr && start < b.min + b.duration && b.min < start + dur;
    });
  }
  function therapistsFor(s) { return D.therapists.filter(function (t) { return t.skills.indexOf(s.category) !== -1; }); }
  function freeTherapists(s, dateStr, start, pref, ignoreId, dur) {
    dur = dur || s.duration;
    if (start + dur > D.spa.close) return [];
    return therapistsFor(s).filter(function (t) {
      if (pref !== 'any' && t.id !== pref) return false;
      if (!works(t, dateStr)) return false;
      for (var m = start; m < start + dur; m += 30) if (synthBusy(t.id, dateStr, m)) return false;
      return !userBusy(t.id, dateStr, start, dur, ignoreId);
    });
  }
  function slotsFor(s, dateStr, pref, ignoreId) {
    var out = [];
    var cutoff = dateStr === today() ? nowMin() + 45 : -1;
    for (var m = D.spa.open; m + s.duration <= D.spa.close; m += 30) {
      if (m < cutoff) continue;
      var free = freeTherapists(s, dateStr, m, pref, ignoreId);
      if (free.length) out.push({ min: m, therapists: free.map(function (t) { return t.id; }) });
    }
    return out;
  }
  function isLastMinute(dateStr, min) {
    var diff = at(dateStr, min) - new Date();
    return diff > 0 && diff <= LAST_MINUTE_HOURS * 36e5;
  }
  var LAST_MINUTE_HOURS = 12;
  /* A handful of empty slots in the next few hours, offered at 20% off to fill the book. */
  function openings(limit) {
    var res = [];
    var days = [today(), addDays(today(), 1)];
    D.services.forEach(function (s) {
      days.forEach(function (day) {
        var slots = slotsFor(s, day, 'any').filter(function (x) { return isLastMinute(day, x.min); });
        if (!slots.length) return;
        var pick = slots[hash(s.id + day) % slots.length];
        res.push({ service: s, date: day, min: pick.min, therapistId: pick.therapists[0] });
      });
    });
    res.sort(function (a, b) { return at(a.date, a.min) - at(b.date, b.min); });
    var seen = {};
    return res.filter(function (o) {
      if (seen[o.service.id]) return false;
      seen[o.service.id] = 1;
      return true;
    }).slice(0, limit || 8);
  }

  /* ------------------------------------------------------------------ *
   * Pricing & rewards
   * ------------------------------------------------------------------ */
  function tierFor(lifetime) {
    var cur = D.tiers[0], next = null;
    D.tiers.forEach(function (t, i) { if (lifetime >= t.min) { cur = t; next = D.tiers[i + 1] || null; } });
    return { cur: cur, next: next };
  }
  function multiplier() {
    var st = Store.get();
    var m = { seed: 1, bloom: 1.25, radiance: 1.5 }[tierFor(st.lifetimePoints).cur.id] || 1;
    return st.membership ? m * 2 : m;
  }
  function priorBookings(ignoreId) {
    return activeBookings().filter(function (b) { return b.id !== ignoreId; }).length;
  }
  function quote(d) {
    var s = svc(d.serviceId);
    var extras = d.addOns.map(addOn);
    var extrasTotal = extras.reduce(function (a, x) { return a + x.price; }, 0);
    var offers = [];
    if (!priorBookings(d.replaces)) offers.push({ key: 'welcome', label: 'First-visit welcome', pct: 20 });
    if (d.min != null && d.date && isLastMinute(d.date, d.min)) offers.push({ key: 'lastminute', label: 'Last-minute opening', pct: 20 });
    if (Store.get().membership) offers.push({ key: 'member', label: 'Circle member', pct: 15 });
    if (d.rebook) offers.push({ key: 'rebook', label: 'Rebook reward', pct: 10 });
    var best = offers.reduce(function (a, o) { return !a || o.pct > a.pct ? o : a; }, null);
    var discount = best ? Math.round(s.price * best.pct) / 100 : 0;
    var subtotal = s.price + extrasTotal;
    var credit = Math.min(Store.get().credit, subtotal - discount);
    var total = Math.max(0, subtotal - discount - credit);
    return {
      service: s, extras: extras, subtotal: subtotal, offer: best, discount: discount,
      credit: credit, total: total, points: Math.floor(total * multiplier()),
      duration: s.duration + extras.reduce(function (a, x) { return a + x.duration; }, 0),
    };
  }
  function bookingState(b) {
    if (b.status === 'cancelled') return 'cancelled';
    return at(b.date, b.min + b.duration) < new Date() ? 'completed' : 'upcoming';
  }

  /* ------------------------------------------------------------------ *
   * UI helpers: toast, sheet, confetti, calendar file, clipboard
   * ------------------------------------------------------------------ */
  function toast(msg, ic) {
    var wrap = document.getElementById('toasts');
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = icon(ic || 'sparkle') + '<span>' + esc(msg) + '</span>';
    wrap.appendChild(el);
    setTimeout(function () { el.classList.add('out'); setTimeout(function () { el.remove(); }, 320); }, 2800);
  }
  var sheetRoot = document.getElementById('sheet');
  function openSheet(html) {
    sheetRoot.innerHTML = '<div class="sheet-backdrop" data-action="close-sheet"></div><div class="sheet" role="dialog" aria-modal="true">' + html + '</div>';
    sheetRoot.hidden = false;
    var btn = sheetRoot.querySelector('.btn');
    if (btn) btn.focus();
  }
  function closeSheet() { sheetRoot.hidden = true; sheetRoot.innerHTML = ''; }
  function confetti() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var colors = ['#2F4A3A', '#C0694A', '#E8C4A8', '#A88A4E', '#9DBFA8', '#F2A884'];
    var box = document.createElement('div');
    box.className = 'confetti';
    for (var i = 0; i < 70; i++) {
      var p = document.createElement('i');
      p.style.left = Math.random() * 100 + 'vw';
      p.style.background = colors[i % colors.length];
      p.style.animationDelay = Math.random() * 0.5 + 's';
      p.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
      p.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
      box.appendChild(p);
    }
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 3400);
  }
  function downloadIcs(b) {
    var s = svc(b.serviceId);
    var f = function (d) { return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); };
    var ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Kriya//Booking//EN', 'BEGIN:VEVENT',
      'UID:' + b.id + '@kriya', 'DTSTAMP:' + f(new Date()),
      'DTSTART:' + f(at(b.date, b.min)), 'DTEND:' + f(at(b.date, b.min + b.duration)),
      'SUMMARY:' + s.name + ' at ' + D.spa.name,
      'LOCATION:' + D.spa.address + '\\, ' + D.spa.city,
      'DESCRIPTION:With ' + therapist(b.therapistId).name + '. Arrive 15 minutes early to settle in.',
      'BEGIN:VALARM', 'TRIGGER:-PT2H', 'ACTION:DISPLAY', 'DESCRIPTION:Your ritual starts soon', 'END:VALARM',
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    a.download = 'kriya-' + s.id + '.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast('Added to your calendar', 'calendar');
  }
  function copy(text, msg) {
    var done = function () { toast(msg || 'Copied', 'copy'); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, done);
    else {
      var t = document.createElement('textarea');
      t.value = text; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); } catch (e) { /* ignore */ }
      t.remove(); done();
    }
  }
  function buzz() { if (navigator.vibrate) navigator.vibrate(12); }

  /* ------------------------------------------------------------------ *
   * Shared components
   * ------------------------------------------------------------------ */
  function serviceCard(s) {
    var fav = Store.get().favorites.indexOf(s.id) !== -1;
    return '<a class="card" href="#/service/' + s.id + '">' +
      '<div class="art" style="' + artStyle(s.art) + '">' + icon(CAT_ICON[s.category], 'glyph') + '</div>' +
      '<div class="card-tags">' + (s.popular ? '<span class="tag tag-glass">' + icon('star') + 'Most loved</span>' : '') + '</div>' +
      '<button class="fav ' + (fav ? 'on' : '') + '" data-action="fav" data-id="' + s.id + '" aria-label="' + (fav ? 'Remove from' : 'Save to') + ' favorites" aria-pressed="' + fav + '">' + icon('heart') + '</button>' +
      '<div class="card-body">' +
        '<span class="eyebrow">' + esc(s.category) + '</span>' +
        '<h3>' + esc(s.name) + '</h3>' +
        '<p>' + esc(s.short) + '</p>' +
        '<div class="card-foot"><span class="meta">' + icon('clock', 'ico-sm') + durLabel(s.duration) + ' · <span class="price">' + money(s.price) + '</span></span>' +
        '<span class="round-go">' + icon('arrowRight') + '</span></div>' +
      '</div></a>';
  }
  function openingCard(o) {
    var t = therapist(o.therapistId);
    var now = Math.round(o.service.price * 0.8);
    return '<a class="opening" href="#/book/' + o.service.id + '" data-action="take-opening" data-id="' + o.service.id + '" data-date="' + o.date + '" data-min="' + o.min + '">' +
      '<div class="opening-top"><div class="opening-thumb art" style="' + artStyle(o.service.art) + '"></div>' +
      '<div><div class="opening-day">' + dayLabel(o.date) + '</div><div class="opening-time">' + timeLabel(o.min) + '</div></div>' +
      '<span class="tag tag-accent" style="margin-left:auto">' + icon('bolt') + '20% off</span></div>' +
      '<div><h4>' + esc(o.service.name) + '</h4><div class="opening-meta">' + durLabel(o.service.duration) + ' · with ' + esc(t.name.split(' ')[0]) + '</div></div>' +
      '<div class="opening-foot"><span><span class="price-was">' + money(o.service.price) + '</span><span class="price-now">' + money(now) + '</span></span>' +
      '<span class="link">Grab it ' + icon('arrowRight', 'ico-sm') + '</span></div></a>';
  }
  function sectionHead(eyebrow, title, sub, link) {
    return '<div class="section-head"><div>' +
      (eyebrow ? '<span class="eyebrow">' + eyebrow + '</span>' : '') +
      '<h2>' + title + '</h2>' + (sub ? '<p>' + sub + '</p>' : '') + '</div>' +
      (link ? '<a class="link" href="' + link[1] + '">' + link[0] + ' ' + icon('arrowRight', 'ico-sm') + '</a>' : '') + '</div>';
  }
  function footer() {
    return '<footer class="wrap"><div class="footer">' +
      '<div><span class="brand-word">' + esc(D.spa.name.toLowerCase()) + '</span><p style="margin-top:8px;max-width:320px">' + esc(D.spa.tagline) + '. Slow down, come back to yourself.</p></div>' +
      '<div><h4>Visit</h4><p>' + esc(D.spa.address) + '</p><p>' + esc(D.spa.city) + '</p><p>Daily ' + timeLabel(D.spa.open) + ' – ' + timeLabel(D.spa.close) + '</p></div>' +
      '<div><h4>Explore</h4><p><a href="#/membership">Circle membership</a></p><p><a href="#/gift">Gift cards</a></p><p><a href="#/rewards">Rewards</a></p><p><a href="#/studio">For spa owners</a></p></div>' +
      '</div></footer>';
  }

  /* ------------------------------------------------------------------ *
   * Views
   * ------------------------------------------------------------------ */
  function greeting() {
    var h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  }

  function viewHome() {
    var st = Store.get();
    var name = firstName();
    var opens = openings(8);
    var upcoming = activeBookings().filter(function (b) { return bookingState(b) === 'upcoming'; })
      .sort(function (a, b) { return at(a.date, a.min) - at(b.date, b.min); })[0];
    var lastDone = activeBookings().filter(function (b) { return bookingState(b) === 'completed'; })
      .sort(function (a, b) { return at(b.date, b.min) - at(a.date, a.min); })[0];
    var featured = opens[0];
    var nm = nowMin();
    var hours = nm < D.spa.open ? 'Opens today at ' + timeLabel(D.spa.open)
      : nm < D.spa.close ? 'Open today until ' + timeLabel(D.spa.close)
      : 'Opens tomorrow at ' + timeLabel(D.spa.open);
    var tier = tierFor(st.lifetimePoints);

    var h = '<section class="wrap hero"><div class="hero-card art" style="--a:#F4D9C2;--b:#C99A7E;--c:#2F4A3A">' +
      '<div class="hero-copy">' +
        '<span class="eyebrow">' + icon('sparkle', 'ico-sm') + greeting() + (name ? ', ' + esc(name) : '') + '</span>' +
        '<h1>Slow down.<br><em>Come back</em> to yourself.</h1>' +
        '<p class="hero-sub">Massage, facials, thermal rituals and stillness — booked in under a minute, rewarded every visit.</p>' +
        '<div class="hero-ctas"><a class="btn btn-primary" href="#/book">Book a ritual ' + icon('arrowRight') + '</a>' +
        '<a class="btn btn-ghost" href="#/explore">Explore treatments</a></div>' +
        '<div class="hero-proof"><span><span class="stars">' + icon('star', 'ico-sm') + '</span>' + D.spa.rating + ' from ' + D.spa.reviewCount.toLocaleString() + ' guests</span>' +
        '<span><span class="live-dot"></span>' + hours + '</span></div>' +
      '</div>' +
      '<div class="hero-scrim" aria-hidden="true"></div>' +
      '<div class="hero-visual" aria-hidden="true"><span class="hero-orb o1"></span><span class="hero-orb o2"></span><span class="hero-orb o3"></span></div>' +
      (featured ? '<a class="hero-float" href="#/book/' + featured.service.id + '" data-action="take-opening" data-id="' + featured.service.id + '" data-date="' + featured.date + '" data-min="' + featured.min + '">' +
        '<div class="hf-row"><div class="hf-thumb art" style="' + artStyle(featured.service.art) + '"></div><div>' +
        '<div class="hf-meta">' + icon('bolt', 'ico-sm') + ' Just opened · ' + dayLabel(featured.date) + ' ' + timeLabel(featured.min) + '</div>' +
        '<div class="hf-title">' + esc(featured.service.name) + '</div></div></div>' +
        '<div class="hf-cta"><span class="hf-price"><s>' + money(featured.service.price) + '</s><b>' + money(Math.round(featured.service.price * 0.8)) + '</b></span><span>Book now →</span></div></a>' : '') +
      '</div></section>';

    if (upcoming) {
      var us = svc(upcoming.serviceId), ut = therapist(upcoming.therapistId);
      h += '<section class="wrap section" style="margin-top:28px"><div class="spotlight">' +
        '<div class="art" style="' + artStyle(us.art) + '"></div>' +
        '<div><span class="eyebrow">Your next ritual · <span class="countdown">' + relative(upcoming.date, upcoming.min) + '</span></span>' +
        '<h3>' + esc(us.name) + '</h3>' +
        '<div class="meta"><span>' + icon('calendar', 'ico-sm') + dayLabel(upcoming.date, true) + ', ' + timeLabel(upcoming.min) + '</span><span>' + icon('user', 'ico-sm') + esc(ut.name) + '</span></div></div>' +
        '<div class="actions"><button class="btn btn-ghost btn-sm" data-action="ics" data-id="' + upcoming.id + '">' + icon('calendar', 'ico-sm') + 'Add to calendar</button>' +
        '<a class="btn btn-quiet" href="#/me">Manage</a></div></div></section>';
    } else if (lastDone) {
      var ls = svc(lastDone.serviceId);
      h += '<section class="wrap section" style="margin-top:28px"><div class="nudge"><span class="ico-wrap">' + icon('refresh') + '</span>' +
        '<p>It’s been a while since your <b>' + esc(ls.name) + '</b>. Keep the rhythm going — <b>rebook today and save 10%</b>.</p>' +
        '<button class="btn btn-accent btn-sm" data-action="rebook" data-id="' + lastDone.id + '">Rebook</button></div></section>';
    } else if (!priorBookings()) {
      h += '<section class="wrap section" style="margin-top:28px"><div class="nudge"><span class="ico-wrap">' + icon('gift') + '</span>' +
        '<p><b>Welcome to ' + esc(D.spa.name) + '.</b> Your first ritual is <b>20% off</b> — applied automatically at checkout. Plus 150 bonus points are already waiting for you.</p>' +
        '<a class="btn btn-accent btn-sm" href="#/book">Claim it</a></div></section>';
    }

    h += '<section class="wrap section">' + sectionHead('Find your ritual', 'How do you want to feel?', null, null) +
      '<div class="moods">' + D.moods.map(function (m) {
        return '<a class="mood art" style="' + artStyle(m.art) + '" href="#/explore?mood=' + m.id + '">' +
          '<span class="mood-ico">' + icon(m.icon) + '</span>' +
          '<div><h3>' + m.label + '</h3><p>' + m.line + '</p></div><span class="go">' + icon('arrowUpRight', 'ico-sm') + '</span></a>';
      }).join('') + '</div></section>';

    if (opens.length) {
      h += '<section class="wrap section" id="openings">' + sectionHead('<span class="live-dot" style="background:var(--good)"></span> Live now', 'Last-minute openings', 'Fresh cancellations and empty chairs in the next ' + LAST_MINUTE_HOURS + ' hours — 20% off.', null) +
        '<div class="rail">' + opens.map(openingCard).join('') + '</div></section>';
    }

    h += '<section class="wrap section">' + sectionHead('Signature', 'Our most-loved rituals', null, ['See all', '#/explore']) +
      '<div class="grid">' + D.services.filter(function (s) { return s.popular; }).map(serviceCard).join('') + '</div></section>';

    var plan = D.memberships[0];
    h += '<section class="wrap section"><div class="banner">' +
      '<div><span class="eyebrow">' + icon('crown', 'ico-sm') + 'Kriya Circle</span><h2>Make wellness a monthly ritual.</h2>' +
      '<p>One 60-minute ritual every month, 15% off everything else, and double points — from ' + money(plan.price) + '/month. Cancel anytime.</p>' +
      '<div style="margin-top:22px"><a class="btn btn-primary" href="#/membership">' + (st.membership ? 'Manage membership' : 'Join the Circle') + '</a></div></div>' +
      '<ul>' + plan.perks.map(function (p) { return '<li>' + icon('check') + esc(p) + '</li>'; }).join('') + '</ul></div></section>';

    h += '<section class="wrap section">' + sectionHead('Kind words', 'Guests keep coming back', null, null) +
      '<div class="rail reviews">' + D.reviews.map(function (r) {
        return '<figure class="review" style="margin:0"><div class="stars">' + [1, 2, 3, 4, 5].map(function () { return icon('star'); }).join('') + '</div>' +
          '<blockquote>“' + esc(r.text) + '”</blockquote><footer><b>' + esc(r.name) + '</b> · ' + esc(r.service) + '</footer></figure>';
      }).join('') + '</div></section>';

    var toNext = tier.next ? tier.next.min - st.lifetimePoints : 0;
    h += '<section class="wrap section"><div class="split">' +
      '<a class="promo art" href="#/gift" style="--a:#F6D1C0;--b:#D08C7A;--c:#6B3340"><span class="eyebrow" style="color:#FFE3D2">' + icon('gift', 'ico-sm') + 'Gift cards</span>' +
      '<h3>The gift of an exhale.</h3><p>Send a beautiful digital gift card in seconds — perfect for birthdays, thank-yous and last-minute heroes.</p><span class="btn">Send a gift</span></a>' +
      '<a class="promo art" href="#/rewards" style="--a:#CFE3C9;--b:#7FA98A;--c:#22362A"><span class="eyebrow" style="color:#E3F1DE">' + icon('award', 'ico-sm') + 'Rewards</span>' +
      '<h3>' + st.points.toLocaleString() + ' points & counting.</h3><p>' + (tier.next ? toNext + ' points until ' + tier.next.name + ' — ' + esc(tier.next.perk.toLowerCase()) + '.' : 'You’re Radiance — our highest tier.') + ' Refer a friend for +250.</p><span class="btn">View rewards</span></a>' +
      '</div></section>';

    return h + footer();
  }

  function viewExplore(_, q) {
    var mood = q.mood || '';
    var cat = q.cat || '';
    var term = (q.q || '').toLowerCase();
    var list = D.services.filter(function (s) {
      if (mood && s.moods.indexOf(mood) === -1) return false;
      if (cat && s.category !== cat) return false;
      if (term && (s.name + ' ' + s.short + ' ' + s.category).toLowerCase().indexOf(term) === -1) return false;
      return true;
    });
    var m = D.moods.find(function (x) { return x.id === mood; });
    var chip = function (label, href, on, ic) { return '<a class="chip ' + (on ? 'on' : '') + '" href="' + href + '">' + (ic ? icon(ic, 'ico-sm') : '') + label + '</a>'; };
    return '<section class="wrap page-head"><span class="eyebrow">Treatments</span>' +
      '<h1>' + (m ? 'Rituals to <em>' + m.label.toLowerCase() + '</em>' : 'Find your <em>ritual</em>') + '</h1>' +
      '<p>' + (m ? esc(m.line) + '. Hand-picked treatments for exactly how you want to feel.' : 'Massage, skin, body, thermal and mind — every treatment includes tea, robe and time in our quiet lounge.') + '</p></section>' +
      '<section class="wrap" style="margin-top:24px"><div class="search">' + icon('search') +
        '<input class="input" type="search" placeholder="Search massages, facials, sauna…" value="' + esc(q.q || '') + '" data-input="search" aria-label="Search treatments"></div>' +
      '<div class="chips" style="margin-top:14px">' +
        chip('All', '#/explore', !mood && !cat) +
        D.moods.map(function (x) { return chip(x.label, '#/explore?mood=' + x.id, mood === x.id, x.icon); }).join('') +
        D.categories.map(function (c) { return chip(c, '#/explore?cat=' + encodeURIComponent(c), cat === c); }).join('') +
      '</div></section>' +
      '<section class="wrap" style="margin-top:22px">' +
        (list.length ? '<div class="grid">' + list.map(serviceCard).join('') + '</div>'
          : '<div class="empty"><h4>Nothing matches — yet.</h4><p>Try a different word or feeling.</p><a class="btn btn-ghost btn-sm" href="#/explore">Show everything</a></div>') +
      '</section>' + footer();
  }

  function viewService(p) {
    var s = svc(p[1]);
    if (!s) return notFound();
    var team = therapistsFor(s);
    var fav = Store.get().favorites.indexOf(s.id) !== -1;
    var pairs = s.pairs.map(addOn);
    var related = D.services.filter(function (x) { return x.id !== s.id && x.moods.some(function (m) { return s.moods.indexOf(m) !== -1; }); }).slice(0, 3);
    return '<section class="wrap"><a class="back" href="#/explore">' + icon('arrowLeft', 'ico-sm') + 'All treatments</a>' +
      '<div class="detail"><div class="detail-art art" style="' + artStyle(s.art) + '">' + icon(CAT_ICON[s.category], 'glyph') + '</div>' +
      '<div><span class="eyebrow">' + esc(s.category) + ' · ' + s.moods.map(function (m) { return D.moods.find(function (x) { return x.id === m; }).label; }).join(' & ') + '</span>' +
      '<h1>' + esc(s.name) + '</h1><p class="lead">' + esc(s.description) + '</p>' +
      '<div class="facts"><span class="fact">' + icon('clock', 'ico-sm') + durLabel(s.duration) + '</span>' +
        '<span class="fact">' + icon('star', 'ico-sm') + D.spa.rating + ' rating</span>' +
        '<span class="fact">' + icon('award', 'ico-sm') + '+' + Math.floor(s.price * multiplier()) + ' points</span></div>' +
      '<ul class="benefits">' + s.benefits.map(function (b) { return '<li>' + icon('check') + esc(b) + '</li>'; }).join('') + '</ul>' +
      '<div class="detail-cta sticky-cta"><span class="price-big">' + money(s.price) + '</span>' +
        '<span style="display:flex;gap:8px"><button class="btn btn-ghost" data-action="fav" data-id="' + s.id + '" aria-label="Save" aria-pressed="' + fav + '" style="width:50px;padding:0;color:' + (fav ? '#D2553F' : 'inherit') + '">' + icon('heart') + '</button>' +
        '<a class="btn btn-primary" href="#/book/' + s.id + '" data-action="start-book" data-id="' + s.id + '">Book this ritual ' + icon('arrowRight') + '</a></span></div>' +
      '<h4 class="sub-h">Your specialists</h4><div class="team">' + team.map(function (t) {
        return '<span class="person">' + avatar(t) + '<span><b>' + esc(t.name) + '</b><small>' + esc(t.role) + ' · ★ ' + t.rating + '</small></span></span>';
      }).join('') + '</div>' +
      (pairs.length ? '<h4 class="sub-h">Pairs beautifully with</h4><div class="team">' + pairs.map(function (a) {
        return '<span class="fact">' + icon('plus', 'ico-sm') + esc(a.name) + ' · ' + money(a.price) + '</span>';
      }).join('') + '</div>' : '') +
      '</div></div></section>' +
      (related.length ? '<section class="wrap section">' + sectionHead('You may also love', 'Complete the ritual', null, null) + '<div class="grid">' + related.map(serviceCard).join('') + '</div></section>' : '') +
      footer();
  }

  /* --------------------------- Booking flow --------------------------- */
  var draft = null;
  function startDraft(serviceId, o) {
    o = o || {};
    draft = {
      serviceId: serviceId, therapistId: o.therapistId || 'any', date: o.date || null,
      min: o.min == null ? null : o.min, addOns: [], step: 1, rebook: !!o.rebook, replaces: o.replaces || null,
    };
    var st = Store.get();
    draft.name = st.user.name; draft.email = st.user.email; draft.phone = st.user.phone; draft.notes = '';
  }

  function viewBook(p) {
    var id = p[1];
    if (!id) {
      if (draft) { location.replace('#/book/' + draft.serviceId); return ''; }
      return '<section class="wrap page-head"><span class="eyebrow">Book a ritual</span><h1>What are you <em>craving</em>?</h1>' +
        '<p>Pick a treatment — you’ll choose your time and specialist next.</p></section>' +
        '<section class="wrap" style="margin-top:26px"><div class="pick-list">' + D.services.map(function (s) {
          return '<a class="pick" href="#/book/' + s.id + '" data-action="start-book" data-id="' + s.id + '"><div class="art" style="' + artStyle(s.art) + '"></div>' +
            '<div class="pick-info"><b>' + esc(s.name) + '</b><small>' + esc(s.category) + ' · ' + durLabel(s.duration) + '</small></div>' +
            '<span class="price">' + money(s.price) + '</span>' + icon('chevron') + '</a>';
        }).join('') + '</div></section>';
    }
    var s = svc(id);
    if (!s) return notFound();
    if (!draft || draft.serviceId !== id) startDraft(id);

    // choose a sensible date and validate the selected time
    if (!draft.date) {
      for (var i = 0; i < 21; i++) {
        var dd = addDays(today(), i);
        if (slotsFor(s, dd, draft.therapistId, draft.replaces).length) { draft.date = dd; break; }
      }
      draft.date = draft.date || today();
    }
    var slots = slotsFor(s, draft.date, draft.therapistId, draft.replaces);
    if (draft.min != null && !slots.some(function (x) { return x.min === draft.min; })) draft.min = null;

    var q = quote(draft);
    var stepNames = ['Time', 'Enhance', 'Confirm'];
    var head = '<div class="steps">' + stepNames.map(function (n, i) {
      var k = i + 1;
      return '<div class="step-dot ' + (k < draft.step ? 'done' : k === draft.step ? 'on' : '') + '"><i></i>' + (k) + '. ' + n + '</div>';
    }).join('') + '</div>';

    var body = '';
    var canNext = false, nextLabel = 'Continue', nextAction = 'next-step';

    if (draft.step === 1) {
      var team = therapistsFor(s);
      var dates = [];
      for (var j = 0; j < 21; j++) {
        var ds = addDays(today(), j);
        var n = slotsFor(s, ds, draft.therapistId, draft.replaces).length;
        dates.push({ ds: ds, n: n });
      }
      var maxN = Math.max.apply(null, dates.map(function (x) { return x.n; }).concat([1]));
      var groups = [['Morning', 'sun', 0, 720], ['Afternoon', 'leaf', 720, 1020], ['Evening', 'moon', 1020, 1440]];
      body = '<h1>When works for you?</h1><p class="hint">Real-time availability. Free cancellation up to 24 hours before.</p>' +
        '<div class="mini-svc"><div class="art" style="' + artStyle(s.art) + '"></div><div><b>' + esc(s.name) + '</b><small>' + durLabel(s.duration) + ' · ' + money(s.price) + '</small></div>' +
          '<a class="btn btn-quiet" href="#/book" data-action="clear-draft">Change</a></div>' +
        '<div class="block"><div class="block-title">Specialist</div><div class="chips">' +
          '<button class="chip ' + (draft.therapistId === 'any' ? 'on' : '') + '" data-action="pick-therapist" data-id="any">' + icon('sparkle', 'ico-sm') + 'Anyone available</button>' +
          team.map(function (t) {
            return '<button class="chip ' + (draft.therapistId === t.id ? 'on' : '') + '" data-action="pick-therapist" data-id="' + t.id + '" style="padding-left:12px">' + avatar(t) + esc(t.name.split(' ')[0]) + ' <span style="opacity:.6;font-weight:500">★ ' + t.rating + '</span></button>';
          }).join('') + '</div></div>' +
        '<div class="block"><div class="block-title"><span>' + parseYmd(draft.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) + '</span></div><div class="datestrip">' +
          dates.map(function (x) {
            var d = parseYmd(x.ds);
            return '<button class="date ' + (x.ds === draft.date ? 'on' : '') + '" data-action="pick-date" data-date="' + x.ds + '" ' + (x.n ? '' : 'disabled') + ' aria-label="' + dayLabel(x.ds, true) + ', ' + x.n + ' times available">' +
              '<small>' + (x.ds === today() ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' })) + '</small><b>' + d.getDate() + '</b>' +
              '<span class="avail"><span style="width:' + Math.round(x.n / maxN * 100) + '%"></span></span></button>';
          }).join('') + '</div></div>' +
        '<div class="block"><div class="block-title"><span>' + dayLabel(draft.date, true) + '</span><span style="text-transform:none;letter-spacing:0;font-weight:600">' + slots.length + ' times</span></div>' +
          (slots.length ? groups.map(function (g) {
            var gs = slots.filter(function (x) { return x.min >= g[2] && x.min < g[3]; });
            if (!gs.length) return '';
            return '<div class="slot-group"><h5>' + icon(g[1], 'ico-sm') + g[0] + '</h5><div class="slots">' + gs.map(function (x) {
              var deal = isLastMinute(draft.date, x.min);
              return '<button class="slot ' + (x.min === draft.min ? 'on' : '') + '" data-action="pick-time" data-min="' + x.min + '">' + timeLabel(x.min) +
                (deal ? '<span class="deal">' + icon('bolt') + '20%</span>' : '') + '</button>';
            }).join('') + '</div></div>';
          }).join('') : '<div class="empty"><h4>Fully booked</h4><p>This day is spoken for. Join the waitlist and we’ll text you the moment something opens.</p><button class="btn btn-ghost btn-sm" data-action="waitlist">' + icon('bolt', 'ico-sm') + 'Join waitlist</button></div>') +
        '</div>';
      canNext = draft.min != null;
    } else if (draft.step === 2) {
      var suggested = s.pairs;
      var ordered = D.addOns.slice().sort(function (a, b) { return (suggested.indexOf(b.id) !== -1) - (suggested.indexOf(a.id) !== -1); });
      var member = Store.get().membership;
      body = '<h1>Make it <em>extraordinary</em>.</h1><p class="hint">Small upgrades, big difference. Most guests add at least one.</p>' +
        '<div class="block">' + ordered.map(function (a) {
          var on = draft.addOns.indexOf(a.id) !== -1;
          return '<button class="addon ' + (on ? 'on' : '') + '" data-action="toggle-addon" data-id="' + a.id + '" aria-pressed="' + on + '">' +
            '<span class="check">' + icon('check') + '</span><span class="addon-info"><b>' + esc(a.name) +
            (suggested.indexOf(a.id) !== -1 ? ' <span class="tag tag-brand" style="margin-left:6px">Pairs perfectly</span>' : '') + '</b>' +
            '<small>' + esc(a.note) + (a.duration ? ' · +' + a.duration + ' min' : '') + '</small></span>' +
            '<span class="addon-price">+' + money(a.price) + '</span></button>';
        }).join('') + '</div>' +
        (!member ? '<div class="nudge"><span class="ico-wrap">' + icon('crown') + '</span><p><b>Circle members save 15%</b> on every booking and get a monthly ritual included.</p><a class="btn btn-ghost btn-sm" href="#/membership">Learn more</a></div>' : '');
      canNext = true;
    } else {
      body = '<h1>Almost there' + (draft.name ? ', ' + esc(draft.name.split(' ')[0]) : '') + '.</h1><p class="hint">Pay at the spa — no card needed to hold your time.</p>' +
        '<div class="form-grid">' +
          '<div class="field full"><label for="f-name">Full name</label><input class="input" id="f-name" data-input="draft" data-key="name" autocomplete="name" value="' + esc(draft.name) + '" placeholder="Your name"></div>' +
          '<div class="field"><label for="f-email">Email</label><input class="input" id="f-email" type="email" data-input="draft" data-key="email" autocomplete="email" value="' + esc(draft.email) + '" placeholder="you@email.com"></div>' +
          '<div class="field"><label for="f-phone">Mobile <span class="muted">(for reminders)</span></label><input class="input" id="f-phone" type="tel" data-input="draft" data-key="phone" autocomplete="tel" value="' + esc(draft.phone) + '" placeholder="(555) 000-0000"></div>' +
          '<div class="field full"><label for="f-notes">Anything we should know? <span class="muted">(optional)</span></label><textarea class="input" id="f-notes" data-input="draft" data-key="notes" placeholder="Pressure preference, injuries, allergies, pregnancy…">' + esc(draft.notes) + '</textarea></div>' +
        '</div>';
      canNext = true;
      nextLabel = 'Confirm · ' + money(q.total);
      nextAction = 'confirm';
    }

    var t = draft.therapistId !== 'any' ? therapist(draft.therapistId) : null;
    var lines = '<div class="lines"><div><span>' + esc(s.name) + '</span><span>' + money(s.price) + '</span></div>' +
      q.extras.map(function (a) { return '<div><span>' + esc(a.name) + '</span><span>' + money(a.price) + '</span></div>'; }).join('') +
      (q.offer ? '<div class="disc"><span>' + q.offer.label + ' (−' + q.offer.pct + '%)</span><span>−' + money(q.discount) + '</span></div>' : '') +
      (q.credit ? '<div class="disc"><span>Reward credit</span><span>−' + money(q.credit) + '</span></div>' : '') +
      '<div class="total"><span>Total</span><span>' + money(q.total) + '</span></div></div>';

    var nextBtn = '<button class="btn btn-primary ' + (canNext ? '' : 'is-disabled') + '" data-action="' + nextAction + '">' + nextLabel + (nextAction === 'confirm' ? '' : ' ' + icon('arrowRight')) + '</button>';
    var backBtn = draft.step > 1 ? '<button class="btn btn-quiet" data-action="prev-step">' + icon('arrowLeft', 'ico-sm') + 'Back</button>' : '';

    var summary = '<aside class="summary"><div class="art" style="' + artStyle(s.art) + '"></div>' +
      '<h3>' + esc(s.name) + '</h3>' +
      '<div class="meta">' + (draft.min != null ? dayLabel(draft.date, true) + ' · ' + timeLabel(draft.min) : 'Choose a time') + '<br>' + durLabel(q.duration) + (t ? ' · with ' + esc(t.name) : ' · any specialist') + '</div>' +
      lines +
      '<div class="earn">' + icon('award', 'ico-sm') + 'You’ll earn <b>&nbsp;' + q.points + ' points&nbsp;</b> with this ritual</div>' +
      '<div style="display:grid;gap:8px">' + nextBtn.replace('class="btn ', 'class="btn btn-block ') + backBtn.replace('btn-quiet', 'btn-quiet btn-block') + '</div>' +
      '<p class="policy">Free cancellation until 24h before · Pay at the spa</p></aside>';

    var mobileBar = '<div class="mobile-bar"><div>' + (draft.step > 1 ? '<button class="btn-quiet" data-action="prev-step" aria-label="Back" style="padding:0 10px 0 0;color:var(--muted)">' + icon('arrowLeft') + '</button>' : '') +
      '</div><div style="flex:1"><small>' + (draft.min != null ? dayLabel(draft.date) + ' · ' + timeLabel(draft.min) : 'Select a time') + '</small>' +
      '<b>' + money(q.total) + '</b>' + (q.discount ? ' <small class="disc-note" style="display:inline">−' + q.offer.pct + '%</small>' : '') + '</div>' + nextBtn + '</div>';

    return '<section class="wrap"><div class="book"><div>' + head + body + '</div>' + summary + '</div></section>' + mobileBar;
  }

  function confirmBooking() {
    var s = svc(draft.serviceId);
    var name = (draft.name || '').trim(), email = (draft.email || '').trim();
    var bad = false;
    ['name', 'email'].forEach(function (k) {
      var el = document.querySelector('[data-key="' + k + '"]');
      var ok = k === 'name' ? name.length > 1 : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (el) el.classList.toggle('invalid', !ok);
      if (!ok) bad = true;
    });
    if (bad) { toast('Please add your name and a valid email', 'user'); return; }

    var q = quote(draft);
    var tid = draft.therapistId;
    var free = freeTherapists(s, draft.date, draft.min, tid, draft.replaces, q.duration);
    if (!free.length) {
      toast(q.duration > s.duration ? 'Your add-ons need a little more time — please pick another slot' : 'That time was just taken — please pick another', 'clock');
      draft.min = null; draft.step = 1; render(true); return;
    }
    tid = free[0].id;
    var id = 'b' + Date.now().toString(36);
    var replaced = draft.replaces;
    Store.update(function (st) {
      if (replaced) {
        var old = st.bookings.find(function (b) { return b.id === replaced; });
        if (old && old.status !== 'cancelled') {
          old.status = 'cancelled';
          st.points = Math.max(0, st.points - old.points);
          st.lifetimePoints = Math.max(0, st.lifetimePoints - old.points);
          st.credit += old.credit || 0;
        }
      }
      st.user = { name: name, email: email, phone: (draft.phone || '').trim() };
      st.bookings.push({
        id: id, serviceId: s.id, therapistId: tid, date: draft.date, min: draft.min, duration: q.duration,
        addOns: draft.addOns.slice(), subtotal: q.subtotal, discount: q.discount, offer: q.offer ? q.offer.label : null,
        credit: q.credit, total: q.total, points: q.points, notes: draft.notes || '', status: 'upcoming', createdAt: Date.now(),
      });
      st.credit = Math.max(0, st.credit - q.credit);
      st.points += q.points;
      st.lifetimePoints += q.points;
      st.pointsLog.unshift({ label: s.name, pts: q.points, at: Date.now() });
    });
    draft = null;
    buzz();
    go('#/confirmed/' + id);
  }

  function viewConfirmed(p) {
    var b = Store.get().bookings.find(function (x) { return x.id === p[1]; });
    if (!b) return notFound();
    var s = svc(b.serviceId), t = therapist(b.therapistId);
    var later = addDays(b.date, 28);
    setTimeout(confetti, 250);
    return '<section class="wrap"><div class="confirm">' +
      '<div class="confirm-mark">' + icon('check') + '</div>' +
      '<h1>You’re booked' + (firstName() ? ', ' + esc(firstName()) : '') + '.</h1>' +
      '<p>We’ve saved your spot. Arrive 15 minutes early to settle in with tea.</p>' +
      '<div class="ticket"><div class="art" style="' + artStyle(s.art) + '"></div><div class="ticket-body">' +
        '<div><small>Ritual</small><b>' + esc(s.name) + '</b></div>' +
        '<div><small>Specialist</small><b>' + esc(t.name) + '</b></div>' +
        '<div><small>When</small><b>' + dayLabel(b.date, true) + '<br>' + timeLabel(b.min) + ' · ' + durLabel(b.duration) + '</b></div>' +
        '<div><small>Total at spa</small><b>' + money(b.total) + (b.discount ? ' <span class="muted" style="font-weight:500">(saved ' + money(b.discount + (b.credit || 0)) + ')</span>' : '') + '</b></div>' +
      '</div><div class="ticket-earn"><span>' + icon('award', 'ico-sm') + '+' + b.points + ' points earned</span><span class="muted" style="font-weight:500">' + Store.get().points.toLocaleString() + ' total</span></div></div>' +
      '<div class="confirm-actions"><button class="btn btn-primary" data-action="ics" data-id="' + b.id + '">' + icon('calendar') + 'Add to calendar</button>' +
      '<a class="btn btn-ghost" href="#/me">My rituals</a></div>' +
      '<div class="nudge"><span class="ico-wrap">' + icon('refresh') + '</span><p><b>Make it a ritual.</b> Lock in the same time on ' + dayLabel(later, true) + ' and <b>save 10%</b>. Bodies love rhythm.</p>' +
        '<button class="btn btn-accent btn-sm" data-action="rebook-future" data-id="' + b.id + '">Rebook</button></div>' +
      '<div class="nudge" style="background:var(--brand-soft)"><span class="ico-wrap" style="color:var(--brand)">' + icon('users') + '</span><p><b>Give $25, get 250 points.</b> Share your code <b>' + esc(Store.get().referralCode) + '</b> with a friend.</p>' +
        '<button class="btn btn-ghost btn-sm" data-action="share">Share</button></div>' +
      '</div></section>';
  }

  /* ------------------------------ Rewards ----------------------------- */
  function viewRewards() {
    var st = Store.get();
    var tier = tierFor(st.lifetimePoints);
    var span = tier.next ? tier.next.min - tier.cur.min : 1;
    var prog = tier.next ? (st.lifetimePoints - tier.cur.min) / span : 1;
    var C = 2 * Math.PI * 88;
    // ritual rhythm: last 6 months with a visit
    var months = [];
    var d0 = new Date();
    for (var i = 5; i >= 0; i--) {
      var d = new Date(d0.getFullYear(), d0.getMonth() - i, 1);
      var key = d.getFullYear() + '-' + pad(d.getMonth() + 1);
      var hit = activeBookings().some(function (b) { return b.date.slice(0, 7) === key; });
      months.push({ label: d.toLocaleDateString('en-US', { month: 'short' }), on: hit });
    }
    return '<section class="wrap page-head"><span class="eyebrow">Kriya Rewards</span><h1>Every visit <em>gives back</em>.</h1>' +
      '<p>Earn points on every ritual, unlock tiers, and turn points into credit — applied automatically at checkout.</p></section>' +
      '<section class="wrap"><div class="rewards-hero">' +
        '<div class="ring"><svg viewBox="0 0 200 200" aria-hidden="true"><defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--accent)"/><stop offset="1" style="stop-color:var(--brand)"/></linearGradient></defs>' +
          '<circle class="track" cx="100" cy="100" r="88"/><circle class="bar" cx="100" cy="100" r="88" stroke="url(#ringGrad)" stroke-dasharray="' + C + '" stroke-dashoffset="' + C + '" data-offset="' + (C * (1 - prog)) + '"/></svg>' +
          '<div class="ring-label"><div><b>' + st.points.toLocaleString() + '</b><small>points</small></div></div></div>' +
        '<div><span class="eyebrow">Your tier</span><h2 class="tier-name">' + tier.cur.name + '</h2>' +
          '<p class="tier-next">' + (tier.next ? '<b>' + (tier.next.min - st.lifetimePoints) + ' points</b> to ' + tier.next.name + ' — ' + esc(tier.next.perk.toLowerCase()) + '.' : 'You’ve reached our highest tier. ' + esc(tier.cur.perk) + '.') + '</p>' +
          '<div class="tier-track">' + D.tiers.map(function (t) {
            var cls = t.id === tier.cur.id ? 'current' : st.lifetimePoints >= t.min ? 'reached' : '';
            return '<span class="tier-chip ' + cls + '">' + t.name + ' · ' + t.min.toLocaleString() + '</span>';
          }).join('') + '</div>' +
          (st.credit ? '<div class="credit-line">' + icon('check', 'ico-sm') + money(st.credit) + ' credit ready for your next booking</div>' : '') +
          (st.membership ? '<div class="credit-line" style="color:var(--gold)">' + icon('crown', 'ico-sm') + 'Circle member · earning double points</div>' : '') +
        '</div></div></section>' +

      '<section class="wrap section">' + sectionHead('Redeem', 'Turn points into rituals', null, null) +
        '<div class="redeem">' + D.rewards.map(function (r) {
          var can = st.points >= r.pts;
          return '<div class="reward"><span class="amt">' + money(r.credit) + '</span><span>' + esc(r.label) + '</span>' +
            '<span class="cost">' + icon('award', 'ico-sm') + r.pts.toLocaleString() + ' points</span>' +
            '<div class="meter"><span style="width:' + Math.min(100, st.points / r.pts * 100) + '%"></span></div>' +
            '<button class="btn ' + (can ? 'btn-primary' : 'btn-ghost is-disabled') + ' btn-sm" data-action="redeem" data-id="' + r.id + '">' + (can ? 'Redeem' : (r.pts - st.points).toLocaleString() + ' to go') + '</button></div>';
        }).join('') + '</div></section>' +

      '<section class="wrap section">' + sectionHead('Earn', 'Ways to earn', null, null) +
        '<div class="earn-grid">' +
          earnCard('calendar', '1 pt / $1', 'On every ritual — more at higher tiers') +
          earnCard('users', '+250', 'When a friend books their first visit') +
          earnCard('star', '+50', 'For rating a completed ritual') +
          earnCard('cake', '+100', 'A birthday gift, every year') +
        '</div></section>' +

      '<section class="wrap section"><div class="split">' +
        '<div class="panel"><h3>Your ritual rhythm</h3><p class="sub">Guests who visit monthly report better sleep and less stress. Keep the streak alive.</p>' +
          '<div class="rhythm">' + months.map(function (m) { return '<div><i class="' + (m.on ? 'on' : '') + '">' + (m.on ? icon('check', 'ico-sm') : '') + '</i>' + m.label + '</div>'; }).join('') + '</div></div>' +
        '<div class="panel"><h3>Give $25, get 250 points</h3><p class="sub">Friends get $25 off their first ritual. You get 250 points when they visit.</p>' +
          '<div class="refer"><span class="code">' + esc(st.referralCode) + '</span><button class="btn btn-ghost btn-sm" data-action="copy-code">' + icon('copy', 'ico-sm') + 'Copy</button>' +
          '<button class="btn btn-primary btn-sm" data-action="share">' + icon('share', 'ico-sm') + 'Share</button></div></div>' +
      '</div></section>' +

      '<section class="wrap section">' + sectionHead('History', 'Points activity', null, null) +
        '<div class="panel"><table class="data"><thead><tr><th>Activity</th><th>Date</th><th class="num">Points</th></tr></thead><tbody>' +
        st.pointsLog.slice(0, 12).map(function (l) {
          return '<tr><td>' + esc(l.label) + '</td><td class="muted">' + new Date(l.at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + '</td><td class="num" style="font-weight:700;color:' + (l.pts < 0 ? 'var(--accent)' : 'var(--good)') + '">' + (l.pts > 0 ? '+' : '') + l.pts + '</td></tr>';
        }).join('') + '</tbody></table></div></section>' + footer();
  }
  function earnCard(ic, big, small) {
    return '<div class="earn-card"><span class="ico-wrap">' + icon(ic) + '</span><b>' + big + '</b><small>' + small + '</small></div>';
  }

  /* -------------------------------- Me -------------------------------- */
  var meTab = 'upcoming';
  function viewMe() {
    var st = Store.get();
    var all = st.bookings.slice().sort(function (a, b) { return at(b.date, b.min) - at(a.date, a.min); });
    var upcoming = all.filter(function (b) { return bookingState(b) === 'upcoming'; }).reverse();
    var past = all.filter(function (b) { return bookingState(b) !== 'upcoming'; });
    var visits = all.filter(function (b) { return bookingState(b) === 'completed'; }).length;
    var spent = all.filter(function (b) { return b.status !== 'cancelled'; }).reduce(function (a, b) { return a + b.total; }, 0);
    var saved = all.filter(function (b) { return b.status !== 'cancelled'; }).reduce(function (a, b) { return a + b.discount + (b.credit || 0); }, 0);
    var tier = tierFor(st.lifetimePoints);
    var list = meTab === 'upcoming' ? upcoming : meTab === 'past' ? past : null;

    var rows = list ? (list.length ? list.map(bookingRow).join('') :
      '<div class="empty"><h4>' + (meTab === 'upcoming' ? 'Nothing on the books' : 'No past rituals yet') + '</h4><p>' + (meTab === 'upcoming' ? 'Your next exhale is a minute away.' : 'Your history will live here.') + '</p><a class="btn btn-primary btn-sm" href="#/book">Book a ritual</a></div>')
      : (st.favorites.length ? '<div class="grid">' + st.favorites.map(svc).filter(Boolean).map(serviceCard).join('') + '</div>' :
        '<div class="empty"><h4>No favorites yet</h4><p>Tap the heart on any treatment to save it here.</p><a class="btn btn-ghost btn-sm" href="#/explore">Explore treatments</a></div>');

    return '<section class="wrap"><div class="profile">' +
        '<span class="avatar">' + initials(st.user.name) + '</span>' +
        '<div><span class="eyebrow">' + tier.cur.name + ' member' + (st.membership ? ' · Circle' : '') + '</span><h1>' + (st.user.name ? esc(st.user.name) : 'Your rituals') + '</h1></div></div>' +
      '<div class="stats">' +
        '<div class="stat"><small>Visits</small><b>' + visits + '</b><span class="delta">' + upcoming.length + ' upcoming</span></div>' +
        '<div class="stat"><small>Points</small><b>' + st.points.toLocaleString() + '</b><span class="delta">' + tier.cur.name + ' tier</span></div>' +
        '<div class="stat"><small>Saved</small><b>' + money(saved) + '</b><span class="delta">offers & credit</span></div>' +
        '<div class="stat"><small>Invested in you</small><b>' + money(spent) + '</b><span class="delta">all time</span></div>' +
      '</div></section>' +
      '<section class="wrap section" style="margin-top:36px"><div class="tabs" role="tablist">' +
        ['upcoming', 'past', 'favorites'].map(function (t) {
          return '<button role="tab" aria-selected="' + (meTab === t) + '" class="' + (meTab === t ? 'on' : '') + '" data-action="me-tab" data-id="' + t + '">' + t[0].toUpperCase() + t.slice(1) + '</button>';
        }).join('') + '</div><div style="margin-top:16px">' + rows + '</div></section>' +
      '<section class="wrap section"><div class="menu">' +
        menuItem('#/membership', 'crown', 'Circle membership', st.membership ? 'You’re a member — manage plan' : 'Monthly ritual + 15% off everything') +
        menuItem('#/gift', 'gift', 'Gift cards', st.gifts.length ? st.gifts.length + ' sent' : 'Send the gift of an exhale') +
        menuItem('#/rewards', 'award', 'Rewards & referrals', st.points + ' points · code ' + st.referralCode) +
        menuItem('#/studio', 'chart', 'Spa Studio', 'For owners: today’s book, revenue & insights') +
        '<button data-action="reset"><span class="ico-wrap">' + icon('trash') + '</span><span>Reset demo data<small>Start fresh as a new guest</small></span></button>' +
      '</div></section>' + footer();
  }
  function menuItem(href, ic, title, sub) {
    return '<a href="' + href + '"><span class="ico-wrap">' + icon(ic) + '</span><span>' + title + '<small>' + esc(sub) + '</small></span>' + icon('chevron', 'chev') + '</a>';
  }
  function bookingRow(b) {
    var s = svc(b.serviceId), t = therapist(b.therapistId), state = bookingState(b);
    var acts = '';
    if (state === 'upcoming') {
      acts = '<button class="btn btn-ghost btn-sm" data-action="ics" data-id="' + b.id + '">' + icon('calendar', 'ico-sm') + '</button>' +
        '<button class="btn btn-ghost btn-sm" data-action="reschedule" data-id="' + b.id + '">Reschedule</button>' +
        '<button class="btn btn-quiet btn-sm" data-action="cancel" data-id="' + b.id + '">Cancel</button>';
    } else if (state === 'completed') {
      acts = (b.rating ? '' : '<div class="rate" aria-label="Rate this ritual for +50 points">' + [1, 2, 3, 4, 5].map(function (n) {
          return '<button data-action="rate" data-id="' + b.id + '" data-n="' + n + '" aria-label="' + n + ' stars">' + icon('star') + '</button>';
        }).join('') + '</div>') +
        (b.rating ? '<div class="rate">' + [1, 2, 3, 4, 5].map(function (n) { return '<button class="' + (n <= b.rating ? 'on' : '') + '" tabindex="-1">' + icon('star') + '</button>'; }).join('') + '</div>' : '') +
        '<button class="btn btn-primary btn-sm" data-action="rebook" data-id="' + b.id + '">' + icon('refresh', 'ico-sm') + 'Book again</button>';
    } else {
      acts = '<span class="tag tag-accent">Cancelled</span>';
    }
    return '<div class="booking-row ' + state + '"><div class="art" style="' + artStyle(s.art) + '"></div>' +
      '<div><h4>' + esc(s.name) + '</h4><div class="meta">' + dayLabel(b.date) + ' · ' + timeLabel(b.min) + ' · ' + esc(t.name.split(' ')[0]) + ' · ' + money(b.total) + '</div>' +
      (state === 'upcoming' ? '<div class="meta countdown" style="font-size:13px">' + relative(b.date, b.min) + '</div>' : '') + '</div>' +
      '<div class="acts">' + acts + '</div></div>';
  }

  /* ------------------------------ Gift ------------------------------- */
  var gift = { amount: 100, design: 0, to: '', from: '', msg: '' };
  var GIFT_ART = [['#F6D1C0', '#D08C7A', '#6B3340'], ['#CFE3C9', '#7FA98A', '#22362A'], ['#D8D3EE', '#9C92C8', '#3D3566'], ['#FFE6CC', '#F4B48C', '#C0694A']];
  function giftCardPreview() {
    return '<div class="giftcard art" id="gc" style="' + artStyle(GIFT_ART[gift.design]) + '">' +
      '<div class="gc-top"><span class="gc-brand">' + esc(D.spa.name.toLowerCase()) + '</span>' + icon('gift', 'ico-lg') + '</div>' +
      '<div><div class="gc-amt">' + money(gift.amount) + '</div><div class="gc-to">For ' + (gift.to ? esc(gift.to) : 'someone special') + (gift.from ? ' · from ' + esc(gift.from) : '') + '</div>' +
      (gift.msg ? '<div class="gc-msg">“' + esc(gift.msg) + '”</div>' : '') + '</div></div>';
  }
  function viewGift() {
    return '<section class="wrap page-head"><span class="eyebrow">Gift cards</span><h1>Give the gift of an <em>exhale</em>.</h1>' +
      '<p>Delivered instantly by email or text, redeemable for any ritual, never expires.</p></section>' +
      '<section class="wrap"><div class="gift"><div id="gc-wrap">' + giftCardPreview() + '</div><div>' +
        '<div class="block"><div class="block-title">Design</div><div class="designs">' + GIFT_ART.map(function (a, i) {
          return '<button class="design art ' + (gift.design === i ? 'on' : '') + '" style="' + artStyle(a) + '" data-action="gift-design" data-n="' + i + '" aria-label="Design ' + (i + 1) + '"></button>';
        }).join('') + '</div></div>' +
        '<div class="block"><div class="block-title">Amount</div><div class="chips">' + [50, 100, 150, 250, 400].map(function (n) {
          return '<button class="chip ' + (gift.amount === n ? 'on' : '') + '" data-action="gift-amt" data-n="' + n + '">' + money(n) + '</button>';
        }).join('') + '</div>' +
        '<p class="muted" style="font-size:14px;margin-top:4px">' + giftHint(gift.amount) + '</p></div>' +
        '<div class="form-grid block">' +
          '<div class="field"><label for="g-to">To</label><input class="input" id="g-to" data-input="gift" data-key="to" value="' + esc(gift.to) + '" placeholder="Their name"></div>' +
          '<div class="field"><label for="g-from">From</label><input class="input" id="g-from" data-input="gift" data-key="from" value="' + esc(gift.from || Store.get().user.name) + '" placeholder="Your name"></div>' +
          '<div class="field full"><label for="g-msg">Message</label><textarea class="input" id="g-msg" data-input="gift" data-key="msg" maxlength="140" placeholder="You deserve a slow afternoon.">' + esc(gift.msg) + '</textarea></div>' +
        '</div>' +
        '<button class="btn btn-primary btn-block" data-action="send-gift">' + icon('gift') + 'Send ' + money(gift.amount) + ' gift card</button>' +
        '<p class="policy">Demo — no payment is taken.</p>' +
      '</div></div></section>' + footer();
  }
  function giftHint(n) {
    var fit = D.services.filter(function (s) { return s.price <= n; }).sort(function (a, b) { return b.price - a.price; })[0];
    return fit ? 'Covers a ' + fit.name + ' (' + money(fit.price) + ')' + (n - fit.price >= 15 ? ' with room for an add-on.' : '.') : 'A lovely start toward any ritual.';
  }

  /* --------------------------- Membership ---------------------------- */
  function viewMembership() {
    var st = Store.get();
    var spent = activeBookings().reduce(function (a, b) { return a + b.subtotal; }, 0);
    return '<section class="wrap page-head"><span class="eyebrow">' + icon('crown', 'ico-sm') + 'Kriya Circle</span><h1>Your monthly <em>reset</em>, handled.</h1>' +
      '<p>A ritual every month, member pricing on everything, and first pick of the calendar. Pause or cancel anytime.</p></section>' +
      '<section class="wrap"><div class="plans">' + D.memberships.map(function (m) {
        var mine = st.membership === m.id;
        return '<div class="plan ' + (m.popular ? 'featured' : '') + '">' + (m.popular ? '<span class="tag tag-accent">Most popular</span>' : '') +
          '<h3>' + esc(m.name) + '</h3><div class="price">' + money(m.price) + '<small> /month</small></div>' +
          '<ul>' + m.perks.map(function (p) { return '<li>' + icon('check') + esc(p) + '</li>'; }).join('') + '</ul>' +
          '<button class="btn ' + (mine ? 'btn-ghost' : 'btn-primary') + ' btn-block" data-action="' + (mine ? 'leave-circle' : 'join-circle') + '" data-id="' + m.id + '">' + (mine ? 'Current plan · Cancel' : 'Join ' + esc(m.name)) + '</button></div>';
      }).join('') + '</div>' +
      (spent ? '<div class="savings"><span class="ico-wrap">' + icon('sparkle') + '</span><p>You’ve booked <b>' + money(spent) + '</b> in rituals. As a Circle member you’d have saved about <b>' + money(Math.round(spent * 0.15)) + '</b> — plus a free ritual every month.</p></div>' : '') +
      '<p class="policy" style="text-align:left;margin-top:16px">Demo — joining doesn’t charge a card.</p></section>' + footer();
  }

  /* ------------------------------ Studio ----------------------------- */
  var CLIENTS = ['Olivia P.', 'Noah K.', 'Ava L.', 'Liam W.', 'Sophia G.', 'Mia R.', 'Ethan B.', 'Isla M.', 'Lucas F.', 'Zara H.', 'Jonah D.', 'Nina S.'];
  function dayStats(dateStr) {
    var total = 0, busy = 0;
    D.therapists.forEach(function (t) {
      if (!works(t, dateStr)) return;
      for (var m = D.spa.open; m < D.spa.close; m += 30) { total++; if (synthBusy(t.id, dateStr, m)) busy++; }
    });
    var own = activeBookings().filter(function (b) { return b.date === dateStr; });
    var ownBlocks = own.reduce(function (a, b) { return a + Math.ceil(b.duration / 30); }, 0);
    var revenue = busy * D.spa.avgRevenuePerHalfHour + own.reduce(function (a, b) { return a + b.total; }, 0);
    return { total: total, busy: busy + ownBlocks, occ: total ? Math.min(1, (busy + ownBlocks) / total) : 0, revenue: revenue, own: own.length };
  }
  function scheduleFor(dateStr) {
    var appts = [];
    D.therapists.forEach(function (t) {
      if (!works(t, dateStr)) return;
      var options = D.services.filter(function (s) { return t.skills.indexOf(s.category) !== -1; });
      var m = D.spa.open;
      while (m < D.spa.close) {
        if (synthBusy(t.id, dateStr, m)) {
          var start = m, blocks = 0;
          while (m < D.spa.close && synthBusy(t.id, dateStr, m) && blocks < 3) { m += 30; blocks++; }
          var h = hash(t.id + dateStr + start);
          appts.push({ min: start, end: start + blocks * 30, t: t, s: options[h % options.length], client: CLIENTS[h % CLIENTS.length], app: false });
        } else m += 30;
      }
    });
    activeBookings().filter(function (b) { return b.date === dateStr; }).forEach(function (b) {
      appts.push({ min: b.min, end: b.min + b.duration, t: therapist(b.therapistId), s: svc(b.serviceId), client: Store.get().user.name || 'App guest', app: true });
    });
    return appts.sort(function (a, b) { return a.min - b.min; });
  }
  function viewStudio() {
    var td = today();
    var s0 = dayStats(td);
    var week = [];
    for (var i = 0; i < 7; i++) { var ds = addDays(td, i); week.push({ ds: ds, st: dayStats(ds) }); }
    var weekRev = week.reduce(function (a, w) { return a + w.st.revenue; }, 0);
    var low = week.slice(1).reduce(function (a, w) { return !a || w.st.occ < a.st.occ ? w : a; }, null);
    var sched = scheduleFor(td);
    var nm = nowMin();
    var opens = openings(20).filter(function (o) { return o.date === td; }).length;
    var maxPct = 100;
    var gifts = Store.get().gifts.reduce(function (a, g) { return a + g.amount; }, 0);

    return '<section class="wrap page-head"><span class="eyebrow">' + icon('chart', 'ico-sm') + 'Spa Studio</span><h1>Today at <em>a glance</em>.</h1>' +
      '<p>Your book, your revenue and what to do next. Sample data blended with bookings made in this app.</p></section>' +
      '<section class="wrap"><div class="kpis">' +
        '<div class="kpi"><small>Revenue today</small><b>' + money(Math.round(s0.revenue)) + '</b><span>' + money(Math.round(weekRev)) + ' booked next 7 days</span></div>' +
        '<div class="kpi"><small>Appointments</small><b>' + sched.length + '</b><span>' + (s0.own ? s0.own + ' booked in-app' : 'across ' + D.therapists.filter(function (t) { return works(t, td); }).length + ' specialists') + '</span></div>' +
        '<div class="kpi"><small>Occupancy</small><b>' + Math.round(s0.occ * 100) + '%</b><span>' + (s0.total - s0.busy) + ' half-hours still open</span></div>' +
        '<div class="kpi"><small>Rebook rate</small><b>64%</b><span>' + (gifts ? money(gifts) + ' gift cards sold' : 'guests rebooking within 6 weeks') + '</span></div>' +
      '</div>' +
      '<div class="studio-grid">' +
        '<div class="panel"><h3>Occupancy, next 7 days</h3><p class="sub">Share of specialist time booked each day.</p>' +
          '<div class="bars" role="img" aria-label="Occupancy by day for the next 7 days">' +
            [25, 50, 75].map(function (g) { return '<div class="gridline" style="bottom:' + g + '%"><span>' + g + '%</span></div>'; }).join('') +
            week.map(function (w) {
              var pct = Math.round(w.st.occ * 100);
              var isLow = low && w.ds === low.ds;
              return '<div class="bar-col" tabindex="0" style="--h:' + (pct / maxPct * 100) + '%">' +
                '<div class="bar" style="height:' + (pct / maxPct * 100) + '%"></div>' +
                (isLow ? '<span class="lbl">Lowest · ' + pct + '%</span>' : '') +
                '<span class="tip">' + dayLabel(w.ds) + ' · ' + pct + '% booked · ' + money(Math.round(w.st.revenue)) + '</span></div>';
            }).join('') + '</div>' +
          '<div class="bar-x">' + week.map(function (w) { return '<span>' + (w.ds === td ? 'Today' : parseYmd(w.ds).toLocaleDateString('en-US', { weekday: 'short' })) + '</span>'; }).join('') + '</div>' +
          '<details class="table-view"><summary>View as table</summary><table class="data"><thead><tr><th>Day</th><th class="num">Occupancy</th><th class="num">Revenue</th></tr></thead><tbody>' +
            week.map(function (w) { return '<tr><td>' + dayLabel(w.ds) + '</td><td class="num">' + Math.round(w.st.occ * 100) + '%</td><td class="num">' + money(Math.round(w.st.revenue)) + '</td></tr>'; }).join('') +
          '</tbody></table></details></div>' +
        '<div class="panel"><h3>Smart suggestions</h3><p class="sub">Small moves that fill the book.</p><div style="margin-top:16px">' +
          (low ? insight('bolt', '<b>' + dayLabel(low.ds) + ' is only ' + Math.round(low.st.occ * 100) + '% booked.</b> Send a midweek 15% offer to lapsed guests — it typically fills 6–8 slots.') : '') +
          insight('sparkle', '<b>' + opens + ' last-minute openings</b> are live in the app right now at 20% off, turning empty chairs into revenue.') +
          insight('refresh', '<b>Rebook prompts</b> appear on every confirmation. Guests who rebook at checkout visit 2.3× more often.') +
          insight('crown', '<b>Circle members</b> are your steadiest revenue. Feature the membership banner on the home screen this week.') +
        '</div></div>' +
      '</div>' +
      '<div class="panel" style="margin-top:18px"><h3>Today’s schedule</h3><p class="sub">' + new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) + '</p><div class="schedule">' +
        (sched.length ? sched.map(function (a) {
          return '<div class="appt ' + (a.end < nm ? 'past' : '') + '"><time>' + timeLabel(a.min) + '</time><span class="rail-c" style="--a:' + a.s.art[0] + ';--b:' + a.s.art[2] + '"></span>' +
            '<div><b>' + esc(a.client) + ' · ' + esc(a.s.name) + '</b><small>with ' + esc(a.t.name) + ' · until ' + timeLabel(a.end) + '</small></div>' +
            (a.app ? '<span class="tag tag-brand">App</span>' : '<span></span>') + '</div>';
        }).join('') : '<div class="empty"><h4>A quiet day</h4><p>No appointments scheduled.</p></div>') +
      '</div></div></section>' + footer();
  }
  function insight(ic, html) { return '<div class="insight"><span class="ico-wrap">' + icon(ic, 'ico-sm') + '</span><p>' + html + '</p></div>'; }

  function notFound() {
    return '<section class="wrap"><div class="empty" style="margin-top:60px"><h4>This page drifted away.</h4><p>Let’s get you back somewhere calm.</p><a class="btn btn-primary btn-sm" href="#/">Go home</a></div></section>';
  }

  /* ------------------------------------------------------------------ *
   * Router
   * ------------------------------------------------------------------ */
  var routes = [
    [/^\/$/, viewHome, 'home'],
    [/^\/explore$/, viewExplore, 'explore'],
    [/^\/service\/([\w-]+)$/, viewService, 'explore'],
    [/^\/book(?:\/([\w-]+))?$/, viewBook, 'book'],
    [/^\/confirmed\/([\w-]+)$/, viewConfirmed, 'book'],
    [/^\/rewards$/, viewRewards, 'rewards'],
    [/^\/me$/, viewMe, 'me'],
    [/^\/gift$/, viewGift, 'gift'],
    [/^\/membership$/, viewMembership, 'me'],
    [/^\/studio$/, viewStudio, 'me'],
  ];
  function parseHash() {
    var raw = location.hash.replace(/^#/, '') || '/';
    var parts = raw.split('?');
    var q = {};
    (parts[1] || '').split('&').forEach(function (kv) {
      if (!kv) return;
      var p = kv.split('=');
      q[decodeURIComponent(p[0])] = decodeURIComponent((p[1] || '').replace(/\+/g, ' '));
    });
    return { path: parts[0] || '/', q: q };
  }
  var lastPath = null;
  function render(inPlace) {
    var h = parseHash();
    var match = null, nav = '';
    for (var i = 0; i < routes.length; i++) {
      var m = h.path.match(routes[i][0]);
      if (m) { match = [routes[i][1], m]; nav = routes[i][2]; break; }
    }
    var samePage = h.path === lastPath;
    var keepScroll = inPlace || samePage;
    var y = window.scrollY;
    var apply = function () {
      var html = match ? match[0](match[1], h.q) : notFound();
      if (html === '' && !match) return;
      view.innerHTML = html;
      view.classList.toggle('no-anim', !!keepScroll);
      hydrateIcons(document);
      document.querySelectorAll('[data-nav]').forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-nav') === nav); });
      updatePoints();
      animateRing();
      if (keepScroll) window.scrollTo(0, y);
      else window.scrollTo(0, 0);
      if (h.q.openings) { var el = document.getElementById('openings'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }
    };
    var animate = !keepScroll && lastPath !== null && document.startViewTransition &&
      document.visibilityState === 'visible' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (animate) {
      // Render immediately if the transition can't start (e.g. throttled frame).
      var done = false;
      var once = function () { if (!done) { done = true; apply(); } };
      try { document.startViewTransition(once); } catch (e) { once(); }
      setTimeout(once, 400);
    } else apply();
    lastPath = h.path;
    var titles = { home: 'Book your ritual', explore: 'Treatments', book: 'Book', rewards: 'Rewards', me: 'My rituals', gift: 'Gift cards' };
    document.title = D.spa.name + ' — ' + (titles[nav] || 'Wellness');
  }
  function go(hash) { if (location.hash === hash) render(); else location.hash = hash; }
  function hydrateIcons(root) {
    root.querySelectorAll('[data-icon]').forEach(function (el) { el.outerHTML = icon(el.getAttribute('data-icon')); });
  }
  function updatePoints() {
    var el = document.getElementById('pointsPill');
    if (el) el.innerHTML = icon('award', 'ico-sm') + Store.get().points.toLocaleString() + ' pts';
  }
  function animateRing() {
    var bar = view.querySelector('.ring .bar');
    if (bar) setTimeout(function () { bar.style.strokeDashoffset = bar.getAttribute('data-offset'); }, 60);
  }

  /* ------------------------------------------------------------------ *
   * Interactions (one delegated handler)
   * ------------------------------------------------------------------ */
  var actions = {
    'close-sheet': closeSheet,
    fav: function (el, e) {
      e.preventDefault(); e.stopPropagation();
      var id = el.dataset.id;
      var on;
      Store.update(function (st) {
        var i = st.favorites.indexOf(id);
        if (i === -1) { st.favorites.push(id); on = true; } else { st.favorites.splice(i, 1); on = false; }
      });
      buzz();
      toast(on ? 'Saved to favorites' : 'Removed from favorites', 'heart');
      render(true);
    },
    'start-book': function (el) { startDraft(el.dataset.id); },
    'clear-draft': function () { draft = null; },
    'take-opening': function (el) {
      startDraft(el.dataset.id, { date: el.dataset.date, min: Number(el.dataset.min) });
    },
    'pick-therapist': function (el) { draft.therapistId = el.dataset.id; buzz(); render(true); },
    'pick-date': function (el) { draft.date = el.dataset.date; draft.min = null; buzz(); render(true); },
    'pick-time': function (el) { draft.min = Number(el.dataset.min); buzz(); render(true); },
    'toggle-addon': function (el) {
      var i = draft.addOns.indexOf(el.dataset.id);
      if (i === -1) draft.addOns.push(el.dataset.id); else draft.addOns.splice(i, 1);
      buzz(); render(true);
    },
    'next-step': function () {
      if (draft.step === 1 && draft.min == null) return;
      draft.step = Math.min(3, draft.step + 1);
      render(true); window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    'prev-step': function () { draft.step = Math.max(1, draft.step - 1); render(true); },
    confirm: confirmBooking,
    waitlist: function () {
      Store.update(function (st) { st.waitlist.push({ serviceId: draft.serviceId, date: draft.date, at: Date.now() }); });
      toast('You’re on the waitlist — we’ll text you', 'bolt');
    },
    ics: function (el) { var b = Store.get().bookings.find(function (x) { return x.id === el.dataset.id; }); if (b) downloadIcs(b); },
    rebook: function (el) {
      var b = Store.get().bookings.find(function (x) { return x.id === el.dataset.id; });
      startDraft(b.serviceId, { therapistId: b.therapistId, rebook: true });
      go('#/book/' + b.serviceId);
    },
    'rebook-future': function (el) {
      var b = Store.get().bookings.find(function (x) { return x.id === el.dataset.id; });
      startDraft(b.serviceId, { therapistId: b.therapistId, date: addDays(b.date, 28), min: b.min, rebook: true });
      go('#/book/' + b.serviceId);
    },
    reschedule: function (el) {
      var b = Store.get().bookings.find(function (x) { return x.id === el.dataset.id; });
      startDraft(b.serviceId, { therapistId: b.therapistId, date: b.date, replaces: b.id });
      draft.addOns = b.addOns.slice();
      toast('Pick a new time — your old one is released when you confirm', 'calendar');
      go('#/book/' + b.serviceId);
    },
    cancel: function (el) {
      var b = Store.get().bookings.find(function (x) { return x.id === el.dataset.id; });
      var s = svc(b.serviceId);
      var late = at(b.date, b.min) - new Date() < 24 * 36e5;
      openSheet('<h3>Cancel this ritual?</h3><p>' + esc(s.name) + ' on ' + dayLabel(b.date, true) + ' at ' + timeLabel(b.min) + '.' +
        (late ? ' This is within 24 hours, so a late-cancellation fee may apply.' : ' You’re within the free cancellation window.') +
        ' Rather move it? Rescheduling is free.</p>' +
        '<div class="sheet-actions"><button class="btn btn-ghost" data-action="reschedule" data-id="' + b.id + '">Reschedule</button>' +
        '<button class="btn btn-accent" data-action="confirm-cancel" data-id="' + b.id + '">Cancel booking</button></div>');
    },
    'confirm-cancel': function (el) {
      Store.update(function (st) {
        var b = st.bookings.find(function (x) { return x.id === el.dataset.id; });
        if (!b || b.status === 'cancelled') return;
        b.status = 'cancelled';
        st.points = Math.max(0, st.points - b.points);
        st.lifetimePoints = Math.max(0, st.lifetimePoints - b.points);
        st.credit += b.credit || 0;
        st.pointsLog.unshift({ label: 'Cancelled: ' + svc(b.serviceId).name, pts: -b.points, at: Date.now() });
      });
      closeSheet();
      toast('Booking cancelled', 'x');
      render(true);
    },
    rate: function (el) {
      var n = Number(el.dataset.n);
      Store.update(function (st) {
        var b = st.bookings.find(function (x) { return x.id === el.dataset.id; });
        if (!b || b.rating) return;
        b.rating = n;
        st.points += 50; st.lifetimePoints += 50;
        st.pointsLog.unshift({ label: 'Rated ' + svc(b.serviceId).name, pts: 50, at: Date.now() });
      });
      toast('Thank you! +50 points', 'star');
      render(true);
    },
    'me-tab': function (el) { meTab = el.dataset.id; render(true); },
    redeem: function (el) {
      var r = D.rewards.find(function (x) { return x.id === el.dataset.id; });
      if (Store.get().points < r.pts) return;
      Store.update(function (st) {
        st.points -= r.pts; st.credit += r.credit;
        st.pointsLog.unshift({ label: 'Redeemed ' + r.label, pts: -r.pts, at: Date.now() });
      });
      confetti();
      toast(money(r.credit) + ' credit added — it applies at checkout', 'award');
      render(true);
    },
    'copy-code': function () { copy(Store.get().referralCode, 'Referral code copied'); },
    share: function () {
      var text = 'I love ' + D.spa.name + '. Use my code ' + Store.get().referralCode + ' for $25 off your first ritual.';
      var url = location.href.split('#')[0];
      if (navigator.share) navigator.share({ title: D.spa.name, text: text, url: url }).catch(function () {});
      else copy(text + ' ' + url, 'Invite copied — paste it anywhere');
    },
    'gift-design': function (el) { gift.design = Number(el.dataset.n); render(true); },
    'gift-amt': function (el) { gift.amount = Number(el.dataset.n); render(true); },
    'send-gift': function () {
      if (!gift.to.trim()) { var f = document.getElementById('g-to'); f.classList.add('invalid'); f.focus(); toast('Who is the lucky one?', 'gift'); return; }
      Store.update(function (st) {
        st.gifts.push({ amount: gift.amount, to: gift.to, from: gift.from, msg: gift.msg, at: Date.now() });
        var pts = Math.floor(gift.amount * 0.5);
        st.points += pts; st.lifetimePoints += pts;
        st.pointsLog.unshift({ label: 'Gift card for ' + gift.to, pts: pts, at: Date.now() });
      });
      confetti();
      toast('Gift card on its way to ' + gift.to + ' ✨', 'gift');
      gift = { amount: 100, design: gift.design, to: '', from: gift.from, msg: '' };
      render(true);
    },
    'join-circle': function (el) {
      Store.update(function (st) {
        st.membership = el.dataset.id;
        st.points += 200; st.lifetimePoints += 200;
        st.pointsLog.unshift({ label: 'Welcome to the Circle', pts: 200, at: Date.now() });
      });
      confetti();
      toast('Welcome to the Circle — +200 points', 'crown');
      render(true);
    },
    'leave-circle': function () {
      openSheet('<h3>Leave the Circle?</h3><p>You’ll lose member pricing and double points. Your remaining monthly ritual stays valid until the end of the period.</p>' +
        '<div class="sheet-actions"><button class="btn btn-primary" data-action="close-sheet">Stay</button><button class="btn btn-ghost" data-action="confirm-leave">Leave</button></div>');
    },
    'confirm-leave': function () { Store.update(function (st) { st.membership = null; }); closeSheet(); toast('Membership cancelled', 'x'); render(true); },
    reset: function () {
      openSheet('<h3>Reset demo data?</h3><p>This clears bookings, points, favorites and profile on this device.</p>' +
        '<div class="sheet-actions"><button class="btn btn-ghost" data-action="close-sheet">Keep</button><button class="btn btn-accent" data-action="confirm-reset">Reset</button></div>');
    },
    'confirm-reset': function () { Store.reset(); draft = null; closeSheet(); toast('Fresh start', 'leaf'); go('#/'); },
  };

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]');
    if (!el) return;
    var fn = actions[el.dataset.action];
    if (!fn) return;
    if (el.tagName === 'BUTTON') e.preventDefault();
    fn(el, e);
  });

  var searchTimer;
  document.addEventListener('input', function (e) {
    var el = e.target;
    var kind = el.getAttribute('data-input');
    if (kind === 'draft' && draft) {
      draft[el.dataset.key] = el.value;
      el.classList.remove('invalid');
    } else if (kind === 'gift') {
      gift[el.dataset.key] = el.value;
      el.classList.remove('invalid');
      var wrap = document.getElementById('gc-wrap');
      if (wrap) wrap.innerHTML = giftCardPreview();
    } else if (kind === 'search') {
      clearTimeout(searchTimer);
      var val = el.value;
      searchTimer = setTimeout(function () {
        var h = parseHash();
        var q = Object.assign({}, h.q, { q: val });
        if (!val) delete q.q;
        var qs = Object.keys(q).map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(q[k]); }).join('&');
        history.replaceState(null, '', '#/explore' + (qs ? '?' + qs : ''));
        render(true);
        var input = document.querySelector('[data-input="search"]');
        if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
      }, 180);
    }
  });

  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !sheetRoot.hidden) closeSheet(); });

  var topbar = document.getElementById('topbar');
  window.addEventListener('scroll', function () { topbar.classList.toggle('scrolled', window.scrollY > 8); }, { passive: true });
  window.addEventListener('hashchange', function () { render(false); });

  render(false);

  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
})();
