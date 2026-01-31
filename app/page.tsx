"use client";
import { signUp, signIn, signOut } from "@/services/auth"


export default function Home() {
  async function handleSignup() {
    await signUp("testuser@gmail.com", "password123");
    alert("Signup attempted – check Supabase users");
  }

  async function handleLogin() {
    await signIn("testuser@gmail.com", "password123");
    alert("Login attempted");
  }

  async function handleLogout() {
    await signOut();
    alert("Logged out");
  }

  return (
    <main className="p-10 space-y-4">
      <h1 className="text-2xl font-bold">IssuePulse Auth Test</h1>

      <button onClick={handleSignup}>Test Signup</button>
      <button onClick={handleLogin}>Test Login</button>
      <button onClick={handleLogout}>Test Logout</button>
    </main>
  );
}
