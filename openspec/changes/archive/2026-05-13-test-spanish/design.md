## Context

Endpoint de prueba simple para verificar que el servidor Express responde correctamente. No requiere lógica de negocio ni acceso a base de datos.

## Goals / Non-Goals

**Goals:**
- Proveer un endpoint GET `/api/test/spanish` que retorne `{ success: true, data: { message: "Cambio de lenguaje a español" } }`
- Mantener el endpoint sin autenticación para facilitar pruebas
- Seguir el formato de respuesta JSON existente en el proyecto

**Non-Goals:**
- No modificar funcionalidad existente
- No agregar dependencias externas
- No requiere pruebas automatizadas (por ser endpoint temporal de prueba)

## Decisions

| Decisión | Alternativas | Por qué |
|---|---|---|
| Usar ruta `/api/test/spanish` | `/api/test/es` o `/api/health/language` | Sigue el patrón de nombres descriptivos y es consistente con el propósito |
| Sin autenticación | Requerir JWT | Es un endpoint de prueba; si se requiere autenticación no sería útil para verificaciones rápidas |
| Respuesta JSON estándar | Texto plano | Consistente con el resto de la API del proyecto |

## Archivos nuevos y modificados

- **Nuevo**: `src/routes/test.ts` — Router con el endpoint de prueba
- **Modificado**: `src/app.ts` — Registrar el nuevo router

## Riesgos / Trade-offs

- [Bajo] El endpoint queda expuesto sin autenticación → Solo retorna un mensaje estático, sin acceso a datos sensibles ni mutación de estado
- [Bajo] Podría acumularse como deuda técnica si no se elimina → Es trivial de remover cuando ya no sea necesario
