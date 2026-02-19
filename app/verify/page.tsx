import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Search, ChevronRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { consultCertificates } from '@/app/actions/consult-certificates';

interface PageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function VerifyPage({ searchParams }: PageProps) {
  const { query } = await searchParams;

  // If no query, just show the search UI (or redirect back to home? user might land here directly).
  // Let's keep a basic search UI here too.
  
  let results = null;
  let error = null;

  if (query) {
    const response = await consultCertificates(query);
    if (response.success) {
      results = response.data;
    } else {
      error = response.error;
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-12">
        
        {/* Header / Search Bar Context */}
        <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-[var(--primary)] mb-4">Resultados de Búsqueda</h1>
            <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
                Consulta pública de certificaciones académicas. Ingrese el folio o matrícula para verificar la autenticidad de los documentos.
            </p>
            
            {/* Simple Search Bar Reuse for Context */}
            <form action="/verify" method="GET" className="max-w-lg mx-auto relative group">
                <Search className="absolute left-4 top-3.5 text-gray-400 h-5 w-5" />
                <input 
                    name="query"
                    defaultValue={query}
                    type="text" 
                    placeholder="Matrícula o Folio..." 
                    className="w-full pl-12 pr-32 h-12 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition-all"
                />
                <Button type="submit" className="absolute right-1 top-1 bottom-1 bg-[var(--accent)] hover:bg-[#ff9000] text-white px-4 rounded-lg text-sm font-bold">
                    Buscar
                </Button>
            </form>
        </div>

        {/* Results Section */}
        {query ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {error ? (
                     <div className="max-w-lg mx-auto p-6 bg-red-50 border border-red-100 rounded-2xl flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <AlertCircle className="h-6 w-6 text-red-500" />
                        </div>
                        <h3 className="text-lg font-bold text-red-800 mb-2">No se encontraron resultados</h3>
                        <p className="text-red-600/80">{error}</p>
                        <Link href="/">
                            <Button variant="link" className="text-red-700 mt-2">Volver al inicio</Button>
                        </Link>
                     </div>
                ) : results && results.length > 0 ? (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">
                                Certificados Encontrados ({results.length})
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {results.map((cert) => (
                                <Link href={`/verify/${cert.id}`} key={cert.id} className="block group">
                                    <Card className="h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--accent)] group-hover:w-2 transition-all"></div>
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="bg-blue-50 text-[var(--primary)] px-3 py-1 rounded-full text-xs font-mono font-bold">
                                                    {cert.folio}
                                                </div>
                                                <div className={`px-2 py-1 rounded text-xs font-bold uppercase ${cert.status === 'valid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {cert.status === 'valid' ? 'VIGENTE' : 'INVÁLIDO'}
                                                </div>
                                            </div>

                                            <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                                                {cert.courseName}
                                            </h3>
                                            
                                            <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                                                <span className="font-medium text-gray-700">Estudiante:</span> {cert.studentName}
                                            </p>

                                            <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-sm text-gray-400">
                                                <span>Emitido: {new Date(cert.issueDate).toLocaleDateString()}</span>
                                                <div className="flex items-center text-[var(--accent)] font-bold group-hover:translate-x-1 transition-transform">
                                                    Ver Detalle <ChevronRight className="h-4 w-4 ml-1" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No hay resultados para mostrar.</p>
                    </div>
                )}
            </div>
        ) : (
            <div className="text-center py-12 opacity-50">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-lg text-gray-400">Ingrese un término de búsqueda para comenzar</p>
            </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
