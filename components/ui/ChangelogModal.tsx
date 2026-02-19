import React from 'react';
import { X, GitCommit, Calendar, Tag, Sparkles, Wrench, ArrowUpCircle } from 'lucide-react';
import { APP_VERSION, CHANGELOG } from '@/lib/config/changelog';

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangelogModal({ isOpen, onClose }: ChangelogModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <GitCommit className="text-primary" /> Novedades y Cambios
            </h2>
            <p className="text-sm text-gray-500">Historial de actualizaciones de la plataforma</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-8">
          {CHANGELOG.map((release, index) => (
            <div key={release.version} className="relative pl-8 border-l-2 border-gray-100 last:border-l-0">
              {/* Timeline Dot */}
              <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${
                index === 0 ? 'bg-primary border-primary' : 'bg-white border-gray-300'
              }`}></div>
              
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        index === 0 ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'
                    }`}>
                        v{release.version}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar size={12} /> {release.date}
                    </span>
                </div>
                {index === 0 && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        Actual
                    </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-800">{release.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{release.description}</p>
              
              <div className="space-y-2">
                {release.details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className={`mt-0.5 p-1 rounded-full flex-shrink-0 ${
                        detail.type === 'feature' ? 'bg-purple-100 text-purple-600' :
                        detail.type === 'fix' ? 'bg-red-100 text-red-600' :
                        'bg-blue-100 text-blue-600'
                    }`}>
                        {detail.type === 'feature' && <Sparkles size={10} />}
                        {detail.type === 'fix' && <Wrench size={10} />}
                        {detail.type === 'improvement' && <ArrowUpCircle size={10} />}
                    </span>
                    <span>{detail.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-center text-xs text-gray-400">
            SIGCE v{APP_VERSION} &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
