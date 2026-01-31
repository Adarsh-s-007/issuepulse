"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAccess, setCheckingAccess] = useState(true);

  useEffect(() => {
    async function initAdminPage() {
      
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first");
        window.location.href = "/";
        return;
      }

      
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError || profile?.role !== "admin") {
        alert("Access denied. Admins only.");
        window.location.href = "/";
        return;
      }

      
      const { data, error } = await supabase
        .from("issues")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setIssues(data);
      }

      setCheckingAccess(false);
      setLoading(false);
    }

    initAdminPage();
  }, []);

  async function updateStatus(issueId: string, newStatus: string) {
    const { error } = await supabase
      .from("issues")
      .update({ status: newStatus })
      .eq("id", issueId);

    if (!error) {
      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === issueId ? { ...issue, status: newStatus } : issue
        )
      );
    } else {
      alert("Failed to update status");
    }
  }

  if (checkingAccess) {
    return (
      <main className="max-w-5xl mx-auto p-6">
        <p>Checking admin access...</p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {loading && <p>Loading issues...</p>}

      {!loading && issues.length === 0 && (
        <p className="text-gray-500">No issues found.</p>
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
