"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";

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
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-purple-50 p-6"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-indigo-900">
          🎫 My Issues
        </h1>

        {loading && <p className="text-gray-600">Loading...</p>}

        {!loading && issues.length === 0 && (
          <p className="text-gray-500">No issues reported yet.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {issues.map((issue) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all border border-gray-100"
            >
              {/* Title + Status */}
              <div className="flex justify-between items-start mb-3">
                <h2 className="font-semibold text-lg text-gray-900">
                  {issue.title}
                </h2>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
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

              {/* Category + Priority */}
              <div className="flex items-center gap-2 mb-3 text-sm">
                <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 font-medium">
                  {issue.category}
                </span>

                <span
                  className={`px-2 py-1 rounded font-medium ${
                    issue.priority === "High" ||
                    issue.priority === "Emergency"
                      ? "bg-red-100 text-red-700"
                      : issue.priority === "Medium"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {issue.priority}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 leading-relaxed">
                {issue.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.main>
  );
}

