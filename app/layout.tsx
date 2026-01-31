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
        {/* Navbar */}
        <nav className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              IssuePulse
            </Link>

            <div className="space-x-6 text-sm font-medium">
              <Link href="/report" className="hover:text-black text-gray-600">
                Report Issue
              </Link>
              <Link href="/my-issues" className="hover:text-black text-gray-600">
                My Issues
              </Link>
              <Link href="/admin" className="hover:text-black text-gray-600">
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
