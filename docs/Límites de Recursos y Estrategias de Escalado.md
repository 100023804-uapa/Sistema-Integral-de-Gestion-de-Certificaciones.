Límites de Recursos y Estrategias de Escalado (MVP)
Este documento detalla las limitaciones de los servicios gratuitos utilizados en el proyecto y las estrategias para mantenerse dentro del rango gratuito durante la fase de MVP y pruebas.

1. Resend (Emails)
Plan: Free (Hobby)

Límites:
3,000 correos al mes.
100 correos al día.
Solo puedes enviar correos desde el dominio verificado o a tu propio correo (si no has verificado dominio).
Estrategia MVP:
Usar solo para correos transaccionales esenciales (envío de certificados).
Durante desarrollo, usar correos ficticios o limitados al equipo interno.
Alerta: Si pasas de 100 certificados en un día (ej. un evento masivo), los correos fallarán.
2. Firebase (Base de Datos y Auth)
Plan: Spark (Gratuito)

Firestore (Base de Datos):
Lecturas: 50,000 / día (Suficiente para ~5k visitas diarias si está optimizado).
Escrituras: 20,000 / día.
Almacenamiento: 1 GB total.
Authentication:
Usuarios ilimitados (email/password).
Teléfono (SMS): 10/mes (Evitar usar autenticación por SMS).
Estrategia MVP:
Optimizar lecturas: No descargar "todos los certificados" siempre. Usar paginación.
El límite de 1GB es alto para solo texto. Las imágenes (certificados) van a Storage.
3. UploadThing (Archivos Temporales/Carga)
Plan: Free

Límites:
2 GB de almacenamiento total.
Ancho de banda limitado (no especificado públicamente, pero razonable para MVP).
Estrategia MVP:
Usar solo para la carga temporal del Excel o avatares.
Implementar limpieza periódica de archivos viejos si es posible.
4. Vercel (Hosting - Si se usa)
Plan: Hobby

Límites:
Ancho de banda: 100 GB/mes.
Serverless Functions: 10 segundos de ejecución máx.
Estrategia MVP:
Generación de PDF: Al hacerlo en el cliente (
jspdf
 en el navegador del usuario), ahorramos cómputo y tiempo de ejecución en el servidor. Esto es clave.
Archivos estáticos (imágenes, JS) se sirven muy rápido vúa CDN.
Recomendaciones para Producción/Escalado
Dominio de Correo: Verificar el dominio en Resend es obligatorio para salir a producción real y evitar SPAM.
Base de Datos: Si el historial crece mucho, considerar mover registros viejos a "Cold Storage" o pagar el plan Blaze (Pay as you go) de Firebase, que es muy barato.
PDFs: Seguir generándolos en el cliente es la mejor estrategia de costos ($0). Si se requiere generarlos en el servidor (background jobs), se necesitaría un servicio externo o mover a un VPS para no pagar tiempo de computo serverless.