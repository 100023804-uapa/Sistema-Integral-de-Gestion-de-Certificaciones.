import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { QrCode, Search } from 'lucide-react';
import Link from 'next/link';

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Navbar />
      <main className="flex-1 container max-w-md mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--primary)] mb-2">Validación de Certificados</h1>
          <p className="text-gray-500">Ingrese el código del certificado o escanee el código QR para verificar su autenticidad.</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">Validar Documento</CardTitle>
            <CardDescription className="text-center">
              Introduzca el ID único del certificado (ej. SIGCE-2023-XXXX)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por ID de Certificado..."
                className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
              />
            </div>
            <Button className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/90">
              Verificar
            </Button>
            
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase">O escanear</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <Button variant="secondary" className="w-full gap-2">
              <QrCode className="h-5 w-5" />
              Escanear Código QR
            </Button>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            ¿Tienes problemas para validar? <Link href="/contact" className="text-[var(--accent)] font-medium hover:underline">Contáctanos</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
