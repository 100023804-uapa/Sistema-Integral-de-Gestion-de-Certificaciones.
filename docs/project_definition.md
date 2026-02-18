# Informe de Proyecto: Sistema Integral de Gestión de Certificaciones (SIGCE)

**Fecha:** 18 de febrero de 2026  
**Asignatura:** Proyecto Integrador – sigce – Pasantía

## 1. Resumen Ejecutivo
El presente informe detalla la arquitectura, las especificaciones técnicas, el plan de trabajo por roles y la estrategia de continuidad para el desarrollo del **SIGCE**. El sistema permitirá la carga masiva de participantes, la generación de certificados con códigos QR de validación y la descarga instantánea desde un portal optimizado para dispositivos móviles (PWA). Se ha priorizado un modelo **Free‑First** para el MVP, utilizando servicios gratuitos que aseguren la entrega funcional para el **10 de abril de 2026**, al tiempo que se define un camino claro de migración hacia una infraestructura profesional y escalable.

## 2. Introducción
El objetivo del proyecto es crear una plataforma que automatice la emisión y validación de certificados para los programas de **Capacitación (CAP)** y **Profundo** de la sigce. La solución debe ser accesible desde cualquier dispositivo, garantizar la integridad de los datos y permitir un crecimiento futuro sin reescrituras mayores. 

Las fases iniciales (I y II) se enfocan en la construcción de un **Producto Mínimo Viable (MVP)** que cumpla con los requisitos funcionales básicos y demuestre la viabilidad técnica del sistema.

## 3. Arquitectura del MVP (Fase de Pasantía)
La arquitectura propuesta para el MVP está compuesta por componentes que operan bajo los planes gratuitos de sus respectivos proveedores.

| Componente | Propuesta Gratis (MVP) | Propuesta de Escalado (Paga/Empresarial) |
| :--- | :--- | :--- |
| **Hosting Frontend** | **Vercel / Netlify** – Despliegue de React como PWA (365 días). | **AWS Amplify / Azure Static Web Apps** – Mayor ancho de banda y cumplimiento corporativo. |
| **Base de Datos** | **Firebase Firestore (Spark Plan)** – 1 GB, 50k lecturas/día. Ideal para registro de folios. | **PostgreSQL (Supabase/Neon)** – Para consultas históricas complejas y relaciones. |
| **Almacenamiento** | **Firebase Storage** – Almacenamiento de PDF generados. | **Google Cloud Storage (Standard)** – Almacenamiento masivo, alta durabilidad. |
| **Generación PDF** | **React‑PDF (Client‑side)** – Generación en navegador (ahorro de servidor). | **Puppeteer en AWS Lambda** – Generación masiva en segundo plano. |
| **Envío de Correos** | **Resend / SendGrid** – Hasta 300 correos diarios gratis. | **Amazon SES** – Costo ultra bajo ($0.10/1k correos) para envíos ilimitados. |

## 4. Especificaciones Técnicas Detalladas

### 4.1 Seguridad y Validación
*   **Reglas de Firebase**: Escritura restringida al rol Admin. Lectura para participantes solo de sus propios registros (por cédula/matrícula).
*   **Código QR de Validación**: Cada certificado incluye un QR único que redirige a una ruta pública de la PWA para validar la autenticidad del documento.

### 4.2 Módulos Principales
1.  **Módulo Admin**:
    *   Carga masiva de participantes (CSV/Excel).
    *   Selección de plantillas (CAP/Profundo).
    *   Gestión de usuarios y permisos.
2.  **Módulo de Foliado**:
    *   Generador de folios únicos: `sigce-2026-CAP-0001`.
    *   Control de secuencias anti-duplicados.
3.  **Portal del Participante (PWA)**:
    *   Búsqueda optimizada para móviles.
    *   Visualización y descarga instantánea de PDF.
    *   Funcionalidad offline básica.

### 4.3 Clean Architecture
El código se estructurará en capas concéntricas para asegurar calidad y mantenibilidad:
1.  **Capa de Entidades (Domain)**: Reglas de negocio base (formatos, validaciones).
2.  **Capa de Casos de Uso (Use Cases)**: Orquestación de datos (`GenerarCertificadoMasivo`, `ValidarFolioQR`).
3.  **Capa de Adaptadores (Interface Adapters)**: Conversión de datos (Repositories).
4.  **Capa de Infraestructura**: Herramientas externas (Firebase, Vercel, PDF libs).

## 5. Requerimientos

### Funcionales (RF)
*   **RF1 Gestión de Plantillas**: Manejo de múltiples diseños por área.
*   **RF2 Procesamiento Masivo**: Generación automática batch.
*   **RF3 Foliado Persistente**: Folios únicos e inalterables.
*   **RF4 Portal Independiente**: Acceso 365 días para consulta.

### No Funcionales (RNF)
*   **RNF1 Independencia**: Lógica desacoplada de Firebase (migrable a SQL).
*   **RNF2 Seguridad**: Protección por capas de información sensible.
*   **RNF3 Testabilidad**: Módulos testeables por separado.

## 6. Plan de Trabajo por Roles

| Rol | Tarea Inmediata (MVP) | Responsabilidad Técnica |
| :--- | :--- | :--- |
| **Líder / Fullstack** | Configuración Firebase/Vercel. Integración global. | Coordinación, CI/CD, Calidad. |
| **Backend** | Diseño Firestore, Lógica de Foliado (`Use Cases`). | Seguridad, APIs, Reglas de acceso. |
| **Frontend / PWA** | Interfaz de búsqueda, Responsive Design. | Usabilidad, PWA features. |
| **Diseñador / UX** | Diseño de plantillas (CAP/Profundo). | Interfaces limpias, flujo intuitivo. |
| **Tester / Doc** | Pruebas de seguridad, Informe Final. | Documentación técnica, manuales. |

## 7. Plan de Implementación (Sprints)

### Sprint 1: Análisis y Core (Fases I y II)
*   [Líder] Definir interfaces de Repositorios (Domain).
*   [Backend] Implementar Firma de Facilitadores y Generación de Folios.
*   [UX/UI] Diseñar interfaces institucionales.

### Sprint 2: Desarrollo e Integración (Fases III y IV)
*   [Backend] Integrar Firebase Storage.
*   [Frontend] Módulos de consulta histórica con filtros.
*   [Tester] Pruebas funcionales y de seguridad.

### Sprint 3: Entrega y Documentación (Fases V y VI)
*   [Doc] Informe Final y Documentación Técnica.
*   [Equipo] Capacitación a personal CAP/Profundo.

## 8. Estrategia de Continuidad
El diseño desacoplado permite que una futura migración (ej. a servidores propios de sigce) solo requiera cambiar la capa de **Infraestructura** y **Adaptadores**, manteniendo intacta la **Lógica de Negocio** y el **Frontend**.
