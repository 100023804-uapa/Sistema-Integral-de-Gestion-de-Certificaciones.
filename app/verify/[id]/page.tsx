import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { CheckCircle, Download, Share2, Calendar, Clock, Award } from 'lucide-react';
import { MockCertificateRepository } from '@/lib/infrastructure/repositories/MockCertificateRepository';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CertificateDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const repository = new MockCertificateRepository();
  const certificate = await repository.findById(id);

  if (!certificate) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Navbar />
      <main className="flex-1 container max-w-3xl mx-auto px-4 py-8">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm font-bold text-green-700 uppercase tracking-wider">Certificado Validado</span>
          </div>
        </div>

        <Card className="overflow-hidden border-none shadow-lg mb-8">
          <div className="relative bg-white p-8 md:p-12 text-center border-b border-gray-100">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--primary)]/10 to-transparent rounded-bl-full"></div>
            
            <div className="flex justify-center mb-6">
               {/* Placeholder for Logo */}
               <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xs">Logo UAPA</div>
            </div>

            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">Certifica que</p>
              <h1 className="font-display text-3xl md:text-4xl text-[var(--primary)] font-bold leading-tight">
                {certificate.studentName}
              </h1>
              <div className="w-20 h-1 bg-[var(--accent)] rounded-full mx-auto my-4"></div>
              <p className="text-sm text-gray-600 leading-relaxed max-w-lg mx-auto">
                Ha completado satisfactoriamente los requisitos académicos del programa de educación continuada:
              </p>
              <h2 className="font-display text-xl md:text-2xl text-[var(--primary)] font-semibold px-4 leading-tight">
                {certificate.courseName}
              </h2>
              <p className="text-xs text-gray-500 mt-4">
                Otorgado en Santiago de los Caballeros, República Dominicana<br />
                el día <span className="font-bold text-gray-700">{certificate.issueDate.toLocaleDateString('es-DO', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 flex justify-between items-end">
              <div className="text-left">
                <p className="text-[10px] text-gray-400 uppercase">ID del Certificado</p>
                <p className="text-xs font-mono text-gray-600 font-medium">{certificate.id}</p>
              </div>
              {/* QR Code Placeholder */}
              <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-400">QR</div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide ml-1">Metadatos del Curso</h3>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Fecha de Emisión</p>
                      <p className="text-sm font-medium text-[var(--primary)]">
                        {certificate.issueDate.toLocaleDateString('es-DO', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duración</p>
                      <p className="text-sm font-medium text-[var(--primary)]">120 Horas</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Modalidad</p>
                      <p className="text-sm font-medium text-[var(--primary)]">Virtual</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex flex-col gap-3 sticky bottom-4 z-10">
          <Button className="w-full bg-[var(--accent)] hover:bg-[var(--accent)]/90 h-12 text-base shadow-lg">
            <Download className="mr-2 h-5 w-5" />
            Descargar PDF Original
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" className="w-full">
              <Share2 className="mr-2 h-4 w-4" />
              Compartir
            </Button>
            <Button variant="secondary" className="w-full">
              Enviar por Email
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
