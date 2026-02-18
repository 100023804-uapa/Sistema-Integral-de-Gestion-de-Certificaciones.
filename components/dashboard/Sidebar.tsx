"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  GraduationCap
} from 'lucide-react';

const menuItems = [
  { label: 'Resumen', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Certificados', icon: FileText, href: '/dashboard/certificates' },
  { label: 'Graduados', icon: Users, href: '/dashboard/graduates' },
  { label: 'Configuración', icon: Settings, href: '/dashboard/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col h-screen w-64 bg-primary text-white sticky top-0 border-r border-white/5 shadow-2xl">
      <div className="p-8 flex items-center gap-3">
        <div className="bg-accent p-2 rounded-xl">
          <GraduationCap size={24} />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl leading-none">SIGCE</span>
          <span className="text-[10px] text-blue-200 uppercase tracking-widest mt-1">Admin Panel</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-8 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-accent text-white shadow-lg shadow-orange-500/20" 
                  : "text-blue-100 hover:bg-white/5"
              )}
            >
              <Icon size={20} className={cn(
                "transition-colors",
                isActive ? "text-white" : "group-hover:text-accent"
              )} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-white/5">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-blue-200 hover:text-white transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}
