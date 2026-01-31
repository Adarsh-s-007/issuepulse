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
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Issues</h1>

      {loading && <p>Loading...</p>}

      {!loading && issues.length === 0 && (
        <p className="text-gray-500">No issues reported yet.</p>
      )}

      <div className="space-y-4">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{issue.title}</h2>
              <p className="text-sm text-gray-600">
                {issue.category} • {issue.priority}
              </p>
            </div>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded">
              {issue.status}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
