"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, GitCommit, Calendar, Tag, CheckCircle2, ChevronRight } from 'lucide-react';
import { CHANGELOG } from '@/lib/config/changelog';

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
           <Link 
                href="/login" 
                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Volver
            </Link>
            <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-1.5 rounded-lg">
                    <GitCommit size={20} className="text-primary" />
                </div>
                <h1 className="font-bold text-lg tracking-tight">Novedades SIGCE</h1>
            </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
            {CHANGELOG.map((release, index) => (
                <div key={release.version} className="relative pl-8 sm:pl-0">
                    {/* Timeline Line */}
                    {index !== CHANGELOG.length - 1 && (
                        <div className="absolute left-8 top-16 bottom-0 w-px bg-gray-200 -ml-px sm:left-[11rem] md:left-[13rem] hidden sm:block" />
                    )}

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-12">
                        {/* Meta Column */}
                        <div className="flex-shrink-0 sm:w-32 md:w-40 text-left sm:text-right pt-1.5">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                                <Tag size={12} />
                                v{release.version}
                            </div>
                            <div className="mt-2 flex items-center sm:justify-end gap-1.5 text-xs text-gray-400 font-medium font-mono">
                                <Calendar size={12} />
                                {new Date(release.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden group hover:border-blue-200 hover:shadow-md transition-all">
                            <div className="p-6 md:p-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                    {release.title}
                                </h2>
                                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                                    {release.description}
                                </p>

                                <ul className="space-y-4">
                                    {release.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                                            <div className={`mt-0.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center border ${
                                                detail.type === 'feature' ? 'bg-green-50 border-green-200 text-green-600' :
                                                detail.type === 'fix' ? 'bg-red-50 border-red-200 text-red-600' :
                                                'bg-blue-50 border-blue-200 text-blue-600'
                                            }`}>
                                                {detail.type === 'feature' ? <CheckCircle2 size={10} strokeWidth={3} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                                            </div>
                                            <span className="leading-snug">
                                                {detail.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                             <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                                <span>Build {release.date.replace(/-/g, '')}.{index + 1}</span>
                                <span className="flex items-center gap-1">
                                    Ver cambios <ChevronRight size={12} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </main>

       <footer className="py-12 text-center text-sm text-gray-400">
            <p>Sistema Integral de Gestión de Certificaciones Educativas</p>
      </footer>
    </div>
  );
}
