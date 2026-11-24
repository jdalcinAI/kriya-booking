/*
 * Client-side persistence (localStorage).
 * This is the seam where a real backend plugs in: replace get/update with
 * API calls and the views keep working unchanged.
 */
(function () {
  'use strict';
  var KEY = 'kriya.state.v1';

  function referralCode() {
    var chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    var s = '';
    for (var i = 0; i < 5; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return 'KRIYA-' + s;
  }

  function fresh() {
    return {
      user: { name: '', email: '', phone: '' },
      bookings: [],
      points: 150,
      lifetimePoints: 150,
      credit: 0,
      favorites: [],
      membership: null,
      gifts: [],
      waitlist: [],
      referralCode: referralCode(),
      pointsLog: [{ label: 'Welcome gift', pts: 150, at: Date.now() }],
      created: Date.now(),
    };
  }

  var state;
  try {
    var saved = JSON.parse(localStorage.getItem(KEY));
    state = saved ? Object.assign(fresh(), saved) : fresh();
  } catch (e) {
    state = fresh();
  }

  var listeners = [];
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
    listeners.forEach(function (fn) { fn(state); });
  }

  window.KriyaStore = {
    get: function () { return state; },
    update: function (fn) { fn(state); save(); },
    reset: function () { state = fresh(); save(); },
    subscribe: function (fn) { listeners.push(fn); },
  };
})();
