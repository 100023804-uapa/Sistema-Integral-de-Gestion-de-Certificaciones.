import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-accent text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span>SIGCE</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-primary font-semibold hover:bg-gray-100">
              Ingresar
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
