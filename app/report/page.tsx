"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ReportIssuePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Plumbing");
  const [priority, setPriority] = useState("Low");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Check login session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("issues").insert({
      title,
      description,
      category,
      priority,
      status: "reported",
      created_by: user.id,
    });

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Issue reported successfully!");
      setTitle("");
      setDescription("");
    }

    setLoading(false);
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Report an Issue</h1>

      <p className="mb-6 text-sm text-gray-600">
        {user ? "✅ Logged in" : "❌ Not logged in (go to home page and login)"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Issue title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          placeholder="Describe the issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          rows={4}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option>Plumbing</option>
          <option>Electrical</option>
          <option>Cleanliness</option>
          <option>Internet</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Emergency</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Issue"}
        </button>
      </form>
    </main>
  );
}
