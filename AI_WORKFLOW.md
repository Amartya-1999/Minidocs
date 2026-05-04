# AI Workflow Note

## Overview

I used AI as an execution partner throughout this assessment, not just as a code generator. My approach was to use AI to accelerate planning, implementation, debugging, validation, and documentation while still making the final product decisions myself.

The assessment asked for an AI-native way of working, so I intentionally showed how I used AI to move from an ambiguous product prompt to a working, testable product under time constraints.

## AI Tools Used

I used AI assistance for:

- Understanding and decomposing the assessment requirements.
- Defining a realistic 4-6 hour product scope.
- Choosing the technical architecture.
- Generating initial scaffolding for the frontend, backend, database, and API routes.
- Debugging implementation issues.
- Improving error handling and validation.
- Creating test coverage.
- Drafting final submission documentation.

## How I Used AI Step by Step

### 1. Requirement Decomposition

The original task was broad: build a Google Docs-like product with document creation, editing, upload, sharing, persistence, tests, deployment, and documentation.

I used AI to break this into core product capabilities:

1. Demo user selection.
2. Dashboard for owned and shared documents.
3. New document creation.
4. Rich-text editing.
5. Save and persistence.
6. File upload.
7. Sharing by email.
8. Basic tests.
9. Clear submission documentation.

This helped me avoid overbuilding and focus on a complete end-to-end workflow.

### 2. Scope Prioritization

With a limited time window, I used AI to identify what to prioritize and what to intentionally defer.

I prioritized:

- Working full-stack product flow.
- Persistence using Prisma and SQLite.
- Rich-text editing using TipTap.
- File upload for `.txt` and `.md`.
- Owner/shared document access.
- Clean reviewer-friendly documentation.

I deprioritized:

- Real authentication.
- Real-time collaboration.
- Comments and suggestion mode.
- Version history.
- Advanced permission roles.
- Full `.docx` parsing.
- Advanced markdown rendering.

This was a practical tradeoff: the goal was to deliver a reliable product slice instead of an incomplete clone of Google Docs.

### 3. Architecture Planning

AI helped me compare possible implementation paths and settle on a simple architecture:

- Next.js App Router for frontend and backend.
- React client components for interactive pages.
- Prisma ORM for database access.
- SQLite for fast local persistence.
- TipTap for rich-text editing.
- Vitest for lightweight automated testing.

AI also helped design the main data model:

- `User`
- `Document`
- `DocumentShare`

This supported the key product workflows without unnecessary complexity.

### 4. Implementation Acceleration

I used AI to generate initial versions of:

- Landing page.
- Dashboard page.
- Document editor page.
- Rich-text editor component.
- Prisma schema.
- Seed script.
- API routes for:
  - Users
  - Documents
  - Single-document read/update
  - Sharing
  - Upload
- Utility functions for uploaded documents.

I treated the AI-generated code as a starting point, then tested and corrected it locally.

### 5. Debugging and Iteration

AI was especially useful during debugging. I shared runtime errors and screenshots, then used AI to quickly identify root causes and fixes.

Some issues resolved through AI-assisted debugging included:

- Prisma 7 datasource configuration differences.
- SQLite adapter setup for Prisma Client.
- Missing Prisma seed script.
- Next.js API route method export issues.
- Incorrect dynamic API folder structure.
- Mistaken folder named `[id] share` instead of `[id]/share`.
- Frontend crashes from calling `res.json()` on failed API responses.
- TipTap editor prop mismatch causing `onChange is not a function`.
- Document page getting stuck on loading because the API route returned 404.

The AI helped narrow down each issue, but I verified every fix by running the app locally and testing the actual user flow.

### 6. Validation and Testing

I used AI to identify what should be validated manually and what could be covered with a small automated test.

Manual validation included:

1. Loading seeded users.
2. Selecting Kumar as a demo user.
3. Viewing the document dashboard.
4. Creating a new document.
5. Opening the document editor.
6. Editing title and content.
7. Saving and reopening the document.
8. Uploading `.txt` or `.md` files.
9. Sharing a document with `alex@demo.com`.
10. Switching to Alex and verifying the shared document appears.

Automated validation was added using Vitest for document upload utilities:

- Supported file type detection.
- Title extraction from file names.
- HTML escaping.
- Plain-text-to-HTML conversion.

This gave the project at least one reliable automated test layer without slowing down the main product build.

### 7. Documentation

I used AI to help structure the final documentation so that it would be easy for a reviewer to understand the product quickly.

The documentation includes:

- `README.md` for setup and usage.
- `ARCHITECTURE.md` for system design and tradeoffs.
- `AI_WORKFLOW.md` for AI usage and process transparency.
- `SUBMISSION.md` for the final assessment checklist.
- `walkthrough-video.txt` for the video link.

## Where AI Helped Most

AI helped most in three areas:

### Speed

It reduced time spent on boilerplate and allowed me to focus on product flow, debugging, and validation.

### Debugging

It helped quickly interpret errors from Prisma, Next.js, and TipTap and convert them into actionable fixes.

### Communication

It helped turn implementation details into structured, reviewer-ready documentation.

## Where I Used My Own Judgment

I did not blindly accept AI output. I made several product and engineering decisions myself, including:

- Choosing a seeded-user model instead of full authentication.
- Keeping file upload limited to `.txt` and `.md`.
- Using SQLite for speed and simplicity.
- Prioritizing a working owner/shared document model over real-time collaboration.
- Simplifying the editor page when the initial implementation became unstable.
- Testing API routes directly in the browser during debugging.
- Deciding what to call out as known limitations.

## AI Output I Modified or Corrected

Some AI-generated output required correction after local testing.

Examples:

- The Prisma setup needed adjustment for the installed Prisma version.
- API route files had to use named exports such as `GET`, `POST`, and `PATCH`.
- The dynamic document API route had to be placed at `app/api/documents/[id]/route.ts`.
- The share route had to be placed at `app/api/documents/[id]/share/route.ts`.
- The editor component had to correctly receive `onChange={setContentHtml}`.
- Frontend API calls needed safer error handling when responses were not valid JSON.

These corrections were part of the AI-native workflow: generate, test, inspect, refine, and verify.

## Final Reflection

The biggest value of AI was not that it wrote code automatically. The value was that it helped me operate faster and more systematically under ambiguity.

I used AI to:

- Decompose the problem.
- Choose practical tradeoffs.
- Generate implementation options.
- Debug errors.
- Improve validation.
- Prepare clear documentation.

The final product is intentionally scoped, but it demonstrates a complete working loop across frontend, backend, database, upload, sharing, and persistence.

In a real team environment, this is how I would use AI: as a multiplier for execution speed, while still applying human judgment to product scope, technical tradeoffs, testing, and communication.