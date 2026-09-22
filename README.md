# Ledger

Event + personal finance tracker. Plain HTML/CSS/JS — no build step, no dependencies, no server. Data stays in your browser (`localStorage`) only.

## Run locally
Just open `index.html` in a browser. Everything works offline immediately.

## Put it on GitHub Pages
1. Create a new repo on GitHub, e.g. `ledger`.
2. Upload all files in this folder (`index.html`, `style.css`, `app.js`, `manifest.json`, `service-worker.js`, `icon.svg`, `vendor/xlsx.full.min.js`) to the repo root — keep the `vendor` folder structure intact.
3. Repo → **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` / `root` → Save.
4. Your app will be live at `https://<your-username>.github.io/ledger/` in a minute or two.

## Install it like an app
<<<<<<< HEAD
An **"Install app"** button appears right in the header on Android/Chrome — tap it, no menu-digging needed. On iPhone/Safari (which doesn't support that button by design of iOS), a small banner tells you: Share → "Add to Home Screen".

It installs like a real app icon, opens full-screen, and works fully offline after the first load (a service worker caches all files).

**A note on "APK" vs this app:** this is a PWA (installed web app) — that's what "Install app" gives you: an icon, full-screen, offline, no browser bar. It is not a native `.apk`, and that distinction matters for one thing: a PWA can ask for notification permission (which this app does), but it **cannot** get Android's exact-alarm permission — that's only available to real native apps. So reminders here work reliably whenever you open the app (the Reports tab always shows what's due, with a badge), and *can* pop an OS notification if the app happens to be open when a milestone hits — but nothing can wake your phone while the app is fully closed, the way a native alarm app does. Getting that would mean wrapping this into a real APK (free tools like [PWABuilder](https://www.pwabuilder.com) can do that from this same code) plus a push server — a bigger project. Happy to scope that out with you if it's worth it.

=======
On your phone, open the live link in Chrome (Android) or Safari (iOS):
- **Android/Chrome:** menu → "Add to Home screen" / "Install app"
- **iOS/Safari:** Share → "Add to Home Screen"

It installs like a real app icon, opens full-screen, and works fully offline after the first load (a service worker caches all files).

>>>>>>> 01612466609d40bdb4fcd6baaf5891d603b8f56f
## Notes
- All data is local to the browser it's used in — nothing is sent anywhere. If you switch phones/browsers, data doesn't carry over automatically (it's not synced).
- Dark/light toggle and currency (₹/$) are remembered.
- Events sort with unpaid/partial on top; fully **Received** events sink toward the bottom automatically.
- Multi-day events: set an end date on any event (e.g. 30 Jul → 6 Aug) — it just tracks the span, all costs/income stay as one entry.
- Every event shows **Paid / Pending** on the client side, and — for manpower/commission events — **Paid / Balance owed** on the team side too.
- **Manpower / commission**: add a row per name/group with a headcount and rate — e.g. "Rahul & team, count 2, client pays each ₹700, you pay each ₹650" gives ₹100 margin per person, ₹200 total. Each row also tracks whether *you've* paid your team yet (Pending/Partial/Paid), with balance owed shown per row.
<<<<<<< HEAD
- **Attending a manpower event yourself** — hit the small "+ Me" button in "People sent". That row skips the payout field entirely (you don't pay yourself) and whatever the client pays for your slot counts as your own earnings, not commission — it shows up under "Own event earnings" in Reports, not "Manpower earnings".
- **Client & report** (inside each event's "More details") — client phone, reporting time you were told, actual login/logout time, and login/logout photos (auto-compressed before saving so they don't fill up storage). "Send report on WhatsApp" opens a pre-filled WhatsApp chat with event name, date, times, headcount, and amount — photos aren't attached automatically (WhatsApp's link format is text-only), so open and attach them manually if needed.
- **My earnings** in the top ticker shows only what's actually yours — own-event profit + manpower commission — never the gross client payment that passes through to your team.
- **Reports tab** (its own page, next to Events/Personal/Learn):
  - **Follow-ups due** — automatic reminders 7, 15, and 30 days after an event's end date, for as long as a client payment or team payout is still pending. A small red badge on the "Reports" tab shows how many are due. There's also a best-effort "Enable browser reminders" button — if you grant notification permission, it'll pop an OS notification for newly-crossed milestones whenever the app is open (see the APK/alarm note above for why it can't do this while fully closed).
  - **Current month report** — always shows just the current month, detailed: your own events and manpower events listed separately, every personal expense with category, category totals, and an earnings summary. It rolls over automatically on the 1st — no manual reset needed, it's just filtered live off real dates.
=======
- **My earnings** in the top ticker shows only what's actually yours — own-event profit + manpower commission — never the gross client payment that passes through to your team.
- **Reports tab** (its own page, next to Events/Personal/Learn):
  - **Follow-ups due** — automatic reminders 7, 15, and 30 days after an event's end date, for as long as a client payment or team payout is still pending. A small red badge on the "Reports" tab shows how many are due. There's also a best-effort "Enable browser reminders" button — if you grant notification permission, it'll pop an OS notification for newly-crossed milestones whenever the app is open (it can't notify you while the tab/app is fully closed — that would need a server, which this app deliberately doesn't have).
  - **Current month report** — always shows just the current month, detailed: every event with its net, every personal expense with category, category totals, and an earnings summary. It rolls over automatically on the 1st — no manual reset needed, it's just filtered live off real dates.
>>>>>>> 01612466609d40bdb4fcd6baaf5891d603b8f56f
  - **Previous months** — every past month is kept (nothing is ever deleted) and browsable in a collapsed accordion below — click any month to expand the same level of detail.
- **Excel export** — download icon in header. Exports everything (Events, Event Workers, Personal Expenses, Monthly Summary) into one `.xlsx` file, sorted chronologically. Works fully offline (the xlsx library is bundled locally in `vendor/`, no external calls).
