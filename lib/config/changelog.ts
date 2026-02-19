export const APP_VERSION = "1.0.0-beta.2";

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
        version: "1.0.0-beta.2",
        date: "2026-02-18",
        title: "Motor de Plantillas y Mejoras de UX",
        description: "Incorporación del editor visual de plantillas y mejoras en la navegación.",
        details: [
            { type: 'feature', text: 'Nuevo Editor Visual de Plantillas (Drag & Drop).' },
            { type: 'feature', text: 'Soporte para personalización de prefijos de folio.' },
            { type: 'feature', text: 'Vista detallada de certificados con generación de QR.' },
            { type: 'improvement', text: 'Nueva sección "Plantillas" en la barra lateral.' },
        ]
    },
    {
        version: "1.0.0-beta.1",
        date: "2026-02-15",
        title: "Lanzamiento Inicial",
        description: "Versión inicial de la plataforma SIGCE para gestión de certificados.",
        details: [
            { type: 'feature', text: 'Gestión de Certificados (Crear, Listar).' },
            { type: 'feature', text: 'Base de datos de Graduados.' },
            { type: 'feature', text: 'Autenticación segura para administradores.' },
        ]
    }
];
