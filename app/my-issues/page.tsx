"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function MyIssuesPage() {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIssues() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("issues")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setIssues(data);
      }

      setLoading(false);
    }

    fetchIssues();
  }, []);

  return (
  <main className="max-w-5xl mx-auto p-6">
    <h1 className="text-2xl font-bold mb-6">My Issues</h1>

    {loading && <p>Loading...</p>}

    {!loading && issues.length === 0 && (
      <p className="text-gray-500">No issues reported yet.</p>
    )}

    <div className="grid gap-4 sm:grid-cols-2">
      {issues.map((issue) => (
        <div
          key={issue.id}
          className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-start mb-2">
            <h2 className="font-semibold text-lg">{issue.title}</h2>

            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                issue.status === "reported"
                  ? "bg-yellow-100 text-yellow-800"
                  : issue.status === "in_progress"
                  ? "bg-blue-100 text-blue-800"
                  : issue.status === "resolved"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {issue.status.replace("_", " ")}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-3">
            {issue.category} • Priority: {issue.priority}
          </p>

          <p className="text-sm text-gray-700">
            {issue.description}
          </p>
        </div>
      ))}
    </div>
  </main>
);

}
