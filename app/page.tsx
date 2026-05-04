"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function HomePage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    }

    loadUsers();
  }, []);

  function selectUser(user: User) {
    localStorage.setItem("minidocs:user", JSON.stringify(user));
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-xl">
        <p className="text-sm text-blue-300 font-medium mb-2">Ajaia Assessment Demo</p>
        <h1 className="text-4xl font-bold mb-3">MiniDocs</h1>
        <p className="text-slate-300 mb-8">
          A lightweight collaborative document editor with rich-text editing,
          file upload, persistence, and simple sharing.
        </p>

        <h2 className="text-lg font-semibold mb-4">Select a demo user</h2>

        {loading ? (
          <p className="text-slate-400">Loading users...</p>
        ) : (
          <div className="space-y-3">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => selectUser(user)}
                className="w-full text-left rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 p-4 transition"
              >
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-slate-400">{user.email}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}