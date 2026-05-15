## Context

Endpoint de prueba para validar el flujo completo de OpenSpec. Implementación trivial.

## Goals / Non-Goals

**Goals:**
- Proveer un endpoint GET `/api/test-workflow-1` con mensaje "Prueba de validación de openspec"

**Non-Goals:**
- No requiere autenticación, DB, ni lógica de negocio

## Decisions

| Decisión | Alternativas | Por qué |
|---|---|---|
| Ruta dedicada `/api/test-workflow-1` | Query param, header | Sigue el patrón existente |
| Archivo separado `test-workflow-1.ts` | Añadir a ruta existente | Separación de concerns |

## Risks / Trade-offs

- Ninguno.

## Archivos nuevos y modificados

- **Nuevos**: `backend/src/routes/test-workflow-1.ts`
- **Modificados**: `backend/src/index.ts`

## Seguridad y rendimiento

- Sin impacto.
