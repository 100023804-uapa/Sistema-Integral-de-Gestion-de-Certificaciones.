"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Users, Shield, Loader2, Plus, Trash2, Mail } from 'lucide-react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { AccessUser, FirebaseAccessRepository } from '@/lib/infrastructure/repositories/FirebaseAccessRepository';

export default function UsersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const accessRepo = useMemo(() => new FirebaseAccessRepository(), []);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [admins, setAdmins] = useState<AccessUser[]>([]);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const loadAdmins = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await accessRepo.listAdmins();
      setAdmins(data);
    } catch (err) {
      console.error('Error loading access users:', err);
      setError('No se pudo cargar la lista de administradores.');
    } finally {
      setLoading(false);
    }
  }, [accessRepo]);

  useEffect(() => {
    void loadAdmins();
  }, [loadAdmins]);

  const handleAddAdmin = async () => {
    const normalized = email.trim().toLowerCase();
    if (!normalized || !normalized.includes('@')) {
      setError('Ingresa un correo valido.');
      return;
    }

    if (!user) {
      setError('Sesion no valida. Inicia sesion de nuevo.');
      return;
    }

    try {
      setSaving(true);
      setError('');
      await accessRepo.upsertAdmin(normalized, user.uid);
      setEmail('');
      await loadAdmins();
    } catch (err) {
      console.error('Error adding admin:', err);
      setError('No se pudo registrar el administrador.');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveAdmin = async (targetEmail: string) => {
    if (!user) {
      setError('Sesion no valida. Inicia sesion de nuevo.');
      return;
    }

    if (admins.length <= 1) {
      setError('Debe existir al menos un administrador en el sistema.');
      return;
    }

    if (targetEmail.toLowerCase() === user.email?.toLowerCase()) {
      setError('No puedes eliminar tu propio acceso desde esta pantalla.');
      return;
    }

    if (!confirm(`Eliminar acceso administrador de ${targetEmail}?`)) return;

    try {
      setSaving(true);
      setError('');
      await accessRepo.removeAdmin(targetEmail);
      await loadAdmins();
    } catch (err) {
      console.error('Error removing admin:', err);
      setError('No se pudo eliminar el administrador.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-3xl font-black text-primary tracking-tighter">Gestion de Usuarios</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Shield size={20} className="text-primary" /> Acceso Administrativo (MVP)
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Lista de correos con permiso para entrar al dashboard.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              <input
                type="email"
                placeholder="admin@institucion.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              onClick={handleAddAdmin}
              disabled={saving}
              className="px-4 py-2.5 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center gap-2"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Agregar
            </button>
          </div>
        </div>

        {error && (
          <div className="mx-8 mt-6 p-3 bg-red-50 text-red-700 rounded-xl border border-red-100 text-sm">
            {error}
          </div>
        )}

        <div className="p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-gray-500">Cargando administradores...</p>
            </div>
          ) : admins.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <Users className="w-12 h-12 text-gray-300" />
              <p className="text-gray-500">No hay administradores registrados.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Correo</th>
                    <th className="px-4 py-3 font-semibold">Rol</th>
                    <th className="px-4 py-3 font-semibold">Registro</th>
                    <th className="px-4 py-3 font-semibold text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {admins.map((admin) => (
                    <tr key={admin.id}>
                      <td className="px-4 py-3 font-medium text-gray-800">{admin.email}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-bold bg-blue-100 text-blue-700">
                          {admin.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {admin.createdAt ? admin.createdAt.toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleRemoveAdmin(admin.email)}
                          disabled={saving || admin.email.toLowerCase() === user?.email?.toLowerCase()}
                          className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 disabled:text-gray-300"
                        >
                          <Trash2 className="h-4 w-4" /> Quitar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
