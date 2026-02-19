'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, GraduationCap, Award, Search, BookOpen, AlertCircle } from 'lucide-react';
import { FirebaseCertificateRepository } from '@/lib/infrastructure/repositories/FirebaseCertificateRepository';
import { Certificate } from '@/lib/domain/entities/Certificate';

const certRepo = new FirebaseCertificateRepository();

interface ProgramStats {
    name: string;
    count: number;
    lastIssued: Date;
    students: Set<string>; // Set of student IDs to count unique students
    type: string; // 'CAP' or 'PROFUNDO' (takes the most frequent or latest)
}

export default function ProgramsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [programs, setPrograms] = useState<ProgramStats[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadPrograms();
    }, []);

    const loadPrograms = async () => {
        try {
            setLoading(true);
            // In a real scalability scenario, fetching ALL certificates is bad.
            // But for now (<1000 certs), it's the only way to aggregate without a dedicated collection.
            const allCerts = await certRepo.findAll();
            
            const statsMap = new Map<string, ProgramStats>();

            allCerts.forEach(cert => {
                const programName = cert.academicProgram?.trim();
                if (!programName) return;

                if (!statsMap.has(programName)) {
                    statsMap.set(programName, {
                        name: programName,
                        count: 0,
                        lastIssued: new Date(0), // Epoch
                        students: new Set(),
                        type: cert.type
                    });
                }

                const stats = statsMap.get(programName)!;
                stats.count++;
                stats.students.add(cert.studentId);
                
                // Keep track of latest issue date
                if (cert.issueDate > stats.lastIssued) {
                    stats.lastIssued = cert.issueDate;
                }
            });

            // Convert to array and sort by count desc
            const programsArray = Array.from(statsMap.values()).sort((a, b) => b.count - a.count);
            setPrograms(programsArray);

        } catch (error) {
            console.error("Error loading programs:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPrograms = programs.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="px-4 py-8 md:px-8 md:py-12 space-y-8 animate-in fade-in zoom-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-primary tracking-tighter flex items-center gap-3">
                    <BookOpen className="w-8 h-8" />
                    Programas Académicos
                </h1>
                <p className="text-gray-500 mt-2">
                    Vista general de todos los programas impartidos y sus estadísticas.
                </p>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 max-w-md">
                <Search className="text-gray-400 w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="Buscar programa..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400"
                />
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex flex-col items-center justify-center h-64">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                    <p className="text-gray-500">Analizando programas...</p>
                </div>
            ) : filteredPrograms.length === 0 ? (
                <div className="text-center p-12 bg-white rounded-3xl border border-dashed border-gray-200">
                    <div className="bg-gray-50 p-6 rounded-full inline-block mb-4">
                        <AlertCircle className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">No se encontraron programas</h3>
                    <p className="text-gray-500 mt-1">Intenta emitir un certificado para registrar un nuevo programa.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPrograms.map((program) => (
                        <div key={program.name} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <GraduationCap size={100} />
                            </div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-2xl ${
                                        program.type === 'PROFUNDO' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                        <Award size={24} />
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                                        {program.type}
                                    </span>
                                </div>
                                
                                <h3 className="font-bold text-gray-800 text-lg mb-2 leading-tight">
                                    {program.name}
                                </h3>

                                <div className="flex items-center gap-4 mt-6 text-sm">
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-xs font-medium uppercase">Certificados</span>
                                        <span className="font-black text-2xl text-primary">{program.count}</span>
                                    </div>
                                    <div className="w-px h-8 bg-gray-100"></div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-xs font-medium uppercase">Estudiantes</span>
                                        <span className="font-bold text-xl text-gray-700">{program.students.size}</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-400">
                                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                    Última emisión: {program.lastIssued.toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
