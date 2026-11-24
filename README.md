# Kriya — booking app for health spas

A booking app for health spas that works in the browser on desktop and phone, and installs to the home screen like a native app (PWA). It's built to do three jobs for the spa: bring new clients in, fill the calendar, and turn first-time guests into regulars.

No build step and no dependencies: plain HTML, CSS and JavaScript.

## Run it

- **Quickest:** open `index.html` in a browser.
- **Full PWA (offline + "Add to Home Screen"):** serve the folder over HTTP, e.g. `npx serve .` or any static host (GitHub Pages, Netlify, Cloudflare Pages).

All data is stored in the browser (`localStorage`). Use **Me → Reset demo data** to start over as a new guest.

## What's inside

### For guests
| Feature | Why it matters to the spa |
|---|---|
| **Mood-based discovery** ("How do you want to feel?") | Guests find a treatment by feeling, not jargon, so fewer leave without booking |
| **3-step booking** (Time → Enhance → Confirm), live availability, specialist choice, no card required | Fewer steps mean more completed bookings |
| **Last-minute openings** at 20% off | Fills empty slots that would otherwise earn nothing |
| **Add-on upsells** with "Pairs perfectly" suggestions | Raises the average spend per booking |
| **First-visit welcome offer** (20%, automatic) | Converts first-time visitors |
| **Rewards**: points, Seed → Bloom → Radiance tiers, redeem for credit | Gives guests a reason to come back |
| **Rebook prompts**: "same time in 4 weeks, save 10%" on confirmation and home | Builds a regular visit rhythm |
| **Referrals**: give $25, get 250 points | Brings in new clients through existing ones |
| **Circle membership** (monthly plans with savings calculator) | Recurring monthly revenue |
| **Gift cards** with live card preview | Revenue up front, plus new clients when the cards are used |
| **Ratings** on past visits (+50 points) | More reviews to show new visitors |
| **Add to calendar** (.ics with 2-hour reminder), reschedule, cancel with policy | Fewer no-shows; rescheduling is offered before cancelling |

### For the spa: **Studio** (`#/studio`)
Today's revenue, appointments, occupancy and rebook rate; a 7-day occupancy chart; today's schedule; and suggestions such as which day to promote.

## Make it yours

Everything spa-specific lives in [`js/data.js`](js/data.js): name, address, hours, services, prices, specialists and their working days, add-ons, memberships, reward tiers and reviews. Change those values to rebrand the app for any spa. Colors and fonts are CSS variables at the top of [`css/styles.css`](css/styles.css).

## Project structure

```
index.html            App shell (top nav on desktop, tab bar on mobile)
css/styles.css        Design system + all components, light & dark mode
js/data.js            Spa catalog & configuration
js/store.js           Persistence layer (localStorage) — swap for an API
js/app.js             Router, availability engine, pricing, views, interactions
sw.js                 Offline cache
manifest.webmanifest  PWA install metadata
assets/               App icons
```

## Taking it to production

This is a working front end with simulated data. To run it for a real spa you'd add:

1. **Backend & real availability.** Replace `synthBusy()` in `app.js` (simulated other clients) and `store.js` with API calls to a database or an existing spa system.
2. **Accounts.** Sign-in by email or SMS code, so bookings and points follow the guest across devices.
3. **Payments.** Deposits, gift cards and memberships through Stripe or Square.
4. **Notifications.** Email/SMS confirmations, reminders, rebook nudges and waitlist alerts.
5. **Admin tools.** Let staff edit services, schedules and offers instead of editing `data.js`.
