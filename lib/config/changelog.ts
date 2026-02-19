export const APP_VERSION = "0.2.0";

export interface Release {
    version: string;
    date: string;
    title: string;
    description: string;
    details: {
        type: 'feature' | 'fix' | 'improvement';
        text: string;
    }[];
}

export const CHANGELOG: Release[] = [
    {
        version: "0.2.0",
        date: "2026-02-18",
        title: "Mejoras de UX y Correcciones",
        description: "Optimización del editor de plantillas, corrección de estilos y resolución de errores de compilación.",
        details: [
            { type: 'feature', text: 'Mejora en precisión Drag & Drop para editor de plantillas.' },
            { type: 'improvement', text: 'Estandarización de estilos en configuración de prefijos.' },
            { type: 'fix', text: 'Resolución de errores de compilación en Next.js 15 (Params y Tipos).' },
            { type: 'fix', text: 'Corrección en validación de certificados por folio.' },
            { type: 'improvement', text: 'Nueva modal de historial de cambios y versiones.' },
            { type: 'feature', text: 'Indicador de estado en botón "Nuevo Estudiante".' }
        ]
    },
    {
        version: "0.1.0",
        date: "2026-02-15",
        title: "Lanzamiento Inicial",
        description: "Versión inicial de la plataforma SIGCE para gestión de certificados.",
        details: [
            { type: 'feature', text: 'Gestión de Certificados (Crear, Listar).' },
            { type: 'feature', text: 'Base de datos de Graduados.' },
            { type: 'feature', text: 'Autenticación con Firebase y Roles.' },
            { type: 'feature', text: 'Dashboard con estadísticas en tiempo real.' },
        ]
    }
];
