import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {/* Colorful Navbar */}
        <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-wide text-white"
            >
              ISSUE<span className="text-yellow-300">PULSE</span>
            </Link>

            {/* Nav links */}
            <div className="space-x-6 text-sm font-semibold">
              <Link
                href="/report"
                className="text-white/90 hover:text-white transition"
              >
                Report Issue
              </Link>
              <Link
                href="/my-issues"
                className="text-white/90 hover:text-white transition"
              >
                My Issues
              </Link>
              <Link
                href="/admin"
                className="text-white/90 hover:text-white transition"
              >
                Admin
              </Link>
            </div>
          </div>
        </nav>

        {/* Page content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
