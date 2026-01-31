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
  <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-purple-900">
        🛠️ Admin Dashboard
      </h1>

      {loading && <p className="text-gray-600">Loading issues...</p>}

      {!loading && issues.length === 0 && (
        <p className="text-gray-500">No issues found.</p>
      )}

      <div className="space-y-5">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Left side */}
              <div>
                <h2 className="font-semibold text-lg text-gray-900">
                  {issue.title}
                </h2>

                <p className="text-sm text-gray-600 mt-1">
                  {issue.category} • Priority:{" "}
                  <span
                    className={`font-medium ${
                      issue.priority === "High" || issue.priority === "Emergency"
                        ? "text-red-600"
                        : issue.priority === "Medium"
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {issue.priority}
                  </span>
                </p>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    issue.status === "reported"
                      ? "bg-yellow-100 text-yellow-800"
                      : issue.status === "assigned"
                      ? "bg-purple-100 text-purple-800"
                      : issue.status === "in_progress"
                      ? "bg-blue-100 text-blue-800"
                      : issue.status === "resolved"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {issue.status.replace("_", " ")}
                </span>

                <select
                  value={issue.status}
                  onChange={(e) =>
                    updateStatus(issue.id, e.target.value)
                  }
                  className="border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="reported">Reported</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </main>
);

}
