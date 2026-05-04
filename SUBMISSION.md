# Ajaia AI-Native Assessment Submission

## Project

MiniDocs — a lightweight collaborative document editor inspired by Google Docs.

## Included Materials

This submission includes:

1. Source code for the MiniDocs full-stack application.
2. `README.md` with setup and run instructions.
3. `ARCHITECTURE.md` with product and engineering decisions.
4. `AI_WORKFLOW.md` explaining how AI was used.
5. `SUBMISSION.md` listing included materials.
6. `walkthrough-video.txt` containing the walkthrough video URL.
7. Screenshots or demo assets, if included in the Google Drive folder.

## Live Product URL

`(https://drive.google.com/file/d/1TrXY07M4Ya69DfSbmmJb3-047wz9Y_Ig/view?usp=drive_link)`

## Walkthrough Video URL

`(https://minidocs-qkp5.onrender.com)`

## Seeded Users

| Name | Email |
|---|---|
| Kumar | kumar@demo.com |
| Alex | alex@demo.com |
| Maya | maya@demo.com |

## Recommended Review Flow

1. Open the live app or run locally.
2. Select `Kumar`.
3. Create a new document.
4. Rename the document.
5. Add and format content.
6. Save the document.
7. Return to the dashboard and reopen the document.
8. Upload a `.txt` or `.md` file.
9. Share a document with `alex@demo.com`.
10. Switch user to `Alex`.
11. Confirm the shared document appears under `Shared With Me`.

## What Is Working

- Seeded demo user selection.
- Dashboard with owned and shared documents.
- New document creation.
- Document renaming.
- Rich-text editing.
- Save and reopen persistence.
- `.txt` and `.md` upload into new editable documents.
- Owner-based sharing by email.
- Shared document visibility for recipient users.
- SQLite persistence through Prisma.
- Basic validation and error handling.
- Automated utility tests with Vitest.

## What Is Incomplete or Intentionally Deprioritized

- Real authentication.
- Real-time collaboration.
- Comments and suggestions.
- Version history.
- Role-based access beyond owner/shared editor.
- Full `.docx` parsing.
- Advanced markdown rendering.
- Production-grade hosted database setup.

## What I Would Build Next With Another 2-4 Hours

1. Add autosave with visible save state.
2. Add role-based sharing permissions.
3. Add document version history.
4. Improve markdown parsing for uploaded `.md` files.
5. Add more automated API-level tests.
6. Deploy with a hosted Postgres database for more reliable production persistence.
