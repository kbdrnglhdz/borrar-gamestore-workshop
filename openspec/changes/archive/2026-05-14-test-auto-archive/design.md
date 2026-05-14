## Context

Endpoint de prueba para validar el flujo de archivado automático. Implementación trivial sin dependencias externas.

## Goals / Non-Goals

**Goals:**
- Proveer un endpoint GET `/api/auto-archive` que retorne `{ success: true, data: { message: "archive-completed.sh" } }`

**Non-Goals:**
- No requiere autenticación, base de datos, ni lógica de negocio

## Decisions

| Decisión | Alternativas | Por qué |
|---|---|---|
| Ruta dedicada `/api/auto-archive` | Query param, header | Sigue el patrón existente de rutas REST |
| Archivo separado `auto-archive.ts` | Añadir a ruta existente | Mantiene separación de concerns, fácil de eliminar después |

## Risks / Trade-offs

- Ninguno. Cambio trivial.

## Archivos nuevos y modificados

- **Nuevos**: `backend/src/routes/auto-archive.ts`
- **Modificados**: `backend/src/index.ts`

## Seguridad y rendimiento

- Sin impacto.
