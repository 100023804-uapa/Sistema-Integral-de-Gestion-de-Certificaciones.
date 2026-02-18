"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, QrCode, CheckCircle, XCircle } from 'lucide-react';

export default function ValidatePage() {
  const router = useRouter();
  const [folio, setFolio] = useState('');
  const [status, setStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation
    if (folio.length > 5) {
        setStatus('valid');
    } else {
        setStatus('invalid');
    }
  };

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-3xl font-black text-primary tracking-tighter">Validar Folio</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
        <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Ingrese Folio o UUID</label>
                <div className="relative">
                    <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                    <input 
                        type="text" 
                        value={folio}
                        onChange={(e) => setFolio(e.target.value)}
                        placeholder="Ej. SIGCE-2024-XXXX"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
                    />
                </div>
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                <QrCode size={20} /> Verificar Ahora
            </button>
        </form>

        {status === 'valid' && (
            <div className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-100 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4">
                <CheckCircle className="w-8 h-8 text-green-600 shrink-0" />
                <div>
                    <h3 className="font-bold text-green-800 text-lg">Certificado Válido</h3>
                    <p className="text-green-700">El folio <strong>{folio}</strong> corresponde a un documento oficial emitido por SIGCE.</p>
                </div>
            </div>
        )}

        {status === 'invalid' && (
            <div className="mt-8 p-6 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4">
                <XCircle className="w-8 h-8 text-red-600 shrink-0" />
                <div>
                    <h3 className="font-bold text-red-800 text-lg">Certificado No Encontrado</h3>
                    <p className="text-red-700">El folio <strong>{folio}</strong> no existe en nuestros registros. Verifique la información.</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
