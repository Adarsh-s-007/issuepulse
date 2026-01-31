"use client";

import { supabase } from "@/lib/supabaseClient";

const TEST_EMAIL = "student2@test.com";

const TEST_PASSWORD = "password123";

export default function HomePage() {
  async function handleSignup() {
    const { error } = await supabase.auth.signUp({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });

    if (error) {
      alert("Signup error: " + error.message);
    } else {
      alert("Signup successful (or user already exists). Now login.");
    }
  }

  async function handleLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });

    if (error) {
      alert("Login error: " + error.message);
    } else {
      alert("Login successful!");
      console.log("SESSION:", data.session);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    alert("Logged out");
  }

  return (
    <main className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">IssuePulse Auth Test</h1>

      <p className="text-sm text-gray-600">
        Test user: <b>{TEST_EMAIL}</b>
      </p>

      <button
        onClick={handleSignup}
        className="w-full bg-black text-white p-2 rounded"
      >
        Test Signup
      </button>

      <button
        onClick={handleLogin}
        className="w-full bg-black text-white p-2 rounded"
      >
        Test Login
      </button>

      <button
        onClick={handleLogout}
        className="w-full bg-gray-300 p-2 rounded"
      >
        Test Logout
      </button>

      <p className="text-sm text-gray-500">
        After login, go to <code>/report</code>
      </p>
    </main>
  );
}
