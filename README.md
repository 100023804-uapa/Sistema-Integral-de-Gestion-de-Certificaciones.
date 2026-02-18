# SIGCE - Sistema Integral de Gestión de Certificaciones

![SIGCE Banner](/image.png)

## Documentación del Proyecto

Este repositorio contiene el código fuente y la documentación para el **Proyecto Integrador (UAPA - Pasantía)**.

📂 **[Ver Informe de Proyecto Detallado](./docs/project_definition.md)**  
Consulte este documento para detalles sobre la arquitectura, especificaciones técnicas, roles y cronograma.

📂 **[Ver Sistema de Diseño](./design_system.md)**  
Guía de estilos, componentes y principios visuales.

## Visión General

**SIGCE** es una plataforma moderna para la gestión, emisión y verificación de certificados académicos.

### Características Principales

*   **Gestión Administrativa**: Carga masiva y gestión de certificados.
*   **Portal del Estudiante (PWA)**: Acceso seguro y descarga de historial.
*   **Sistema de Verificación**: Validación pública mediante códigos QR.
*   **Arquitectura Limpia**: Diseño desacoplado para fácil migración y mantenimiento.

## Stack Tecnológico (MVP Free-First)

*   **Frontend**: Next.js 15 (React) + Tailwind CSS v4.
*   **Backend / DB**: Firebase (Auth, Firestore, Storage).
*   **Despliegue**: Vercel.
*   **Generación PDF**: React-PDF (Client-side).

## Guía de Instalación

1.  **Clonar**: `git clone ...`
2.  **Instalar**: `pnpm install`
3.  **Configurar**: Copiar `.env.example` a `.env.local`
4.  **Ejecutar**: `pnpm dev`

---
Desarrollado para UAPA - 2026.
