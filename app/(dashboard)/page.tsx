"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  CheckCircle, 
  PlusCircle, 
  QrCode, 
  BarChart3, 
  Users, 
  Bell,
  AlertCircle,
  Printer,
  Loader2
} from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { QuickAction } from '@/components/dashboard/QuickAction';
import { ActivityList, ActivityItem } from '@/components/dashboard/ActivityList';
import { Avatar } from '@/components/ui/Avatar';
import { GetDashboardStats, DashboardStats } from '@/lib/application/use-cases/GetDashboardStats';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const useCase = new GetDashboardStats();
      const data = await useCase.execute();
      setStats(data);
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 space-y-10">
      
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 font-medium mb-1">Bienvenido de nuevo,</p>
          <h1 className="text-3xl md:text-5xl font-black text-primary tracking-tighter">
            Admin UAPA
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2.5 rounded-full bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-accent transition-colors">
            <Bell size={24} />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          <Avatar 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" 
            fallback="AD" 
            status="online"
            className="h-12 w-12 border-2 border-accent/20"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatsCard 
            variant="primary"
            title="Certificados Emitidos"
            value={stats?.totalIssued.toLocaleString() || '0'}
            icon={CheckCircle}
            trend="+12% este mes"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatsCard 
            title="Pendientes de Validación"
            value={stats?.pendingValidation || '0'}
            icon={FileText}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatsCard 
            title="Programas Activos"
            value={stats?.activePrograms || '0'}
            icon={BarChart3}
          />
        </motion.div>
      </div>

      {/* Quick Actions */}
      <section className="space-y-6">
        <h2 className="text-xl font-black text-primary uppercase tracking-wider italic">
          Acciones Rápidas
        </h2>
        <div className="flex flex-wrap gap-4 md:gap-8 justify-between">
          <QuickAction label="Nuevo Certificado" icon={PlusCircle} />
          <QuickAction label="Validar QR" icon={QrCode} />
          <QuickAction label="Ver Reportes" icon={BarChart3} />
          <QuickAction label="Gestión Usuarios" icon={Users} />
          {/* TEMP: Botón para sembrar datos */}
          <button 
            onClick={async () => {
              const { seedDatabase } = await import('@/lib/utils/seed');
              await seedDatabase();
              window.location.reload();
            }}
            className="text-xs text-gray-400 hover:text-accent underline"
          >
            [DEV] Seed DB
          </button>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="space-y-6 pb-12">
        <div className="flex justify-between items-center px-2">
          <h2 className="text-xl font-black text-primary uppercase tracking-wider italic">
            Actividad Reciente
          </h2>
          <button className="text-[var(--color-accent)] font-bold hover:underline">
            Ver todo
          </button>
        </div>
        
        {stats?.recentActivity && stats.recentActivity.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Convert generic activity to ActivityItem if needed or ensure interface match */}
            <ActivityList activities={stats.recentActivity as any} />
          </motion.div>
        ) : (
          <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-gray-200">
             <p className="text-gray-400">No hay actividad reciente registrada.</p>
          </div>
        )}
      </section>

    </div>
  );
}
