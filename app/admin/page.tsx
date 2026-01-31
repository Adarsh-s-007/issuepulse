"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllIssues() {
      const { data, error } = await supabase
        .from("issues")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setIssues(data);
      }

      setLoading(false);
    }

    fetchAllIssues();
  }, []);

  async function updateStatus(issueId: string, newStatus: string) {
    await supabase
      .from("issues")
      .update({ status: newStatus })
      .eq("id", issueId);

    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === issueId ? { ...issue, status: newStatus } : issue
      )
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {loading && <p>Loading issues...</p>}

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

            <select
              value={issue.status}
              onChange={(e) => updateStatus(issue.id, e.target.value)}
              className="border p-1 rounded"
            >
              <option value="reported">Reported</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        ))}
      </div>
    </main>
  );
}
