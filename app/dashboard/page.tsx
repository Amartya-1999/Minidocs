"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
};

type DocumentItem = {
  id: string;
  title: string;
  updatedAt: string;
  owner: User;
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [owned, setOwned] = useState<DocumentItem[]>([]);
  const [shared, setShared] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("minidocs:user");

    if (!stored) {
      router.push("/");
      return;
    }

    const parsedUser = JSON.parse(stored);
    setUser(parsedUser);
    loadDocuments(parsedUser.id);
  }, [router]);

  async function loadDocuments(userId: string) {
    setLoading(true);

    const res = await fetch(`/api/documents?userId=${userId}`);
    const data = await res.json();

    setOwned(data.owned || []);
    setShared(data.shared || []);
    setLoading(false);
  }

  async function createDocument() {
    if (!user) return;

    const res = await fetch("/api/documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerId: user.id,
        title: "Untitled Document",
      }),
    });

    const doc = await res.json();
    router.push(`/documents/${doc.id}`);
  }

  async function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (!user || !event.target.files?.[0]) return;

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("ownerId", user.id);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Upload failed");
      return;
    }

    router.push(`/documents/${data.id}`);
  }

  function switchUser() {
    localStorage.removeItem("minidocs:user");
    router.push("/");
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <div>
            <p className="text-sm text-blue-300 font-medium">MiniDocs</p>
            <h1 className="text-3xl font-bold">Document Dashboard</h1>
            <p className="text-slate-400 mt-1">
              Signed in as {user.name} · {user.email}
            </p>
          </div>

          <button
            onClick={switchUser}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
          >
            Switch User
          </button>
        </header>

        <div className="flex gap-3 mb-8">
          <button
            onClick={createDocument}
            className="rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 font-medium"
          >
            New Document
          </button>

          <label className="rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 cursor-pointer">
            Upload .txt or .md
            <input
              type="file"
              accept=".txt,.md"
              onChange={uploadFile}
              className="hidden"
            />
          </label>
        </div>

        {loading ? (
          <p className="text-slate-400">Loading documents...</p>
        ) : (
          <div className="space-y-10">
            <DocumentSection
              title="My Documents"
              documents={owned}
              emptyText="You have not created any documents yet."
              badge="Owner"
            />

            <DocumentSection
              title="Shared With Me"
              documents={shared}
              emptyText="No documents have been shared with you yet."
              badge="Shared"
            />
          </div>
        )}
      </div>
    </main>
  );
}

function DocumentSection({
  title,
  documents,
  emptyText,
  badge,
}: {
  title: string;
  documents: DocumentItem[];
  emptyText: string;
  badge: string;
}) {
  const router = useRouter();

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {documents.length === 0 ? (
        <p className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
          {emptyText}
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => router.push(`/documents/${doc.id}`)}
              className="text-left rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 p-5 transition"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-semibold text-lg">{doc.title}</h3>
                <span className="text-xs rounded-full bg-slate-700 px-2 py-1">
                  {badge}
                </span>
              </div>

              <p className="text-sm text-slate-400">Owner: {doc.owner.name}</p>
              <p className="text-xs text-slate-500 mt-2">
                Updated {new Date(doc.updatedAt).toLocaleString()}
              </p>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}