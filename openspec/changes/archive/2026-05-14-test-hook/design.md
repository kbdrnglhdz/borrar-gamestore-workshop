## Context

Endpoint de prueba para validar hooks de Husky. Implementación trivial.

## Goals / Non-Goals

**Goals:**
- Proveer un endpoint GET `/api/test-hook` con mensaje "Probar Husky"

**Non-Goals:**
- No requiere autenticación, DB, ni lógica de negocio

## Decisions

| Decisión | Alternativas | Por qué |
|---|---|---|
| Ruta dedicada `/api/test-hook` | Query param, header | Sigue el patrón existente |
| Archivo separado `test-hook.ts` | Añadir a ruta existente | Separación de concerns |

## Risks / Trade-offs

- Ninguno.

## Archivos nuevos y modificados

- **Nuevos**: `backend/src/routes/test-hook.ts`
- **Modificados**: `backend/src/index.ts`

## Seguridad y rendimiento

- Sin impacto.
