import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-10 h-10 text-yellow-500" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-gray-900">Página no encontrada</h2>
          <p className="text-gray-500">La ruta que buscas no existe o ha sido movida.</p>
        </div>

        <Link 
          href="/dashboard"
          className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <ArrowLeft size={20} /> Volver al Dashboard
        </Link>
      </div>
    </div>
  );
}
