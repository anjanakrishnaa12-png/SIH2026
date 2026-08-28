# ULPF Security Operations Dashboard

A frontend-only demo for **ULPF — Universal Log Pre-processing Framework**. It presents a SOC-style dashboard for ingesting raw perimeter-security logs, reviewing AI-generated normalization rules, browsing OCSF events, and monitoring parser drift.

All data is local mock data. No backend, authentication, or external services are required.

## Run the UI locally

Prerequisites: Node.js 22 or later.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

To verify a production build:

```bash
npm run build
npm run start
```

## Push this project to GitHub

Run these commands from the project directory:

```bash
git init -b main
git add .
git commit -m "feat: add ULPF security operations dashboard"
git remote add origin https://github.com/anjanakrishnaa12-png/log-pre-processing.git
git push -u origin main
```

If the repository has already been initialized, skip `git init`. If `origin` already exists, update it instead:

```bash
git remote set-url origin https://github.com/anjanakrishnaa12-png/log-pre-processing.git
```

## Demo areas

- Overview — live-looking ingestion metrics, event throughput, source mix, and alerts
- Log Sources — connected device inventory plus a local sample-log onboarding flow
- Onboarding Queue — human approval workflow for SLM-generated OCSF parsing rules
- Event Browser — searchable canonical events with raw-to-normalized traceability
- Drift Monitor — parser health, trend signals, auto-quarantine, and rollback policy

## Stack

- React
- Tailwind CSS
- Local component state and mock security telemetry
