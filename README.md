# MiniDocs

MiniDocs is a lightweight collaborative document editor built for the Ajaia AI-Native Assessment. It is inspired by Google Docs, but intentionally scoped to a focused, working product slice that demonstrates document creation, rich-text editing, file upload, sharing, and persistence.

## Live Demo

Live product URL: `<ADD_DEPLOYED_URL_HERE>`

Walkthrough video: `<ADD_LOOM_OR_YOUTUBE_URL_HERE>`

## Seeded Demo Users

The app uses a lightweight seeded-user model instead of full authentication.

| Name | Email |
|---|---|
| Kumar | kumar@demo.com |
| Alex | alex@demo.com |
| Maya | maya@demo.com |

Recommended review flow:

1. Select `Kumar`.
2. Create a new document.
3. Rename the document.
4. Edit and format the content.
5. Save the document.
6. Share it with `alex@demo.com`.
7. Switch user to `Alex`.
8. Confirm the document appears under `Shared With Me`.

## Features

### Document Creation and Editing

Users can:

- Create a new document.
- Rename a document.
- Edit document content in the browser.
- Save and reopen documents.
- Use basic rich-text formatting:
  - Bold
  - Italic
  - Underline
  - H1 and H2 headings
  - Bulleted lists
  - Numbered lists

### File Upload

Users can upload `.txt` or `.md` files from the dashboard.

The uploaded file is converted into a new editable document. The original file name becomes the document title, and the file content becomes editable rich-text content.

Supported upload types:

- `.txt`
- `.md`

Unsupported file types are rejected with a clear error message.

### Sharing

MiniDocs includes a simple sharing model:

- Each document has one owner.
- Owners can share documents with seeded users by email.
- The dashboard separates:
  - `My Documents`
  - `Shared With Me`
- Shared users can open and edit documents.
- Only the owner can share a document with others.

### Persistence

Documents, users, and sharing relationships are persisted using SQLite through Prisma.

Documents remain available after page refresh, and document content is stored as HTML so formatting is preserved.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Prisma
- SQLite
- TipTap rich-text editor
- Vitest

## Local Setup

### 1. Install dependencies

```bash
npm install