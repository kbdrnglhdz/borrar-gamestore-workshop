## Context

Endpoint de prueba para validar flujo completo de OpenSpec. Implementación trivial.

## Goals / Non-Goals

**Goals:**
- Proveer un endpoint GET `/api/add-valid-feature` con mensaje "Probando todo el flujo"

**Non-Goals:**
- No requiere autenticación, DB, ni lógica de negocio

## Decisions

| Decisión | Alternativas | Por qué |
|---|---|---|
| Ruta dedicada `/api/add-valid-feature` | Query param, header | Sigue el patrón existente |
| Archivo separado `add-valid-feature.ts` | Añadir a ruta existente | Separación de concerns |

## Risks / Trade-offs

- Ninguno.

## Archivos nuevos y modificados

- **Nuevos**: `backend/src/routes/add-valid-feature.ts`
- **Modificados**: `backend/src/index.ts`

## Seguridad y rendimiento

- Sin impacto.
