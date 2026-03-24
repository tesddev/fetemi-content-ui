# Fetemi Content Automation Frontend

You are building a web frontend that connects to an n8n automation backend.

## Tech Stack
- Plain HTML, CSS, JavaScript (no frameworks needed)
- Fetch API for HTTP requests to n8n webhooks
- No backend needed — all logic is in n8n

## n8n Webhook URLs
- Submit idea/URL: POST https://cohort2pod2.app.n8n.cloud/webhook/content-submit
- Select draft: POST https://cohort2pod2.app.n8n.cloud/webhook/draft-select

## Auth Header
Every POST request must include this header:
- X-API-Key: 9217ecf1e7bbe35df15abfc3b26920d12c7f3a5cbc44ef05ec79cf15432f06fd

## App Flow
1. Screen 1 — Input Form: User enters idea text OR a URL
2. Screen 2 — Draft Review: Show 3 draft cards returned from n8n, user picks one
3. Screen 3 — Adapted Content: Show LinkedIn post, Twitter thread, email — with Publish or Schedule buttons

## Important Rules
- Disable submit button after click to prevent duplicate submissions
- Show loading spinner while waiting for n8n response
- Handle errors gracefully with user-friendly messages
- Store run_id in memory between screens (don't use localStorage)