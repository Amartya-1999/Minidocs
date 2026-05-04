"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

type User = {
  id: string;
  name: string;
  email: string;
};

type DocumentData = {
  id: string;
  title: string;
  contentHtml: string;
  ownerId: string;
  owner: User;
  shares: {
    id: string;
    user: User;
  }[];
};

export default function DocumentPage() {
  const params = useParams();
  const router = useRouter();
  const documentId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [doc, setDoc] = useState<DocumentData | null>(null);
  const [title, setTitle] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [shareEmail, setShareEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("minidocs:user");

    if (!stored) {
      router.push("/");
      return;
    }

    const parsedUser = JSON.parse(stored);
    setUser(parsedUser);
    loadDocument(parsedUser.id);
  }, []);

  async function loadDocument(userId: string) {
    const res = await fetch(`/api/documents/${documentId}?userId=${userId}`);
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to load document");
      return;
    }

    setDoc(data);
    setTitle(data.title);
    setContentHtml(data.contentHtml);
  }

  async function saveDocument() {
    if (!user) return;

    setStatus("");
    setError("");

    const res = await fetch(`/api/documents/${documentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        title,
        contentHtml,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Save failed");
      return;
    }

    setStatus("Saved successfully");
  }

  async function shareDocument() {
    if (!user) return;

    setStatus("");
    setError("");

    const res = await fetch(`/api/documents/${documentId}/share`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerId: user.id,
        email: shareEmail,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Share failed");
      return;
    }

    setShareEmail("");
    setStatus("Document shared successfully");
    loadDocument(user.id);
  }

  if (error && !doc) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-8 max-w-lg">
          <h1 className="text-2xl font-bold mb-3">Unable to open document</h1>
          <p className="text-red-300 mb-6">{error}</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="rounded-lg bg-blue-600 px-4 py-2"
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  if (!doc || !user) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">Loading document...</p>
      </main>
    );
  }

  const isOwner = doc.ownerId === user.id;

  return (
    <main className="min-h-screen bg-slate-950 text-white px-8 py-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-slate-300 hover:text-white mb-6"
        >
          ← Back to Dashboard
        </button>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <section>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-4xl font-bold outline-none border-b border-slate-700 pb-3 mb-4"
              placeholder="Document title"
            />

            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={saveDocument}
                disabled={!title.trim()}
                className="rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 px-4 py-2 font-medium"
              >
                Save
              </button>

              {status && <p className="text-green-300 text-sm">{status}</p>}
              {error && <p className="text-red-300 text-sm">{error}</p>}
            </div>

            <RichTextEditor content={contentHtml} onChange={setContentHtml} />
          </section>

          <aside className="rounded-xl bg-slate-900 border border-slate-800 p-5 h-fit">
            <h2 className="font-semibold text-lg mb-3">Document Info</h2>

            <p className="text-sm text-slate-400 mb-1">Owner</p>
            <p className="mb-4">
              {doc.owner.name} · {doc.owner.email}
            </p>

            <p className="text-sm text-slate-400 mb-1">Your access</p>
            <p className="mb-6">{isOwner ? "Owner" : "Shared editor"}</p>

            <h2 className="font-semibold text-lg mb-3">Share</h2>

            {isOwner ? (
              <div className="space-y-3">
                <input
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  placeholder="alex@demo.com"
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 outline-none"
                />

                <button
                  onClick={shareDocument}
                  className="w-full rounded-lg bg-slate-700 hover:bg-slate-600 px-4 py-2"
                >
                  Share Document
                </button>
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                Only the owner can share this document.
              </p>
            )}

            <div className="mt-6">
              <p className="text-sm text-slate-400 mb-2">Shared with</p>

              {doc.shares.length === 0 ? (
                <p className="text-sm text-slate-500">No users yet.</p>
              ) : (
                <ul className="space-y-2">
                  {doc.shares.map((share) => (
                    <li key={share.id} className="text-sm">
                      {share.user.name} · {share.user.email}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}