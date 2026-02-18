import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Search, FileText, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function StudentPortal() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Navbar />
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--primary)]">Mis Certificaciones</h1>
          <p className="text-gray-500">Consulta y descarga tus documentos académicos.</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre del curso..."
                  className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                />
              </div>
              <Button className="bg-[var(--primary)]">Buscar</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              id: "SIGCE-2023-8492",
              title: "Diplomado en Ciberseguridad y Hacking Ético",
              date: "15 Oct, 2023",
              type: "Diplomado"
            },
            {
              id: "SIGCE-2023-1102",
              title: "Criminología Educativa y Prevención Escolar",
              date: "08 Oct, 2023",
              type: "Curso"
            }
          ].map((cert) => (
            <Card key={cert.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                    {cert.type}
                  </div>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {cert.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[var(--primary)] mb-2 leading-tight">
                  {cert.title}
                </h3>
                <p className="text-xs text-gray-500 mb-4">ID: {cert.id}</p>
                <Link href={`/verify/${cert.id}`}>
                  <Button variant="secondary" className="w-full gap-2">
                    <FileText className="h-4 w-4" />
                    Ver Detalles
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
