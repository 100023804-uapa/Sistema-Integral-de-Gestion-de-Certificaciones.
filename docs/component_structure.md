# Estructura de Componentes y Directorios - SIGCE

Este documento complementa el plan de implementación definiendo la organización exacta de los componentes y módulos a desarrollar, priorizando la estructura **Clean Architecture** y el diseño visual aprobado.

## 1. Estructura de Directorios (`src/` o raíz)

```
/app
  /(public)           # Landing Page, Login, Verificación Pública
    /page.tsx
    /login/page.tsx
    /verify/page.tsx
  /(dashboard)        # Rutas protegidas del Admin
    /layout.tsx       # Layout con Sidebar/BottomNav
    /page.tsx         # Dashboard Home (Resumen)
    /certificates/    # Gestión de Certificados
    /analytics/       # Reportes Detallados
    /users/           # Gestión de Usuarios
    /settings/        # Configuración

/components
  /ui                 # Componentes Base (Átomos)
    /Button.tsx
    /Card.tsx
    /Input.tsx
    /Badge.tsx        # Nuevo: Para estados y porcentajes
    /Avatar.tsx       # Nuevo: Para usuarios
  
  /dashboard          # Componentes Específicos del Dashboard (Moléculas/Organismos)
    /StatsCard.tsx    # Tarjeta de métricas (Navy/White variants)
    /QuickAction.tsx  # Botones de acceso rápido
    /ActivityList.tsx # Lista de actividad reciente
    /Chart.tsx        # Wrapper de gráficos (Recharts)
    /ProgramCard.tsx  # Tarjeta de programas destacados
    /Sidebar.tsx      # Navegación Desktop
    /BottomNav.tsx    # Navegación Mobile

  /layout             # Layouts globales
    /Navbar.tsx       # Public Navbar
    /Footer.tsx       # Public Footer

/lib
  /domain             # Entidades y Lógica de Negocio
  /application        # Casos de Uso
  /infrastructure     # Firebase, API Clients
  /utils              # Helpers (cn, formatters)
```

## 2. Definición de Componentes Clave (Dashboard)

### A. Layout del Dashboard (`app/(dashboard)/layout.tsx`)
*   **Responsabilidad**: Manejar la estructura persistente.
*   **Desktop**: Muestra `<Sidebar />` a la izquierda (fijo).
*   **Mobile**: Muestra `<BottomNav />` abajo (fijo) y un `<Header />` simple arriba con Avatar y Notificaciones.

### B. Tarjeta de Estadísticas (`components/dashboard/StatsCard.tsx`)
*   **Props**: `title`, `value`, `icon`, `trend` (percentage), `variant` ('primary' | 'secondary').
*   **Uso**:
    *   *Primary*: Usada para "Certificados Emitidos" (Fondo Azul, Texto Blanco).
    *   *Secondary*: Usada para "Pendientes", "Programas" (Fondo Blanco).

### C. Navegación Inferior (`components/dashboard/BottomNav.tsx`)
*   **Props**: `items` (Array de iconos/rutas).
*   **Comportamiento**: Solo visible en `md:hidden`. Fija en `bottom-0`.
*   **Estado**: Resalta la ruta activa con color Naranja (`text-accent`).

### D. Lista de Actividad (`components/dashboard/ActivityList.tsx`)
*   **Props**: `activities` (Data array).
*   **Item**: Icono circular (con color de estado) + Título (negrita) + Subtítulo (gris) + Timestamp.

### E. Gráficos (`components/dashboard/Chart.tsx`)
*   **Librería Sugerida**: `recharts` (Standard en React).
*   **Diseño**: BarChart simple, XAxis limpio, Tooltip customizado. Color de barras: `#FF8200`.

## 3. Plan de Desarrollo de Componentes

1.  **Átomos/Base**: Crear `Badge.tsx` y `Avatar.tsx`.
2.  **Moléculas/Dashboard**: Implementar `StatsCard` y `QuickAction`.
3.  **Organismos/Nav**: Implementar `BottomNav` y `Sidebar`.
4.  **Páginas**: Ensamblar `app/(dashboard)/page.tsx` usando estos componentes.
