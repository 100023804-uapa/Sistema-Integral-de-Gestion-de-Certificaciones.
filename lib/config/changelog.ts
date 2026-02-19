export const APP_VERSION = "0.4.0";

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
        version: "0.4.0",
        date: "2026-02-19",
        title: "Plantillas, PDF y Mejoras Visuales",
        description: "Integración completa de generación de PDFs con plantillas, mejoras significativas en la interfaz de usuario y corrección de errores de despliegue.",
        details: [
            { type: 'feature', text: 'Generación de PDF: Descarga de certificados con diseño dinámico (plantilla o defecto) y códigos QR.' },
            { type: 'feature', text: 'Gestión de Plantillas: Selección de diseño al crear nuevos certificados.' },
            { type: 'feature', text: 'Página "Sobre Nosotros": Nueva sección informativa del equipo.' },
            { type: 'improvement', text: 'Dashboard UI: Header rediseñado (Avatar y Notificaciones más grandes).' },
            { type: 'improvement', text: 'Perfil de Usuario: Carga y actualización de foto de perfil con feedback visual.' },
            { type: 'fix', text: 'Corrección de CORS en Firebase Storage para visualización de imágenes.' },
            { type: 'fix', text: 'Solución a error 404 en patrón de fondo (grid-pattern).' }
        ]
    },
    {
        version: "0.3.0",
        date: "2026-02-19",
        title: "Gestión Avanzada de Participantes y Consulta Pública",
        description: "Implementación completa de la consulta pública de certificados, gestión manual de participantes y herramientas de carga masiva.",
        details: [
            { type: 'feature', text: 'Consulta Pública: Nueva pantalla de búsqueda de certificados por Matrícula o Folio.' },
            { type: 'feature', text: 'Gestión de Participantes: Creación manual y edición de participantes.' },
            { type: 'feature', text: 'Plantillas de Carga Masiva: Descarga de plantillas Excel personalizadas para participantes y certificados.' },
            { type: 'improvement', text: 'Importación Inteligente: Detección automática de carga de certificados vs solo participantes.' },
            { type: 'improvement', text: 'UI Login: Rediseño enfocado en la consulta pública.' },
            { type: 'fix', text: 'Corrección en validación de tipos de usuario en login.' }
        ]
    },
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
