import Link from 'next/link';
import { GraduationCap, LayoutDashboard, FileText, Users, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-white md:flex">
        <div className="flex h-16 items-center gap-2 border-b px-6 font-bold text-xl text-[var(--primary)]">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-[var(--accent)] text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span>SIGCE Admin</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 rounded-lg bg-[var(--primary)]/10 px-3 py-2 text-[var(--primary)] font-medium"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/admin/certificates"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-[var(--primary)] font-medium transition-colors"
          >
            <FileText className="h-5 w-5" />
            Certificados
          </Link>
          <Link
            href="/admin/students"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-[var(--primary)] font-medium transition-colors"
          >
            <Users className="h-5 w-5" />
            Participantes
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-[var(--primary)] font-medium transition-colors"
          >
            <Settings className="h-5 w-5" />
            Configuración
          </Link>
        </nav>
        <div className="border-t p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 font-medium transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Cerrar Sesión
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 md:hidden">
          <div className="flex items-center gap-2 font-bold text-xl text-[var(--primary)]">
            <GraduationCap className="h-6 w-6 text-[var(--accent)]" />
            <span>SIGCE</span>
          </div>
        </header>
        <div className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
